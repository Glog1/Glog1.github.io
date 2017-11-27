$(document).ready(function () {
//------------------------------Masonry--------------------------------------------------------------
    var $container = $(".grid");

    $container.masonry({
        columnWidth: ".grid-item",
        itemSelector: ".grid-item"
    });
//------------------------------ Menu MOBILE open-------------------------
    $(".close").click(function () {
        $(".burger").toggleClass("open");
        $(".desctop-menu").toggleClass("active");
    });
    $("#btnMnu").click(function () {
        $(".burger").toggleClass("open");
        $(".desctop-menu").toggleClass("active");
    });
//----------------------SLIDERS----------------------------
//--------------MASTERS------------only-mobile slider
    // Slider only mobile
    $slick_slider = $('.only-mobile');
    settings_slider = {
        dots: false
        // more settings
    }
    slick_on_mobile($slick_slider, settings_slider);
    // slick on mobile
    function slick_on_mobile(slider, settings) {
        $(window).on('load resize', function () {
            if ($(window).width() > 768) {
                if (slider.hasClass('slick-initialized')) {
                    slider.slick('unslick');
                }
                return
            }
            if (!slider.hasClass('slick-initialized')) {
                return slider.slick(settings);
            }
        });
    };
// --------MASTERS-------centered-slide--------------
    $centered_slide = $('.centered-slide');
    settings_slider = {
        dots: false,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1,
        // more settings
    }
    centered_slide_on_mobile($centered_slide, settings_slider);

    function centered_slide_on_mobile(slider, settings) {
        $(window).on('load resize', function () {
            if ($(window).width() > 768) {
                if (slider.hasClass('slick-initialized')) {
                    slider.slick('unslick');
                }
                return
            }
            if (!slider.hasClass('slick-initialized')) {
                return slider.slick(settings);
            }
        });
    };
// --------END centered-slide---------------------

//----------------- Reviews slider ------------------


    // // Slider only mobile
    $slick_for = $('.slider-for');
    settings_slider = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
        // more settings
    }
    slider_for_on_mobile($slick_for, settings_slider);

// slick on mobile
    function slider_for_on_mobile(slider, settings) {
        $(window).on('load resize', function () {
            if ($(window).width() > 991) {
                if (slider.hasClass('slick-initialized')) {
                    slider.slick('unslick');
                }
                return
            }
            if (!slider.hasClass('slick-initialized')) {
                return slider.slick(settings);
            }
        });
    };

    // SLIDER FOR

    $('.slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true
    });
    //-----------------END Reviews slider ------------------
});

//--------------------------- Open sub menu-------------------------------
$(document).ready(function () {
    function resizedesc() {
        $(window).on('load resize', function () {
            if ($(window).width() < 1025) {
                $(".nav-bar-list-item").click(function () {
                    $(this).toggleClass("active");
                    $(this).children("ul.sub-menu").toggleClass("active");
                });
                $(document).mouseup(function (e) {
                    var $target = $(e.target);
                    if ($target.closest(".nav-bar-list-item").length == 0) {
                        $(".nav-bar-list-item").removeClass("active");
                        $(".sub-menu").removeClass("active");
                    }
                });
            }

        });
    };
    resizedesc();
});
// -----------------------------TABS----------------------
$(".tabs-nav__item").click(function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass("active");
        $(this).children(".tabs-container__item").removeClass("active");
    } else {
        $(".tabs-nav__item").removeClass("active");
        $(this).toggleClass("active");
        $(".tabs-container__item").removeClass("active");
        $(this).children(".tabs-container__item").toggleClass("active");
    }

});



