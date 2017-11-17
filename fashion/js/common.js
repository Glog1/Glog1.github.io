jQuery(document).ready(function() {
// Masonry grid
    var $container = $(".grid");

    $container.masonry({
        columnWidth: '.grid-item',
        itemSelector: ".grid-item"
    });
 

// Open sub menu
    $(".sub-menu a").click(function () {
        $( ".sub-menu").toggleClass( "open" );
        $(this).parent(".sub-menu").children("ul").slideToggle("200");
    });
    $(document).mouseup(function(e) {
        var $target = $(e.target);
        if ($target.closest(".sub-menu").length == 0) {
            $(".sub-menu").removeClass("open");
            $(".childIList").hide('slow');
        }
    });

    $('.acordionMenu a').click(function () {
        if ($(this).hasClass('open"')) {
            $(this).removeClass("open");
            $(this).parent(".acordionMenu").children("ul").hide();
        } else {
            $( ".acordionMenu").removeClass( "open" );
            $( ".acordionMenu ul").hide('slow');
            $(this).parent(".acordionMenu").children("ul").slideToggle("200");
            $(this).parent(".acordionMenu").toggleClass("open");
        }
    });
    // $(document).mouseup(function(e) {
    //     var $target = $(e.target);
    //     if ($target.closest(".acordionMenu").length == 0) {
    //         $(".acordionMenu").removeClass("open");
    //         $(".acordionMenu ul").hide('slow');
    //     }
    // });


// Menu MOBILE open
    $(".btnMnu, .close").click(function () {
         $(".burger").toggleClass( "open" );
        $(".navBarWrapp" ).toggleClass( "active" );
    });
// SEARCH open
	$(".searchBtn").click(function () {
         $(".searchFormWrapp").toggleClass( "open" );
    });
    $(document).mouseup(function(e) {
        var $target = $(e.target);
        if ($target.closest(".searchFormWrapp").length == 0) {
            $(".searchFormWrapp").removeClass("open");
        }
    });
	// SLIDERS
 // Slider "Banner"
    $('.sliderBanner').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
    // $('.slider').slick();
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

