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
    if (height > 2550) {
    	$('.trumpet__water').css('background', 'url(\'images/water-5.png\')');
    }
});
//# sourceMappingURL=all.js.map
