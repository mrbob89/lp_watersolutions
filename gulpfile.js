var baseDir = 'client_src';
var destDir = 'client_build';

var gulp            = require('gulp');
var clean           = require('gulp-clean');
var less            = require('gulp-less');
var cssnano         = require('gulp-cssnano');
var concat          = require('gulp-concat');
var argv            = require('yargs').argv;
var gulpif          = require('gulp-if');
var sourcemaps      = require('gulp-sourcemaps');
var watch           = require('gulp-watch');
var uglify          = require('gulp-uglify');
var browserSync     = require('browser-sync').create();
var csscomb         = require('gulp-csscomb');
var gcmq            = require('gulp-group-css-media-queries');
var filesize        = require('gulp-filesize');
var imagemin        = require('gulp-imagemin');
var fileinclude     = require('gulp-file-include');


gulp.task('less', function () {
  return gulp.src(baseDir + '/less/**/*.less')
    .pipe(concat('style.less'))
    .pipe(less())
    .pipe(gulp.dest(destDir + '/css'));
});

gulp.task('css', function () {
    return gulp.src(baseDir + '/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(filesize())
        .pipe(concat('style.less'))
        .pipe(less())
        .pipe(gulpif(argv.mob,gcmq()))
        .pipe(csscomb())
        .pipe(gulpif(argv.prod, cssnano()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destDir + '/css'))
        .pipe(filesize());
});

gulp.task('js', function () {
  return gulp.src(baseDir + '/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(filesize())
    .pipe(concat('all.js'))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destDir + '/js'))
    .pipe(filesize());
});

gulp.task('libs', function () {
    return gulp.src(baseDir + '/libs/*.js')
        .pipe(gulpif(argv.libfile, concat('libs.js')))
        .pipe(gulp.dest(destDir + '/libs'));
});

gulp.task('clean', function (cb) {
    return gulp.src('client_build/*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy-static', function () {
    return gulp.src([
        baseDir + '/**',
            '!' + baseDir + '/libs{,/**}',
            '!' + baseDir + '/less{,/**}',
            '!' + baseDir + '/js{,/**}',
            '!' + baseDir + '/node_modules{,/**}',
        ])
        .pipe(gulp.dest(destDir));
});

gulp.task('copy-html', function () {
    return gulp.src([
        baseDir + '/*.html'
        ])
        .pipe(gulp.dest(destDir));
});

gulp.task('copy-img', function () {
    return gulp.src([
        baseDir + '/images/*.*'
        ])
        .pipe(gulp.dest(destDir + '/images'));
});

gulp.task('imagemin', () => {
    return gulp.src(baseDir + '/images/*')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest(destDir + '/images'));
});

gulp.task('fileinclude', function(cb) {
    gulp.src([baseDir + '/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: baseDir + '/includes/'
        }))
    .pipe(gulp.dest(destDir))
    .on('end', cb);
});

gulp.task( 'watch', function () {
    gulp.watch(baseDir + '/*.html', gulp.series('copy-html'));
    gulp.watch(baseDir + '/images/*.@(png|jpg|js)', gulp.series('copy-img'));
    gulp.watch(baseDir + '/less/**/*.*', gulp.series('css'));
    gulp.watch(baseDir + '/js/**/*.*', gulp.series('js'));
    gulp.watch(baseDir + '/libs/*.js', gulp.series('libs'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: destDir
    });

    gulp.watch(destDir + '/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(['copy-static', 'css', 'js', 'libs']));
gulp.task('dev', gulp.series('build', gulp.parallel(['serve','watch'])));
gulp.task('default', gulp.series('dev'));