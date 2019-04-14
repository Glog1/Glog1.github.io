// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;


                    


try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function() {
            supportsPassive = true;
        }
    });
    window.addEventListener("test", null, opts);
} catch (e) {}
// Use our detect's results. passive applied if supported, capture will be false either way.
// elem.addEventListener('touchstart', fn, supportsPassive ? { passive: true } : false);

// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
$(function() {
$.exists = function(selector) {
   return ($(selector).length > 0);
}
var mobileHeader = $('.mobile-header');
var mobile_classes = {
    opened : 'is-opened',
    closed : 'is-closed'
};
var target_toolbar_buttons = $('.me-cart-trigger, .me-search-trigger, .me-user-trigger, .me-feedback-trigger');
var toolbar_button_dropdowns = $('.toolbar-button-dropdown');
function close_toolbar_button_dropdowns() {
    toolbar_button_dropdowns
        .removeClass(mobile_classes.opened);
    target_toolbar_buttons
        .removeClass(mobile_classes.opened);
}

//предотвращаем всплытие кликов на документе от .toolbar-button-dropdown
toolbar_button_dropdowns.on('click', function(event) {
	event.stopPropagation();
});

target_toolbar_buttons.on('click', function(event) {
        
    event.stopPropagation();
    event.preventDefault();

    var $self = $(this);
    
    if ($self.hasClass(mobile_classes.opened)) {
        
        $self.removeClass(mobile_classes.opened);
        close_toolbar_button_dropdowns();
        
    } else {
        
        close_toolbar_button_dropdowns();
        
        if ($self.hasClass('me-search-trigger')) {
            $('.mobile-search-form__input').focus();
        }

        $self.addClass(mobile_classes.opened);

    }
});



$(document).on('keydown', function(event) {
        
    if (event.keyCode === 27) {
        close_toolbar_button_dropdowns();
    }
    
});

$(document).on('click', function(event) {
        
    close_toolbar_button_dropdowns();
});
var extendedSearchWindow = $('[data-remodal-id=extendedSearch]').remodal();
    
$('.mobile-search-form__ext-search').on('click', function(event) {
    event.preventDefault();
    extendedSearchWindow.open();
});

$('.remodal').find('.search-btn').removeClass('search-btn').addClass('shop2-btn');
$('.scroll-table, .shop2-table-order:not(.shop2-table-order--summary), .table2').wrap("<div class='scroll-table_enabled'/>");




var asideMenuBtn      = $('.b-aside-menu-btn');
var asideMenu         = $('.b-aside-menu');
var asideHead         = $('.b-aside-menu__head');
var asideMenuContent  = $('.b-aside-menu__content');
var asideMenuScroller = $('.b-aside-menu__scroller-content');
var asideMenuFoot     = $('.b-aside-menu__foot');
function openAsideMenu() {
    asideMenu.addClass('js-animate js-opening');
}
function closeAsideMenu() {
    
	asideMenu.removeClass('js-animate');
	
	setTimeout(function() {
	    asideMenu.removeClass('js-opening');
	}, 150);
}
asideMenuBtn.on('pointerup', function(event) {
    event.preventDefault();
    openAsideMenu();
});

$('.b-aside-menu__close').on('pointerup', function(event) {
    event.preventDefault();
    closeAsideMenu();
});

$('.b-aside-menu__overlay').on('pointerup', function(event) {
    event.preventDefault();
    closeAsideMenu();
});
$.preventScrolling($('.b-aside-menu__scroller'));

if ($.exists('.link-top')) {
  $('.b-aside-menu__scroller-content').append('<div class="aside-nav-item links"><div class="aside-nav-list-title active">Каталог продукции <span class="accordion-button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M24 9h-4v-2h4c0.552 0 1 0.447 1 1 0 0.552-0.448 1-1 1zM21 0c0-1.657-1.343-3-3-3h-5c-1.657 0-3 1.343-3 3v6h-1v-6c0-2.209 1.791-4 4-4h5c2.209 0 4 1.791 4 4v6h-1v-6zM11 9h-4c-0.553 0-1-0.448-1-1 0-0.553 0.447-1 1-1h4v2zM15.5 11.5c-1.934 0-3.5-1.567-3.5-3.5 0-1.934 1.566-3.5 3.5-3.5s3.5 1.566 3.5 3.5c0 1.933-1.567 3.5-3.5 3.5zM15.5 6c-1.104 0-2 0.896-2 2s0.896 2 2 2 2-0.896 2-2-0.896-2-2-2zM12.112 10.106c0.706 1.133 1.954 1.894 3.388 1.894s2.681-0.761 3.388-1.894c1.78 0.405 3.112 1.991 3.112 3.894v10c0 1.861-1.278 3.412-3 3.858v-5.421c0-1.933-1.567-3.5-3.5-3.5s-3.5 1.567-3.5 3.5v5.421c-1.723-0.446-3-1.997-3-3.858v-10c0-1.903 1.332-3.489 3.112-3.894zM15.5 20c1.381 0 2.5 1.119 2.5 2.5v7c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5v-7c0-1.381 1.119-2.5 2.5-2.5z"></path></svg></span></div><div class="aside-nav-list aside-nav-list_links"><div></div>');
  $('.link-top-in td').each(function(){
  	$(this).clone().appendTo('.aside-nav-list.aside-nav-list_links').replaceWith(function(index, oldHTML){
  		return $('<div class="link-top-item">').html(oldHTML);
  	});
  });
  $('.aside-nav-list.aside-nav-list_links').find('br').detach();
}
if ($.exists('.menu-top')) {

  var newAppNav = $('.menu-top').clone();
  newAppNav.removeClass('menu-top')

  newAppNav
      .removeAttr('menu-top')
      .addClass('aside-nav-list aside-nav-list_menu-top')
      .appendTo(asideMenuScroller)
      .wrap('<div class="aside-nav-item menu-top-adaptive"></div>')
      
  $('.aside-nav-item.menu-top-adaptive').prepend('<div class="aside-nav-list-title active">Меню <span class="accordion-button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M24 9h-4v-2h4c0.552 0 1 0.447 1 1 0 0.552-0.448 1-1 1zM21 0c0-1.657-1.343-3-3-3h-5c-1.657 0-3 1.343-3 3v6h-1v-6c0-2.209 1.791-4 4-4h5c2.209 0 4 1.791 4 4v6h-1v-6zM11 9h-4c-0.553 0-1-0.448-1-1 0-0.553 0.447-1 1-1h4v2zM15.5 11.5c-1.934 0-3.5-1.567-3.5-3.5 0-1.934 1.566-3.5 3.5-3.5s3.5 1.566 3.5 3.5c0 1.933-1.567 3.5-3.5 3.5zM15.5 6c-1.104 0-2 0.896-2 2s0.896 2 2 2 2-0.896 2-2-0.896-2-2-2zM12.112 10.106c0.706 1.133 1.954 1.894 3.388 1.894s2.681-0.761 3.388-1.894c1.78 0.405 3.112 1.991 3.112 3.894v10c0 1.861-1.278 3.412-3 3.858v-5.421c0-1.933-1.567-3.5-3.5-3.5s-3.5 1.567-3.5 3.5v5.421c-1.723-0.446-3-1.997-3-3.858v-10c0-1.903 1.332-3.489 3.112-3.894zM15.5 20c1.381 0 2.5 1.119 2.5 2.5v7c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5v-7c0-1.381 1.119-2.5 2.5-2.5z"></path></svg></span></div>');
}
if ($.exists('.block-left')) {
	var newBlockLeft = $('.block-left').clone();
	newBlockLeft.removeClass('block-left');
	
	newBlockLeft
		.addClass('aside-nav-list aside-nav-list_left-block')
		.appendTo(asideMenuScroller)
}
if ($.exists('.slider-left.baner-1')) {
	var newSliderLeft = $('.slider-left.baner-1').clone();
	
	newSliderLeft
		.addClass('aside-nav-list aside-nav-list_slider-left')
		.appendTo(asideMenuScroller)
		
	$('.baner-1 .slider').megaSlider({
		animation : 'fade'
	});
}
if ($.exists('.news-name')) {
	var newNewsName = $('.news-name').clone();
	
	newNewsName.removeClass('news-name');
	
	newNewsName
		.addClass('aside-nav-list aside-nav-list_news-name')
		.appendTo(asideMenuScroller)
}
if ($.exists('.news-wrap')) {
	var newNewsWrap = $('.news-wrap').clone();
	
	newNewsWrap.removeClass('news-wrap');
	
	newNewsWrap
		.addClass('aside-nav-list aside-nav-list_news-wrap')
		.appendTo(asideMenuScroller)
}
$.each(asideMenuScroller.find('li'), function(index, element) {
    
    if ($(element).find('ul').length) {

        var triggerIcon = ['<div class="svg-icon svg-icon--angle-down">',
                '<svg class="svg-icon__link" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">',
                    '<path d="M7 10l5 5 5-5z"/> <path d="M0 0h24v24H0z" fill="none"/>',
                '</svg>',
            '</div>'].join('');

        var subMenuTrigger = $('<div class="sub-menu-trigger">' + triggerIcon + '</div>');

        $(element)
            .addClass('is-has-child')
            .append(subMenuTrigger);
    }
});
if ($.exists('.aside-nav-list')) {

    $('.aside-nav-list').simpleMenu({
        timing : 500,
        menu : {
            trigger : '.sub-menu-trigger'
        }
    });
}
$('.aside-nav-list-title').on('click', function(){
	$(this).toggleClass('active');
});
function stylizeMobileCart() {

    $('.me-cart-trigger')
    .find('#shop2-cart-preview')
    .removeAttr('id')
    .end()
    .find('.order-btn')
    .removeClass('order-btn')
    .addClass('shop2-btn');
}

stylizeMobileCart();

shop2.on('afterCartAddItem', function(response, status) {
	console.log(123);

    if (!response.errstr) {

    var cartContent = $('<div class="toolbar-button-dropdown"/>');

    if (!$('.me-cart-trigger .toolbar-button-dropdown').length) {
    $('.me-cart-trigger').append(cartContent);
    }
    $('.me-cart-trigger .toolbar-button-dropdown').html(response.data);
    $(".me-cart-trigger__counter").text($(response.data).find('strong:first').text());
    }
});
$('.scroll-table, .table1, .table0, .shop2-table-order:not(.shop2-table-order--summary)').wrap("<div class='scroll-table_enabled'/>");
});
$(function() {
	
	$('.link_top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
    /**
	 * Прокрутка страницы вверх
	 */
    // main function
    function scrollToY(scrollTargetY, speed, easing) {
        // scrollTargetY: the target scrollY property of the window
        // speed: time in pixels per second
        // easing: easing equation to use

        var scrollY = window.scrollY || document.documentElement.scrollTop,
            scrollTargetY = scrollTargetY || 0,
            speed = speed || 2000,
            easing = easing || 'easeOutSine',
            currentTime = 0;

        // min time .1, max time .8 seconds
        var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        var easingEquations = {
                easeOutSine: function (pos) {
                    return Math.sin(pos * (Math.PI / 2));
                },
                easeInOutSine: function (pos) {
                    return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                },
                easeInOutQuint: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 5);
                    }
                    return 0.5 * (Math.pow((pos - 2), 5) + 2);
                }
            };

        // add animation loop
        function tick() {
            currentTime += 1 / 60;

            var p = currentTime / time;
            var t = easingEquations[easing](p);

            if (p < 1) {
                requestAnimFrame(tick);

                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
            } else {
                //console.log('scroll done');
                window.scrollTo(0, scrollTargetY);
            }
        }

        // call it once to get started
        tick();
    }
    
    /** ===========================================================================
     * Mobile scripts
     * ============================================================================ */
    /**
	 * определение существования элемента на странице
	 */
	$.exists = function(selector) {
	   return ($(selector).length > 0);
	}

    var mobileHeader = $('.mobile-header');
    var toTop = document.getElementById('b-2top');

    toTop.addEventListener('pointerup', function() {
        scrollToY(0, 1500, 'easeInOutQuint');
    }, false);

    function setupScrollEvents() {
    	
    	if (window.scrollY > 30) {
    		mobileHeader.addClass('mobile-header--not-top');
    	} else {
    		mobileHeader.removeClass('mobile-header--not-top');
    	}

        if (window.scrollY > 200) {
            toTop.classList.add('b-2top--is-show');
        } else {
            toTop.classList.remove('b-2top--is-show');
        }
    }
	
	setupScrollEvents();
	
    window.addEventListener('scroll', setupScrollEvents, supportsPassive ? { passive: true } : false);
});

