$(document).ready(function () {
 //----------OWL CAROUSEL-----------

    var owl = jQuery("#owl");
    owl.owlCarousel({
        items: 3,
        responsiveClass:true,
        responsive:{
            0:{
                items: 1
            },
            480:{
                items: 2
            },
            992:{
                items: 3
            }
        }
    });

    $('.next').click(function() {
        owl.trigger('next.owl.carousel');
    });
    $('.prev').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [300]);
    });
    $('.play').on('click',function(){
        owl.trigger('play.owl.autoplay',[1000])
    });
    $('.stop').on('click',function(){
        owl.trigger('stop.owl.autoplay')
    });
//----------Fancybox-----------
    jQuery(".fancybox").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });

    $(".navscroll").click(function(e) {
        e.preventDefault();
        $("#menu").removeClass('in');
    })
});

