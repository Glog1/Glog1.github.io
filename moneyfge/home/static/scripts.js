'use strict';

// iOS Hover Fix
(function (l) { var i, s = {touchend: function () {}}; for (i in s)l.addEventListener(i, s) })(document)
// iOS Hover Fix

setTimeout(function () {
	let inputTel = document.querySelectorAll('input[type=tel]')
	let phoneLocalstorage = localStorage.getItem('MoneyFGEPhone')
	inputTel.forEach(function (item) {
		item.value = phoneLocalstorage
	})
}, 1000)

function initCountrySelect (immediate) {
	immediate = immediate || false
	if (!immediate) {
		setTimeout(function () {
			initCountrySelect(true)
		}, 200)
		return
	}

	var lang = getCookie('lang')
	if (!lang) {
		lang = 'ru'
	}
}

/*
 * Common requests
 */

function getUserInfoByIp () {
	return $.get('https://ipinfo.io', function () {}, 'json')
}

/*
 * Cookies
 */

function getCookie (name) {
	var value = '; ' + document.cookie
	var parts = value.split('; ' + name + '=')
	if (parts.length === 2) return parts.pop().split(';').shift()
}

// expire time is set in minutes
function setCookie (name, value, expires) {
	if (typeof expires === 'undefined') {
		expires = null
	}
	if (!expires) {
		document.cookie = name + '=' + value + '; Path=/;'
	} else if (expires === true) {
		setCookie(name, value, CONFIG.COOKIE_EXPIRE_TIME)
	} else {
		var dtExpires = new Date(new Date().getTime() + expires * 1000 * 60)
		document.cookie = name + '=' + value + '; expires=' + dtExpires.toUTCString() + '; Path=/;'
	}
}

function deleteCookie (name) {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

// Main method used to send requests to server API
// use \g as path starting to prevent its concatenation with API_GATEWAY
function sendApiReq (path, method, data, appendToken, retryLimit) {
	// handles requests processing
	// the receiver doesn't even know about auth error

	method = method || 'GET'
	data = data || null
	appendToken = typeof appendToken === 'undefined' ? true : appendToken
	retryLimit = typeof retryLimit === 'undefined' ? 1 : retryLimit

	if (!path.startsWith('\g')) {
		path = CONFIG_API_ENDPOINT + path
	} else {
		path = path.substr(1)
	}

	var gToken = null
	if (appendToken) {
		gToken = getCookie('gToken')
	}

	if (!appendToken || gToken) {
		return _sendRequestCore(path, method, appendToken ? gToken : null, data, retryLimit)
	} else if (!gToken) {
		return guestTokenRequest().then(
			function (res) {
				gToken = res.access_token
				return _sendRequestCore(path, method, gToken, data, retryLimit)
			},
			function (jqXHR, err) {
				return jqXHR
			}
		)
	}
}

// Private aux method
function _sendRequestCore (path, method, token, data, retryLimit, tryCount) {
	// try send request
	// update token if 401 received and try again

	method = method || 'GET'
	data = data || null
	token = typeof token === 'undefined' ? true : token
	retryLimit = typeof retryLimit === 'undefined' ? 1 : retryLimit
	tryCount = typeof tryCount === 'undefined' ? 0 : tryCount

	return $.ajax({
		url: path,
		type: method,
		headers: token ? {'Authorization': 'Bearer ' + token} : {},
		data: data,

		contentType: 'application/json',
		dataType: 'json'

	}).then(
		function (res) {
			return res
		},
		function (err) {
			if (err.status === 401) {
				console.log('trying to fix token')
				if (tryCount >= retryLimit) {
					console.log('too many tries')
					return
				}

				// todo: try to fix auth
				return guestTokenRequest().then(
					function (res) {
						// token is already set in cookies
						// we can use if for later requests
						var token = res.access_token
						return _sendRequestCore(path, method, token, data, tryCount + 1, retryLimit)
					},
					function (err) {
						// error getting token
						// we have nothing to do
						return err
					}
				)
			}
			return err
		}
	)
}

// get gToken from API
function guestTokenRequest () {
	return sendApiReq(
		'\g' + CONFIG_WEBSITE_ENDPOINT + 'backend/web/app_dev.php/oauth/v2/token?client_id=3_p08hEG4THmS3TPlOpS9cYqsh9Aj3vxGUYN8XtmxWLjVtfzoqHg&client_secret=7LYlYxmWBhyjosH3RvRybyCyogmOODppWo6YTLOgBljujlmHSB&grant_type=client_credentials',
		'GET', null, false, 0
	).then(
		function (res) {
			setCookie('gToken', res.access_token, true)
			return res
		},
		function (err) {
			console.log('error trying to get new gToken')
			return err
		}
	)
}

function appendLang (url) {
	var lang = getCookie('lang')
	if (CONFIG.ALLOWED_TICKETS_LOCALES.indexOf(lang) !== -1) {
		lang = 'lang=' + lang
	} else {
		lang = 'lang=en'
	}

	var separator = '?'
	if (url.indexOf('?') !== -1) {
		separator = '&'
	}

	return url + separator + lang
}

// aSedner
(function (d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0]
	js = d.createElement(s)
	js.id = id
	js.src = 'https://widget.sender.mobi/build/init.js'
	fjs.parentNode.insertBefore(js, fjs, 'sender-widget')

	window.senderCallback = function () {
		SenderWidget.init({
			companyId: 'i26766331711'
		})
	}
})(document, 'script')
