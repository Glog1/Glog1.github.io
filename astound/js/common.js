//carrousel
function carousel() {
    var slideIndex = 1;
    showSlides(slideIndex);
    var next = document.querySelector('.next');
    var prev = document.querySelector('.prev');

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("products-similar__item");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";
    }

    prev.onclick = function plusSlides(n) {
        showSlides(slideIndex -= 1);
    }
    next.onclick = function plusSlides(n) {
        showSlides(slideIndex += 1);
    }
}

/****/

window.onload = function () {
    social.style.display = "none";
    var shareBtn = document.querySelector('.share-btn');
    shareBtn.onclick = function () {
        var social = document.querySelector("#social");
        if (social.style.display === "none") {
            social.style.display = "block";
        } else {
            social.style.display = "none";
        }
    }
    var closeBtn = document.querySelector('.close-btn');
    closeBtn.onclick = function () {
        social.style.display = "none";
    }
    if (window.innerWidth < 640) {
        carousel();
    }
    window.onresize = function () {
        if (window.innerWidth < 640) {
            carousel();
        }
    }

};