$(function () {
    //Scroll to
    $(document).on("click", ".benefit__arrow", function (t) {
        t.preventDefault();
        var i = $(this).attr("href"),
            e = $(i),
            s = e.offset().top;
        return $("html,body").animate({
            scrollTop: s
        }, 1e3), !1
    });

    // Добавление класса для блока с картой
    $(window).bind('scroll', function () {
        var scrollTomap = $(window).scrollTop();
        var elementMap = $('#coordinates').offset().top;
        var currentMapOffset = (elementMap - scrollTomap);
        if (currentMapOffset < 5) {
            $('.coordinates__map').addClass('rotate')
        } else {
            $('.coordinates__map').removeClass('rotate');
        }

    });
    // Добавление класса active для section
        $("section").each(function() {
            var block = $(this);
            var bheight = $(window).height();
            var percent = 0.3;
            var hpercent = bheight * percent;
            $(window).scroll(function() {
                var top = block.offset().top+hpercent;
                var bottom = block.height()+top;
                top = top - $(window).height();
                var scroll_top = $(this).scrollTop();
                if ((scroll_top > top) && (scroll_top < bottom)) {
                    if (!block.hasClass("active")) {
                        block.addClass("active");
                    }
                } else {
                    block.removeClass("active");
                }
            });
        });

});
// Фиксация изображения .benefit
$(function () {
    var $window = $(window);
    var $fixBlock = $('#img');
    var $fixPlaceBlock = $fixBlock.parent('.benefit__fixed__inside__images');
    var fixBlockHalfHeight = $fixPlaceBlock.innerHeight() / 2;

    $window.on('scroll', function () {
        var windowHalfHeight = $window.height() / 2;
        var fixPlaceBlockOffsetTopPrinciples = $fixPlaceBlock.offset().top;

        $('body').toggleClass('scroll', $window.scrollTop() + windowHalfHeight - fixBlockHalfHeight >= fixPlaceBlockOffsetTopPrinciples);
    });
});
//Фиксация изображения  principles-circles
$(function () {
    var $windowPrinciples = $(window);
    var $fixBlockPrinciples = $('#principlesImg');
    var $fixPlaceBlockPrinciples = $fixBlockPrinciples.parent('.principles-circles__fixed__inside__images');
    var fixBlockHalfHeight = $fixPlaceBlockPrinciples.innerHeight() / 2;
    $windowPrinciples.on('scroll', function () {
        var windowHalfHeightPrinciples = $windowPrinciples.height() / 2;
        var fixPlaceBlockOffsetTopPrinciples = $fixPlaceBlockPrinciples.offset().top;
        $('body').toggleClass('principles-circles-scroll', $windowPrinciples.scrollTop() + windowHalfHeightPrinciples - fixBlockHalfHeight >= fixPlaceBlockOffsetTopPrinciples);
    });
});
//Поп-ап
$('.image-popup').magnificPopup({type: 'image'});
$(function () {
//Слайдер наши мастера
$('.our-masters__slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});
//Слайдер видео-отзывы
$('.video-review__slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});
});

