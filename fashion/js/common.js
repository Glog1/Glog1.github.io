jQuery(function () {
//Open child menu
    $(".sub-menu a").click(function () {
        $( ".sub-menu").toggleClass( "open" );
        $(this).parent(".sub-menu").children("ul").slideToggle("200");
    });
    $(".acordionMenu a").click(function () {
        $( ".acordionMenu").toggleClass( "open" );
        $(this).parent(".acordionMenu").children("ul").slideToggle("200");
        $(this).toggleClass("open");
    });

// Menu open
    $(".btnMnu, .close").click(function () {
         $(".burger").toggleClass( "open" );
        $(".navBarWrapp" ).toggleClass( "active" );
    });
// SEARCH open
	$(".searchBtn").click(function () {
         $(".searchFormWrapp").toggleClass( "open" );
    });
 // Slider "Banner"
    $('.slider').slick();
 // Multiple slider
    $('.sliderMultiple').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    // Instagram slider
    $('.instaSlider').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    // Partnersslider
    $('.partnersSlider').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 5,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            }
        ]
    });
});
