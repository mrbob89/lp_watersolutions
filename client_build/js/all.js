$(window).scroll(function() {
    var height = $(window).scrollTop();

    if(height < 370) {
        $('.trumpet__water').css('background', 'url(\'images/water-1.png\')');
    } 
    if(height > 370) {
        $('.trumpet__water').css('background', 'url(\'images/water-2.png\')');
    } 
    if (height > 1020) {
    	$('.trumpet__water').css('background', 'url(\'images/water-3.png\')');
    }
    if (height > 1750) {
    	$('.trumpet__water').css('background', 'url(\'images/water-4.png\')');
    }
    if (height > 2620) {
    	$('.trumpet__water').css('background', 'url(\'images/water-5.png\')');
    }
    if (height > 3700) {
        $('.trumpet__water').css('display', 'none');
    }
    if (height <= 3700) {
        $('.trumpet__water').css('display', 'block');
    }
});
//# sourceMappingURL=all.js.map
