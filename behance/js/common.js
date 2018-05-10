$(function () {
    $('.scroll-pane').jScrollPane();

    $('.c-header__burger').click (function(){
        $(this).toggleClass('open');
        $('.c-header').toggleClass('active');
    });
});