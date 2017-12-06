$(function() {

/*----------------ScrollBar -------------------*/
        $('.scroll-pane').jScrollPane();
/*----------------HEADER-------------------*/
    $(window).on('scroll', function() {
        var height = $(window).scrollTop();
        if(height > 150){
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

// -----------------------------TABS filter----------------------
    $(".filter-title").click(function( e ){ e.preventDefault(); });
    $(".filter-title").click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass("active");
            $(this).parent(".filter-wrapp").removeClass("active");
            $(this).parent(".filter-wrapp").children(".filter").removeClass("active");
        } else {
            $(this).toggleClass("active");
            $(this).parent(".filter-wrapp").toggleClass("active");
            $(this).parent(".filter-wrapp").children(".filter").toggleClass("active");
        }

    });
// -----------------------------Style filter----------------------
    $(document).ready(function() {
        var cssValues = {
            "max-height":"0",
            "visibility":"hidden",
            "opacity":"0",
            "padding":"0"
        }
        $('.filter').css(cssValues)
    });
// -----------------------------Price----------------------

    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 50000,
        values: [0, 300],
        step: 10,
        slide: function(event, ui) {
            $("#rub-left").text(ui.values[0] + 'р.'); // текст левого span
            $("#rub-right").text(ui.values[1] + 'р.'); // текст правого span

            if (ui.handleIndex === 0) {
                // потянули левый ползунок - переместим левый span
                $("#rub-left").css('left', ui.handle.style.left);
            } else {
                // потянули правый ползунок - переместим правый span
                $("#rub-right").css('left', ui.handle.style.left);
            }
        }
    });

// задать начальный текст левого span
    $("#rub-left").text($("#slider-range").slider("values", 0) + 'р.');
// задать начальный текст правого span
    $("#rub-right").text($("#slider-range").slider("values", 1) + 'р.');

// -----------------------------Product img slider ----------------------
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        vertical: true,
        verticalSwiping: true,
        focusOnSelect: true,
        prevArrow: $('.prev_thumb-img'),
        nextArrow: $('.next_thumb-img')
    });

});


