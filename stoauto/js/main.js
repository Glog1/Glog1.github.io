// Preload
$(window).load(function() {
	$('body').removeClass('preload');
});

$(document).ready(function() {
	// Banner
	$('.banner').slick({
		draggable: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 9000,
		arrows: false,
		dots: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.js-catalog-slider').slick({
		draggable: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 12000,
		arrows: false,
		dots: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1
	});

	$('.js-catalog-slider__nav .slider-nav__prev').on('click', function() {
		$('.js-catalog-slider').slick('slickPrev');
	});

	$('.js-catalog-slider__nav .slider-nav__next').on('click', function() {
		$('.js-catalog-slider').slick('slickNext');
	});

	$('.js-company-slider').slick({
		draggable: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 15000,
		centerMode: true,
		centerPadding: '70px',
		arrows: false,
		dots: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.reviews-slider').slick({
		draggable: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 9000,
		arrows: false,
		dots: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.js-accessories-slider').slick({
		draggable: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 12000,
		arrows: false,
		dots: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1
	});

	$('.js-accessories-slider__nav .slider-nav__prev').on('click', function() {
		$('.js-accessories-slider').slick('slickPrev');
	});
	
	$('.js-accessories-slider__nav .slider-nav__next').on('click', function() {
		$('.js-accessories-slider').slick('slickNext');
	});

	$('.js-models-slider').slick({
		draggable: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 15000,
		arrows: false,
		dots: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1
	});

	$('.js-models-slider__nav .slider-nav__prev').on('click', function() {
		$('.js-models-slider').slick('slickPrev');
	});
	
	$('.js-models-slider__nav .slider-nav__next').on('click', function() {
		$('.js-models-slider').slick('slickNext');
	});

	$('.js-auto-slider').slick({
		draggable: false,
		infinite: false,
		autoplay: false,
		arrows: false,
		dots: false,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		lazyLoad: 'ondemand',
		asNavFor: '.auto-slider__nav',
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.auto-slider__nav').slick({
		arrows: false,
		dots: false,
		focusOnSelect: true,
		lazyLoad: 'ondemand',
		asNavFor: '.js-auto-slider',
		slidesToShow: 8,
		slidesToScroll: 1
	});

	// Masked
	$('.js-masked').mask('+7 (999) 999 99 99');

	// Datepicker
	$('.js-datepicker').datepicker({
		autoHide: true,
		format: 'dd.mm.yyyy',
		days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
	});

	// Shadow
	$('.advantages-item__shadow').each(function() {
		var height = $(this).prev().outerHeight() + $(this).prev().children().outerHeight();
		 $(this).css('height', height);
	});

	// Spoiler
	$('.spoiler-item__title').on('click', function() {
		$(this).toggleClass('active').next().stop(false, true).slideToggle(300);
	});

	// Price
	$(document).on('click', '[data-main]', function() {
		$(this).find('.auto-price__option_title').toggleClass('open');
		$('tr[data-child=' + $(this).data('main') + ']').slideToggle(0);
	});

	// Models
	$('.js-models-open').on('click', function() {
		$('.models-popup').toggleClass('open');
		return false;
	});

	$(document).on('click', function(event) {
		if ($(event.target).closest('.models-popup').length) return;
		$('.models-popup').removeClass('open');
	});

	// Header
	$(window).on('scroll', function() {
		var height = $(window).scrollTop();
		if (height > 100) {
			$('.header').addClass('sticky');
			$('.wrapper').addClass('scroll');
		} else{
			$('.header').removeClass('sticky');
			$('.wrapper').removeClass('scroll');
		}
	});

	// Tabs
	$('.js-tabs-box').hide();
	$('.js-tabs-box:first-of-type').show();
	$('.js-tabs-menu__item:first-of-type').addClass('active');

	$('.js-tabs-menu__item').on('click', function(event) {
		event.preventDefault();
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('.js-tabs').find('.js-tabs-box').hide().eq($(this).index()).show();
	});

	// Popup
	$('.js-popup-open').on('click', function(event) {
		event.preventDefault();
		var popup = $(this).attr('href');
		$(popup).addClass('open');
		$('body').addClass('scroll-no');
	});

	$('.popup').on('click', function(event) {
		if ($(event.target).is('.popup-close') || $(event.target).is('.popup')) {
			$(this).removeClass('open');
			$('body').removeClass('scroll-no');
		}
	});

	// Dropdown
	$('.select').on('click', function() {
		var open = 0;
		if ($(this).parent().hasClass('open'))
			open = 1;
		$('.dropdown').removeClass('open');
		if (open)
			$(this).parent().removeClass('open');
		else {
			$(this).parent().toggleClass('open');
		}
		if ($(this).siblings('.select-list').find('.select-list__item').length > 3) {
			$(this).siblings('.select-list').mCustomScrollbar();
		}
	});

	$('body').on('click', function(event) {
		if($(event.target).closest('.dropdown').length)
			return;
		else
			$('.dropdown').removeClass('open');
	});

	$('.select-list__item').on('click', function() {
		$(this).closest('.dropdown').children('.select').html($(this).html());
			if ($(this).attr('rel'))
				$(this).closest('.dropdown').find('input').val($(this).attr('rel'))
		$('.dropdown').removeClass('open');
	});

	//Map
	// var map;
	// var address;
	// var mapType = 'map';
	// function initialize() {
	// 	address = new google.maps.LatLng(57.627829, 39.875345);
	// 	var featureOpts = [
	// 		{
	// 			"featureType": "administrative.country",
	// 			"elementType": "geometry",
	// 			"stylers": [
	// 				{
	// 					"visibility": "simplified"
	// 				},
	// 				{
	// 					"hue": "#ff0000"
	// 				}
	// 			]
	// 		}
	// 	]
	// 	var mapOptions = {
	// 		zoom: 17,
	// 		center: address,
	// 		disableDefaultUI: true,
	// 		zoomControl: true,
	// 		scrollwheel: false,
	// 		zoomControlOptions: {
	// 		style: google.maps.ZoomControlStyle.LARGE,
	// 		position: google.maps.ControlPosition.LEFT_CENTER
	// 		},
	// 		mapTypeControlOptions: {
	// 		mapTypeIds: [google.maps.MapTypeId.ROADMAP, mapType]
	// 		},
	// 		mapTypeId: mapType
	// 	};

	// 	var styledMapOptions = {
	// 		name: 'map'
	// 	};

	// 	map = new google.maps.Map(document.getElementById('address'),
	// 		mapOptions);

	// 	var blueMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
	// 		map.mapTypes.set(mapType, blueMapType);
	// }
	// 	google.maps.event.addDomListener(window, 'load', initialize);

	// Sprites
	(function(window, document) {
		'use strict';
		var file = 'images/sprite.svg',
			revision = 1;
		if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
		var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
		request,
		data,
		insertIT = function() {
			document.body.insertAdjacentHTML('afterbegin', data);
		},
		insert = function() {
			if (document.body) insertIT();
			else document.addEventListener('DOMContentLoaded', insertIT);
		};
		if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
			data = localStorage.getItem('inlineSVGdata');
			if (data) {
				insert();
				return true;
			}
		}
		try {
			request = new XMLHttpRequest();
			request.open('GET', file, true);
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					data = request.responseText;
					insert();
					if (isLocalStorage) {
						localStorage.setItem('inlineSVGdata', data);
						localStorage.setItem('inlineSVGrev', revision);
					}
				}
			}
		request.send();
	} catch (e) {}
	} (window, document));
});