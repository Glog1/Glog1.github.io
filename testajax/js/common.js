$(function(){
$(document).pjax('a', '#pjax-container')
    //   $(document).pjax('.ajaxLink','#ajaxContainer',{fragment: '#ajaxContainer'}); 
});

jQuery(document).ready(function () {
    $(function ()
    {
        $('.navBar-mnu').bind(
                'jsp-scroll-y',
                function (event, scrollPositionY, isAtTop, isAtBottom)
                {
                    console.log('Handle jsp-scroll-y', this,
                            'scrollPositionY=', scrollPositionY,
                            'isAtTop=', isAtTop,
                            'isAtBottom=', isAtBottom);
                }
        )
                .jScrollPane();
    });
    $('.slider').slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });



    $('#btnMnu').click(function () {
        $(this).toggleClass('open');
    });

    $('#btnMnu').click(function () {
        $('#navBar').toggleClass('navBarOpen');
    });
    $('#btnHeader').click(function () {
          $(this).toggleClass('open');
        $('#header').toggleClass('headerOpen');
    });

});