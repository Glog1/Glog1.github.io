//BURGER BTN
var Menu = {

    el: {
        ham: $('#btnMnu'),
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
    //OPEN TOP BAR MENU
    $(".top-bar__btn").click(function () {
        $(".top-bar").toggleClass("active")
        $(this).toggleClass("active")
    });
    //OPEN MAIN MENU
    $("#btnMnu").click(function () {
        $(".main-menu").toggleClass("active")
        $(".burger-wrapp").toggleClass("active")
    });

    //SLIDER
    $('.slider').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        arrows: false

    });

});