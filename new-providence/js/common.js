$(function () {
    //Open menu
    $('.c-main-header__burger').click (function(){
        $(this).toggleClass('open');
        $('.c-main-header').toggleClass('active');
        $('.out-menu').toggleClass('active');

    });
    // Scroll Events
    $(window).scroll(function(){

        var wScroll = $(this).scrollTop();

        // Activate menu
        if (wScroll > 20) {
            $('.c-main-header').addClass('fixed');
        }
        else {
            $('.c-main-header').removeClass('fixed');
        };

        //Scroll Effects

    });

    //Modal
    $('[data-remodal-id=modal]').remodal();

});
