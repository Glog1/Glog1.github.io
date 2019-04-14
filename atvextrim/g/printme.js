var s3 = s3 || {};

s3.printMe = (function() {

	function printMe(id, options) {
		var el, w, content = [], i, len;

		id = id || 'printMe';
		el = document.getElementById(id);

		if (!el) {
			return false;
		}
		
		options = options || {};
		options.doctype = options.doctype || printMe.doctype;
		options.stylesheet = options.stylesheet || printMe.stylesheet;
		options.window = printMe.extend(options.window, printMe.window);
		options.styles = printMe.extend(options.styles, printMe.styles);
		
		content.push(printMe.doctypes[options.doctype]);
		
		if (!options.stylesheet) {
			content.push('<style>');
			content.push(printMe.join(options.styles, '\n', '{', '}'));
			content.push('</style>');
		} else {
			if (!printMe.isArray(options.stylesheet)) {
				options.stylesheet = [options.stylesheet];
			}
			for (i = 0, len = options.stylesheet.length; i < len; i++) {
				content.push('<link rel="stylesheet" href="' + options.stylesheet[i] + '" />');
			}
		}

		content.push('<body onload="print()">');
		content.push(el.innerHTML);
		content.push('</body>');
		content.push('</html>');

		w = window.open('', 'printMe', printMe.join(options.window, ',', '='));
		w.document.write(content.join('\n'));
		w.document.close();
		w.focus();
	}

	printMe.doctypes = {
		'html:5': '<!doctype html>\n<html lang="en">',
		'html:xt': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">'
	};

	printMe.doctype = 'html:5';

	printMe.styles = {
		'body, td': 'font-size:12px; font-family: verdana;',
		'table.table1': 'font-size:8pt; border-collapse: collapse; font-family: verdana;',
		'table.table1 td': 'padding: 4px; border: 1px solid #333333;',
		'table.table0': 'font-size:8pt; border-collapse: collapse; font-family: verdana;'
	};

	printMe.window = {
		width: 700,
		height: 600,
		toolbar: 0,
		directories: 0,
		menubar: 0,
		status: 0,
		resizable: 1,
		location: 0,
		scrollbars: 'yes',
		copyhistory: 0,
		top: 10,
		left: 10
	};

	printMe.extend = function(a, b) {
		var prop;

		a = a || {};

		for (prop in b) {
			if (!a.hasOwnProperty(prop)) {
				a[prop] = b[prop];
			}
		}

		return a;
	}

	printMe.join = function(options, delimiter, ldelim, rdelim) {
		var option, arr = [];

		delimiter = delimiter || '\n';
		ldelim = ldelim || '';
		rdelim = rdelim || '';

		for (option in options) {
			arr.push(option + ldelim + options[option] + rdelim);
		}
		return arr.join(delimiter);
	}

	printMe.isArray = function(obj) {
		return Object.prototype.toString.call(obj) == '[object Array]';
	}

	return printMe;

})();

var printMe = printMe || s3.printMe;