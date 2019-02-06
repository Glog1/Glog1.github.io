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
						"color": "#212121"
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
						"color": "#757575"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#212121"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "administrative.country",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
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
				"featureType": "administrative.locality",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
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
						"color": "#181818"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1b1b1b"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#2c2c2c"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#8a8a8a"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#373737"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#3c3c3c"
					}
				]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#4e4e4e"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#3d3d3d"
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

		if (frameActive) {
			frameActive.onclick = function () {
				if (this.checked) {
					let frameStyles = document.querySelectorAll('.js-frame-style')
					for (let i= 0; i < frameStyles.length; i++) {
						frameStyles[i].removeAttribute("disabled")
					}
				}
			};
		}


		function frameDisabledFunc () {

				let frameStyles = document.querySelectorAll('.js-frame-style')
				for (let i= 0; i < frameStyles.length; i++) {
					frameStyles[i].setAttribute("disabled", "disabled")
				}

		};

		let mapTypeButtonLand = document.querySelector(".js-type-landscape")
		let mapTypeButtonPort = document.querySelector(".js-type-portait")
		let secondMap = document.querySelector(".js-second-map")
		if (mapTypeButtonLand) {

			mapTypeButtonLand.onclick = function () {

				if (this.checked) {
					secondMap.classList.add("landscape")
					secondMap.classList.remove("portait")
				}

			}
		}
		if (mapTypeButtonPort) {
			mapTypeButtonPort.onclick = function () {

				if (this.checked) {
					secondMap.classList.add("portait")
					secondMap.classList.remove("landscape")
				}

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
	},
	mapSize: function () {

		let buttonSizeMap = document.querySelectorAll('.js-input-change-size-map');
		let typeLandscape = document.querySelector(".js-type-landscape");
		let typePortait = document.querySelector(".js-type-portait");
		if (typeLandscape || typePortait) {
			typeLandscape.addEventListener('click', checkedInputSize);
			typePortait.addEventListener('click', checkedInputSize);
		}

		function  checkedInputSize() {

			for (let i= 0; i < buttonSizeMap.length; i++) {
				if(buttonSizeMap[i].checked) {
					buttonSizeMap[i].click()
				}
			}
		}
		if (buttonSizeMap) {
			for (let i= 0; i < buttonSizeMap.length; i++) {
				buttonSizeMap[i].addEventListener('click', toggleSizeMap);

			}
		}

		function  toggleSizeMap() {
			let mapSize = this.getAttribute('data-map-size');
			let pencilMapSize = document.querySelector(".js-pencil-size-map");
			let mainMap = document.querySelector(".js-second-map");


			let computedStyle = getComputedStyle(pencilMapSize);
			let values = computedStyle.transform.split('(')[1].split(')')[0].split(',');

			let a = values[0];
			let b = values[1];
			let c = values[2];
			let d = values[3];
			let e = values[4];
			let f = values[5];

			if (mainMap.classList.contains("landscape")) {
				a = 0
				d = 0

				b = '-' + mapSize
				c = mapSize

			} else {
				a = mapSize
				d = mapSize

				b = 0
				c = 0
			}

			pencilMapSize.style.transform = 'matrix('+a+','+b+','+c+','+d+','+e+','+f+')'

		}

	}
	// scrollEditor: function () {
	//
	// 	let editorBlock = document.querySelector('.o-editor');
	// 	let mainBody = document.querySelector('.c-page');
	//
	// 	mainBody.onscroll = function() {
	//
	// 		editorBlock.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
	// 		mainBody.classList.add('js-scroll');
	//
	// 		setTimeout(function() {
	// 			mainBody.classList.remove('js-scroll');
	// 		}, 1000)
	//
	// 	}
	//
	// }

};

(function() {

	App.init(),
	App.sidebarNav(),
	App.slider(),
	App.mapSize()
	// App.scrollEditor()

})();