(function($, window) {
    $.fn.myTabs = function() {
        return this.each(function() {
            var $this       = $(this),
                tabsLinks   = $this.find('.heading a'),
                tabsContents = $this.find('.tab-bodies'),
                tabsBlocks  = $this.find('.tab-bodies .tab'),
                activeClass = 'active',
                flag        = false;


            tabsLinks.on('click.myTabs', onLinkClick);


            function onLinkClick(event) {
            	event.preventDefault();
                var targetId = $(this).data('targetId'),
                    target = $(this);

                    tabsLinks.removeClass(activeClass);
                    target.addClass(activeClass);

                    tabsBlocks
                        .removeClass(activeClass)
                        .filter('[data-target-id="'+targetId+'"]')
                        .addClass(activeClass);


                    if (window.matchMedia("(max-width: 1340px)").matches){
                        $('.tabs-block .heading a.active').after(tabsContents);
                        var scrollBlock = $('.tabs-block .heading a.active').offset().top,
                        fixedTop    = $('.mobile-header').outerHeight();
                        $('html, body').animate({scrollTop: scrollBlock - fixedTop + 2}, 700);
                        var scrollWidth = $(window).outerWidth() - 62;
                        $('.scroll-table_enabled:visible').css('width', scrollWidth);
                    };
            };
            $(window).on('resize', function(){
                if (window.matchMedia("(max-width: 1340px)").matches){
                	var scrollWidth = $(window).outerWidth() - 62;
	                $('.scroll-table_enabled:visible').css('width', scrollWidth);
                    if (!flag){
                        $('.tabs-block .heading a.active').after(tabsContents);

                        flag = true;
                    }
                } else {
                    if (flag){
                        $('.tabs-block .heading').after(tabsContents);
                        $('.scroll-table_enabled:visible').css('width', '100%');

                        flag = false;
                    }
                }
            }).trigger('resize');

        });
    }
    $(function() {
        $('.tabs-block').myTabs();
    });
})(jQuery, window);
var flag = false;
var tabsContent = $('.shop2-product-desc');
var tabsTitle   = $('.shop2-product-tabs');
$(window).on('resize', function(){
	if (window.matchMedia("(max-width: 768px)").matches){
		if (!flag){
    		$('.shop2-product-tabs > li.active-tab').after(tabsContent); 
	
            flag = true;
        }
	} else {
		if (flag){
			$(tabsTitle).after(tabsContent);

            flag = false;
        }
	}	
}).trigger('resize');
$('.shop2-product-tabs > li > a').on('click', function(e){
	var $this = $(this),
		href = $this.attr('href');

	e.preventDefault();

	$('.shop2-product-tabs li').removeClass('active-tab');
	$this.parent().addClass('active-tab');

	$('.shop2-product-desc > div').removeClass('active-area');
	$(href).addClass('active-area');
	
	if (window.matchMedia("(max-width: 768px)").matches){
		$('.shop2-product-tabs > li.active-tab').after(tabsContent);
        var scrollBlock = $('.shop2-product-tabs > li.active-tab').offset().top,
        fixedTop    = $('.mobile-header').outerHeight();
        $('html, body').animate({scrollTop: scrollBlock - fixedTop + 2}, 700);
        var scrollWidth = $(window).outerWidth() - 62;
        $('.shop2-product-desc .desc-area .scroll-table_enabled').css('width', scrollWidth);
	}	
});
$(window).on('load resize' , function(){
	var imgHeight = 0;
	if ($('.fotorama__stage__frame.fotorama__loaded.fotorama__loaded--img.fotorama__active').length) {
		var imgHeight = $('.fotorama__stage__frame.fotorama__loaded.fotorama__loaded--img.fotorama__active img').outerHeight();	
		console.log(imgHeight);
		setTimeout(function(){
			$('.fotorama__stage').css('height', imgHeight);	
		}, 1000);
	}	
});
$(document).ready (function () {$('.sale').attr('style', '');

    $('.js-products-slider').slick({
        slidesToShow: 4,
        arrows: true,
        dots: false,
        variableWidth: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    variableWidth: true
                }
            }
        ]
    });
   $('.slider_on').on('click', function () {
   	$('.slider_on').hide();
   	$('.spoiler').show();
   });
   $('.slider_off').on('click', function () {
   	$('.slider_on').show();
   	$('.spoiler').hide();
   });
});

