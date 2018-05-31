//Open menu
var source,
    result,
    body;

source = document.querySelector('.c-main-header__burger');
result = document.querySelector('.c-main-header__menu');
body = document.querySelector('body');

source.onclick = function toggleClassMenu() {
    source.classList.toggle('active');
    result.classList.toggle('active');
    body.classList.toggle('hidden');
};

$(document).ready(function() {

//Home slider
$('.c-home-slider').slick({
    arrows: false,
    dots: true,
    }

);

});