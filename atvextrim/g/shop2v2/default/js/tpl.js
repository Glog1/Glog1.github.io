'use strict';

(function($) {

	$.runQueue = function(queue) {
		$.each(queue, function(method) {
			var f = queue[method];
			if ($.isFunction(f)) {
				f.call(queue);
			}
		});
	};

})(jQuery);

(function($, self) {

	var tpl = {
		queue: {},
		init: function() {

			$(function() {
				$.runQueue(tpl.queue);
			});
		}
	};

	tpl.queue = {
		rating: function() {
			
			$('form .tpl-stars').each(function() {
				var $this = $(this),
					selected = null,
					stars = $this.children('span'),
					input = $this.children('input');

				function choose(elem) {
					elem = $(elem);
					stars.removeClass('tpl-active');
					elem.addClass('tpl-active').prevAll().addClass('tpl-active');	
				}
				
				$this.on({
					click: function(e) {
						selected = e.target;
						input.val($(selected).index() + 1);
					},
					mousemove: function(e) {
						choose(e.target);
					},
					mouseleave: function(e) {
						choose(selected);
					}
				});

			});
			
		}
	};

	tpl.init();

	self.tpl = tpl;

})(jQuery, window);