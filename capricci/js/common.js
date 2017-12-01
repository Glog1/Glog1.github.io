$(function() {

/*----------------HEADER-------------------*/
    $(window).on('scroll', function() {
        var height = $(window).scrollTop();
        if(height > 10){
            $('.header').addClass('active');
        } else{
            $('.header').removeClass('active');
        }
    });
/*----------------MASONRY-------------------*/
    var $container = $(".grid");
    $container.imagesLoaded(function () {
        $container.masonry({
            columnWidth: ".col-md-3",
            itemSelector: ".grid-item"
        });
        $(".grid-item_bg").imagefill();
    });
/*----------------slick -------------------*/
//-------Gallery
    $('.slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
    });
//-------Revies
    $('.slider-dots').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll:1,
        dots: true,
        appendDots: $('.dot_custom'),
        prevArrow: $('.prev_custom'),
        nextArrow: $('.next_custom')
    });
/*----------------Magnific Popup -------------------*/
    $(document).ready(function() {
        $('.popup').magnificPopup({type:'image'});
    });
});
