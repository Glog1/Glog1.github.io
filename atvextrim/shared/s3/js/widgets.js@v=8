var widgets = (function() {

	var widgets = {
		preloaderURL: '/shared/images/preloader.gif',

		addToCart: function (shop_id, product_id, price, obj) {//{{{
			var amount = 1;
			product_id = Number(product_id);
			price = Number(price);

			// Get price dynamically
			$.post('/my/s3/export/shop/product.php', {
					'mode': 'json',
					'action': 'get-product',
					'shop_id': shop_id,
					'product_id': product_id
				},
				function (data) {//{{{
					if (widgets.isEmptyObject(data) && typeof obj.href == "string") {
						location.href = obj.href;
						return true;
					}

					if (data && data.product_price != undefined) {
						price = Number(data.product_price);
					}

					var result = true, amount_limit = amount;

					/* If window._shop.products.PRODUCT_ID.amount is set, then we must limit
					 * amount to that value */
					var has_amount_limit = (data.product_amount_limit == '1' ? true : false);
					if (has_amount_limit) {
						amount_limit = Number(data.product_amount);
						if (amount_limit < amount) {
							amount = amount_limit;
						}
					}

					// Input is valid?
					if (!isNaN(shop_id) && (shop_id > 0) && !isNaN(product_id) && (product_id > 0)
						&& !isNaN(price) && !isNaN(amount) && (amount > 0)) {
						// Temporary variables
						var cart_new = "", cart_item_split, found = false, total_amount = 0, ta, e;

						// Read cookies
						var total = readCookie('CART_TOTAL_' + shop_id);
						var cart = unescape(readCookie('CART_' + shop_id));

						// Split cart cookie into product_id=amount chunks
						var cart_split = cart.split(';');

						// Ensure total is of number data type
						if (isNaN(total)) total = Number(total);

						// Loop though cart item chunks
						for (var i = 0; i < cart_split.length; i++) {
							// Split into product_id, amount
							cart_item_split = cart_split[i].split("=");

							// Valid?
							if (cart_item_split.length == 2) {
								if (!found && cart_item_split[0] == product_id) {
									if (!(has_amount_limit && cart_item_split[1] >= amount_limit))
										total = Number(total) + price * amount;
									ta = amount + Number(cart_item_split[1]);
									if (has_amount_limit && ta > amount_limit) {
										ta = amount_limit;
										result = false;
										widgets.msg(window._s3Lang['JS_SHOP_PRODUCT_AMOUNT_TOTAL']
											+ ': ' + amount_limit, obj);
									}

									found = true;

									if (cart_new != "") cart_new = cart_new + ";";
									cart_new = cart_new + product_id + "=" + ta;

									// Update total amount
									total_amount += ta;
								} else { // This is another product_id. So keep it w/out modifications
									if (cart_new != "") cart_new = cart_new + ";";
									cart_new = cart_new + cart_item_split[0] + "=" + cart_item_split[1];

									// Update total amount
									total_amount += Number(cart_item_split[1]);
								}
							} // ## if valid chunk
						} // ## for

						// The product_id is not found in the cart
						if (!found) {
							if (cart_new != "") cart_new = cart_new + ";";
							cart_new = cart_new + product_id + "=" + amount;
							total = Number(total) + price * amount;

							// Update total amount
							total_amount += amount;
						}

						// Round total price
						total = Math.round(total * 100) / 100;

						// Write cookies
						createCookie('CART_' + shop_id, cart_new, 10);
						createCookie('CART_TOTAL_' + shop_id, total, 10);
						createCookie('CART_TOTAL_AMOUNT_' + shop_id, total_amount, 10);

						// Update DOM nodes
						e = document.getElementById('cart_total');
						if (e) e.innerHTML = total;
						e = document.getElementById('cart_total_amount');
						if (e) e.innerHTML = total_amount;

						if (result)
							widgets.msg(window._s3Lang['JS_ADDED'], obj);

						return true;
					}
				},//}}}
				'json'
			);

			return false;
		},//}}}

		formatPrice: function (str, ts, dot) {
			if (typeof str != 'string') str = String(str);
			if (ts == null) ts = ' ';
			if (dot == null) dot = '.';
			if (dot != '.') str = str.replace('.', dot);

			var parts = str.split(dot), res = [], i;

			if (parts[0].length >= 4) {
				for (i = (parts[0].length - 1), j = 1; i >= 0; --i, ++j) {
					res.unshift(parts[0].charAt(i));
					if (j % 3 == 0 && i > 0)
						res.unshift(ts);
				}

				return res.join('') + (parts[1] ? dot + parts[1] : '');
			}
			return str;
		},

		addOnloadEvent: function (func) {
			var oldonload = window.onload;
			if (typeof window.onload != 'function') {
				window.onload = func;
			} else {
				window.onload = function () {
					if (oldonload) {
						oldonload();
					}
					func();
				}
			}
		},

		msg: function (text, obj, className) {
			if (!obj) return;
			var pos = findPos(obj);
			var d = document.createElement("DIV");
			if (d) {
				d.style.position = 'absolute';
				d.innerHTML = text;
				d.style.display = 'block';
				d.className = className ? className : 'added-to-cart';
				d.style.left = (pos.x + obj.offsetWidth) + 'px';
				d.style.top = (pos.y + obj.offsetHeight) + 'px';

				/*
				 * Try to fix situation when the DIV appears partly over the scope
				 * of the window.  There is no way to compute width of detached
				 * element. So we use some hardcode here.
				 */
				try {
					if ($(window).width() <= (parseInt(d.style.left) + 120)) {
						d.style.left = (pos.x - 80) + 'px';
						d.style.top = (pos.y + obj.offsetHeight) + 'px';
					}
				} catch (e) { /* skip */
				}
				document.body.appendChild(d);

				window.setTimeout(function () {
					if (d && d.parentNode) d.parentNode.removeChild(d);
					delete d;
				}, 1500);
			}
		},

		/**
		 * @brief Create AJAX preloader node
		 * @param Node node Object used to align preloader
		 * @return Node
		 */
		createPreloader: function (node) {
			var pos = findPos(node);
			var div = document.createElement('div');
			with (div.style) {
				position = 'absolute';
				display = 'block';
				left = (pos.x + node.offsetWidth) + 'px';
				top = (pos.y + node.offsetHeight) + 'px';
				width = 32;
				height = 32;
				background = "url(" + this.preloaderURL + ") center center no-repeat transparent";
				zIndex = 2000;
			}

			return div;
		},
		addEvent: function (elem, evType, fn) {
			if (elem.addEventListener) {
				elem.addEventListener(evType, fn, false);
			} else if (elem.attachEvent) {
				elem.attachEvent('on' + evType, fn)
			}
		},

		isEmptyObject: function (obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		}
	};

	window.findPos = function findPos(obj) {
		var result = {x: 0, y: 0};

		if (obj.offsetParent) {
			while (obj.offsetParent) {
				result.y += obj.offsetTop;
				result.x += obj.offsetLeft;
				obj = obj.offsetParent;
			}
		} else {
			if (obj.x) result.x += obj.x;
			if (obj.y) result.y += obj.y;
		}

		return result;
	};

	/**
	 * Trims a string
	 * @author Ruslan Osmanov
	 */
	String.prototype.trim = function (s) {
		var d = (s ? s : '[\\t\\s\\n\\r]');
		return this.replace(new RegExp("^" + d + "+"), '').replace(new RegExp(d + "+$"), '');
	};

	function parseQuery(query) {
		var res = {};
		if (query.charAt(0) === '?') {
			query = query.slice(1);
		}
		query.split('&').forEach(function(part) {
			var parts = part.split('=');
			var key = parts[0];
			var value;
			if (parts.length === 2) {
				value = parts[1];
			}
			res[key] = value;
		});
		return res;
	}


	function loadScript(url) {
		var script = document.createElement('script');
		script.src = url;
		(document.head || document.body).appendChild(script);
	}


	var query = parseQuery(location.search);

	if (('debug') in query  || sessionStorage.getItem('csspatchDebug')) {
		loadScript('//debug-frontend.oml.ru/g/s3/csspatch/csspatch.client.js?_=' + Date.now());
		sessionStorage.setItem('csspatchDebug', 1);
	} else	if (('csspatch' in query || sessionStorage.getItem('csspatch')) && window.top !== window.self) {
		loadScript('/g/s3/csspatch/csspatch.client.js?_=' + Date.now());
		sessionStorage.setItem('csspatch', 1);
	}

	if (('fastEdit') in query || sessionStorage.getItem('fastedit')) {
		loadScript('/my/s3/js/fastedit.client.js?_=' + Date.now());
		sessionStorage.setItem('fastedit', 1)
	}

	return widgets;

})();
