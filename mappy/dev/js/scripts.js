// GOOGLE MAP
	//Black
window.initMap = function () {
	var uluru = {lat: 50.489351, lng: 30.479336};
	var map = new google.maps.Map(document.getElementById('mapBlack'), {
		zoom: 10,
		center: uluru,
		streetViewControl: false,
		mapTypeControl: false,
		scrollwheel: false,
		zoomControl: false,
		fullscreenControl: false,
		styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "administrative.neighborhood",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#3a3a3a"
					},
					{
						"weight": 1
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dadada"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#c9c9c9"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			}
		]
	});
	//var image = 'img/icon/marker.svg';
	// var marker = new google.maps.Marker({
	// 	position: uluru,
	// 	map: map
	// 	//icon: image
	// });
}



var App = {

	options: {},

	init: function () {

		//Open mobile menu
		let burgerBtn = document.querySelector('.js-burger');
		let mobileMenu = document.querySelector('.js-mobile-menu');
		let mainBody = document.querySelector('.c-page');
		burgerBtn.onclick = function () {

			mobileMenu.classList.toggle('js-active');
			mainBody.classList.toggle('js-mobile-menu');
			this.classList.toggle('js-active');


		};


		let frameActive =  document.querySelector('.js-active-frame');
		let frameDisable =  document.querySelectorAll('.js-disable-frame');

		for (let iFrameDis= 0; iFrameDis < frameDisable.length; iFrameDis++) {
			frameDisable[iFrameDis].addEventListener('click', frameDisabledFunc);
		}

		frameActive.onclick = function () {
			if (this.checked) {
				let frameStyles = document.querySelectorAll('.js-frame-style')
				for (let i= 0; i < frameStyles.length; i++) {
					frameStyles[i].removeAttribute("disabled")
				}
			}
		};

		function frameDisabledFunc () {

				let frameStyles = document.querySelectorAll('.js-frame-style')
				for (let i= 0; i < frameStyles.length; i++) {
					frameStyles[i].setAttribute("disabled", "disabled")
				}

		};

		let mapTypeButtonLand = document.querySelector(".js-type-landscape")
		let mapTypeButtonPort = document.querySelector(".js-type-portait")
		let secondMap = document.querySelector(".js-second-map")

		mapTypeButtonLand.onclick = function () {

			if (this.checked) {
				secondMap.classList.add("landscape")
				secondMap.classList.remove("portait")
			}

		}
		mapTypeButtonPort.onclick = function () {

			if (this.checked) {
				secondMap.classList.add("portait")
				secondMap.classList.remove("landscape")
			}

		}

	},

	sidebarNav: function () {
		let sibebarItem = document.querySelectorAll('.js-sidebar-item');

		for (let i= 0; i < sibebarItem.length; i++) {
			sibebarItem[i].addEventListener('click', toggleItem);
		}
		
		function toggleItem () {
			const itemClass = this.getAttribute('data-main');

			let sidebarCont = document.querySelectorAll('.js-sidebar-content');

			for (let i= 0; i < sibebarItem.length; i++) {
				sibebarItem[i].classList.remove('js-active');
			}

			this.classList.add('js-active');

			for (let i= 0; i < sidebarCont.length; i++) {

				sidebarCont[i].classList.remove('js-active');

				if (sidebarCont[i].getAttribute('data-child') == itemClass) {

					sidebarCont[i].classList.add('js-active');

				}

			}
		}
	},
	slider: function () {
		if (document.querySelector('.js-maps-slider')) {

			let mapsSlider = tns({
				"container": ".js-maps-slider",
				"items": 1,
				"controls": false,
				"swipeAngle": false,
				"mouseDrag": true,
				"speed": 400,
				//"fixedWidth": 260,
				//"gutter": 30,
				//"edgePadding": 60,
				responsive: {
					480: {
						"items": 2,

					},
					768: {
						"items": 3,

					},
					1440: {
						"items": 4
					},
					1740: {
						"items": 5
					}
				}
			});
		}
	}


};

(function() {

	App.init(),
	App.sidebarNav(),
	App.slider()

})();