$().ready(function() { 
    var ie10Styles = [
        'msTouchAction','msWrapFlow','msWrapMargin','msWrapThrough','msOverflowStyle','msScrollChaining',
        'msScrollLimit','msScrollLimitXMin','msScrollLimitYMin','msScrollLimitXMax','msScrollLimitYMax',
        'msScrollRails','msScrollSnapPointsX','msScrollSnapPointsY','msScrollSnapType','msScrollSnapX',
        'msScrollSnapY','msScrollTranslation','msFlexbox','msFlex','msFlexOrder'
    ];
    
    var ie11Styles = [
        'msTextCombineHorizontal'
    ];
    
    /*
    * Test all IE only CSS properties
    */
    var d = document;
    var b = d.body;
    var s = b.style;
    var ieVersion = null;
    var property;
    
    // Test IE10 properties
    for (var i = 0; i < ie10Styles.length; i++) {
        property = ie10Styles[i];
        
        if (s[property] != undefined) {
            $('body').addClass("ie-10");
            $('body').addClass('ie');
        }
    }
    
    // Test IE11 properties
    for (var i = 0; i < ie11Styles.length; i++) {
        property = ie11Styles[i];
        
        if (s[property] != undefined) {
        if ($('body').hasClass("ie-10")) {
            $('body').removeClass("ie-10").addClass("ie-11");
            }
        else {
            $('body').addClass("ie-11");
            } 
        }
    }
});