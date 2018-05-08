// menu burger
var Menu = {

    el: {
        ham: $('.c-header__burger'),
        menuTop: $('.menu-top'),
        menuMiddle: $('.menu-middle'),
        menuBottom: $('.menu-bottom')
    },

    init: function() {
        Menu.bindUIactions();
    },

    bindUIactions: function() {
        Menu.el.ham
            .on(
                'click',
                function(event) {
                    Menu.activateMenu(event);
                    event.preventDefault();
                }
            );
    },

    activateMenu: function() {
        Menu.el.menuTop.toggleClass('menu-top-click');
        Menu.el.menuMiddle.toggleClass('menu-middle-click');
        Menu.el.menuBottom.toggleClass('menu-bottom-click');
    }
};

Menu.init();
$(function() {
    //OPEN MOBILE MENU
    $(".c-header__burger").click(function () {
        $(".c-header__mobile").toggleClass("active");
    });
    //ACCORDION
    (function($) {
        $('.accordion > li:eq(0) a').addClass('active').next().slideDown();

        $('.accordion a').click(function(j) {
            var dropDown = $(this).closest('li').find('p');

            $(this).closest('.accordion').find('p').not(dropDown).slideUp();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).closest('.accordion').find('a.active').removeClass('active');
                $(this).addClass('active');
            }

            dropDown.stop(false, true).slideToggle();

            j.preventDefault();
        });
    })(jQuery);
    //Notices

    // Slider only mobile
    $slick_slider = $('.news__carousel');
    settings_slider = {
        dots: true,
        arrows: false
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

});

//ACCORDION FOOTER
$('.main-footer__item h3').click(function () {
    $(".main-footer__list").removeClass('active');
    $(".main-footer__item").removeClass('active');
    $(this).parent(".main-footer__item").addClass('active');
    $(this).parent(".main-footer__item").children("ul").addClass('active');
});

//notices
$(window).on('load resize', function () {
    if ($(window).width() < 1024) {

        $(".sidebar__notice").click(function () {
            if ($('.sidebar__notices').hasClass('active')) {
                $(".sidebar__notices").removeClass('active');
            }else{
                $(".sidebar__notices").addClass('active');
            }

        });

    }
});
