$(function () {

    //Open menu
    // $('.c-header__burger').click(function () {
    //     $(this).toggleClass('active');
    //     $('.c-navigation__wrapp').toggleClass('active');
    // });

    //Open all category
    // $('.c-categories-list__open-category-btn').click(function () {
    //     $(this).toggleClass('active');
    //     $('.c-categories-list__hidden-categoris').toggleClass('active');
    // });

    //Filter
    // $(document).on('click', '[data-main]', function () {
    //     $(this).toggleClass('active');
    //     $('[data-child=' + $(this).data('main') + ']').toggleClass('active');
    // });
    // $(document).mouseup(function (e) {
    //     var container = $("[data-main]");
    //     if (container.has(e.target).length === 0){
    //         container.removeClass('active');
    //     $(".c-filter__dropdown").removeClass('active');
    //     }
    // });



    //Carousel product image
    //     $('.c-carousel__main').slick({
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         draggable: false,
    //         arrows: false,
    //         fade: true,
    //         asNavFor: '.c-carousel__nav',
    //         responsive: [
    //             {
    //                 breakpoint: 1025,
    //                 settings: {
    //                     fade: false,
    //                     draggable: true
    //                 }
    //             }
    //         ]
    //     });
    //
    //
    // $('.c-carousel__nav').slick({
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     asNavFor: '.c-carousel__main',
    //     dots: false,
    //     focusOnSelect: true,
    //     arrows: false
    //     //prevArrow: $('.prev_thumb-img'),
    //     //nextArrow: $('.next_thumb-img')
    // });
    // //validation form
    // $("button.send").on("click", function(s) {
    //     s.preventDefault();
    //     var e = $(this).closest("form"),
    //         n = !0;
    //     return $("form").find("input.required").removeClass("error"), e.find("input.required, textarea.required").each(function() {
    //         return "" === $(this).val() ? ($(this).addClass("error"), $(this).focus(), n = !1, !1) : void 0
    //     }), n && ($("form").find("input.required, textarea.required").parent().removeClass("error"), e.submit()), !1
    //
    //
    // });
    // $(document).mousemove(function () {
    // if ($('input.required').hasClass('error')) {
    //     $(".error-text").addClass('error')
    // }else{
    //     $(".error-text").removeClass('error')
    // }
    // });
    // // Masked
    // $('.js-masked').mask('+7 (999) 999 99 99');

    // // Modal
    // $('.js-modal-open').on('click', function (event) {
    //     event.preventDefault();
    //     var modal = $(this).attr('href');
    //     $(modal).addClass('active');
    //     $('.c-modal__overlay').addClass('active');
    //     $('body').addClass('hidden');
    //
    // });
    //
    // $('.c-modal__overlay').on('click', function (event) {
    //     if ($(event.target).is('.modal-close') || $(event.target).is('.c-modal__overlay')) {
    //         $(this).removeClass('active');
    //         $('.c-modal').removeClass('active');
    //         $('body').removeClass('hidden');
    //     }
    // });



});

var App = {

    options: {},

    init: function () {

        //Open burger menu
        $('.c-header__burger').click(function () {
            $(this).toggleClass('active');
            $('.c-navigation__wrapp').toggleClass('active');
        });

        //Open all category
        $('.c-categories-list__open-category-btn').click(function () {
            $(this).toggleClass('active');
            $('.c-categories-list__hidden-categoris').toggleClass('active');
        });

    },
    menu: function () {
        //Filter
        $(document).on('click', '[data-main]', function () {
            $(this).toggleClass('active');
            $('[data-child=' + $(this).data('main') + ']').toggleClass('active');
        });

        $(document).mouseup(function (e) {
            var container = $("[data-main]");
            if (container.has(e.target).length === 0){
                container.removeClass('active');
                $(".c-filter__dropdown").removeClass('active');
            }
        });

    },
    productCarousel: function () {
        //Carousel product image
        $('.c-carousel__main').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false,
            arrows: false,
            fade: true,
            asNavFor: '.c-carousel__nav',
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        fade: false,
                        draggable: true
                    }
                }
            ]
        });


        $('.c-carousel__nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.c-carousel__main',
            dots: false,
            focusOnSelect: true,
            arrows: false
            //prevArrow: $('.prev_thumb-img'),
            //nextArrow: $('.next_thumb-img')
        });

    },
    validate: function () {

        //validation form
        $("button.send").on("click", function(s) {
            s.preventDefault();
            var e = $(this).closest("form"),
                n = !0;
            return $("form").find("input.required").removeClass("error"), e.find("input.required, textarea.required").each(function() {
                return "" === $(this).val() ? ($(this).addClass("error"), $(this).focus(), n = !1, !1) : void 0
            }), n && ($("form").find("input.required, textarea.required").parent().removeClass("error"), e.submit()), !1


        });
        $(document).mousemove(function () {
            if ($('input.required').hasClass('error')) {
                $(".error-text").addClass('error')
            }else{
                $(".error-text").removeClass('error')
            }
        });
        // Masked
        $('.js-masked').mask('+7 (999) 999 99 99');
    },
    modal: function () {
        // Modal
        $('.js-modal-open').on('click', function (event) {
            event.preventDefault();
            var modal = $(this).attr('href');
            $(modal).addClass('active');
            $('.c-modal__overlay').addClass('active');
            $('body').addClass('hidden');

        });

        $('.c-modal__overlay').on('click', function (event) {
            if ($(event.target).is('.modal-close') || $(event.target).is('.c-modal__overlay')) {
                $(this).removeClass('active');
                $('.c-modal').removeClass('active');
                $('body').removeClass('hidden');
            }
        });
    }

};

$(document).ready(function () {
    App.init();
    App.menu(),
    App.validate(),
    App.productCarousel(),
    App.modal(),
    App.init();
});