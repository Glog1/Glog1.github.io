$(function() {

});
$(document).ready(function () {
    $(window).on('load resize', function () {
        if ($(window).width() > 401) {
    var $container = $(".grid");
    $container.imagesLoaded(function () {
        $container.masonry({
            columnWidth: ".grid__item",
            itemSelector: ".grid__item"
        });
        $(".gridArticleImg__img").imagefill();

        });
        }
    });
});