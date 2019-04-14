/**
Autor: megagroup.ru a.h.

*/

(function( $ ){

  $.fn.megaSlider = function( options ) {  

		// Создаём настройки по-умолчанию, расширяя их с помощью параметров, которые были переданы
		var settings = $.extend( {
			'nav' : true, // в smarty
			'bullets' : true, // в smarty
			'bulletposition' : 'bottom-right',
			'player' : true, // в smarty
			'autoplay' : true,
			'cycle' : true, //*
			'start' : 0,
			'save' : false, //*
			'animation' : "random",
			'interval' : 2000,
			'speed' : 500,
			'textanimation' : 'fade',
			'textspeed' : 300,
			'textposition' : 'bottom',
			'thumbnails' : false, // в smarty
			'autohide' : true, //*
			'hideanimation' : 'fade', //*
			'slicecount' : 20,
			'onBeforeTextAnimation' : null, //*
			'onAfterTextAnimation' : null, //*
			'onBeforeImageAnimation' : null, //*
			'onAfterImageAnimation' : null,  //*
			'onChangeSlide' : null
		}, options);
    return this.each(function() {        
			var 
				$this      = $(this), 
				attrClass       = this.className.split(" ")[0],
				$items = $this.find('.' + attrClass + '-items'),
				$itemsInner = $this.find('.' + attrClass + '-items-inner'),
				$item = $this.find('.' + attrClass + '-item'),
				$texts = $this.find('.' + attrClass + '-text'),
				$images = $this.find('.' + attrClass + '-image'),
				$prev = $this.find('.' + attrClass + '-prev'),
				$next = $this.find('.' + attrClass + '-next'),
				$player = $this.find('.' + attrClass + '-player'),
				$bullets = $this.find('.' + attrClass + '-bullets');
			var inter,
				rand = !!(settings.animation.indexOf('random')+1),
				animations = (function(){
					var arr = [];
					
					for (var i = 0; i < settings.animation.split(' ').length; i++) {
						if (settings.animation.split(' ')[i] != 'random') arr.push(settings.animation.split(' ')[i]);
					}
					return arr;
				})();
			$this.data( 'options', {
				current : settings.start,
				nextAnimation : 0
				
			});
			$item.each(function(index, element) {
                $(this).data('options', {
					image : $(this).find('.' + attrClass + '-image img').attr('src')
				})
            });
			$item.hide();
			$item.eq(settings.start).show();
			$texts.each(function(index, element){
				$(this).addClass(attrClass + '-text-' + settings.textposition);
			});
			$bullets.addClass(attrClass + '-bullets-' + settings.bulletposition);
			
			var now_animated = false;
			
			var 
				animationTypes = {
					fade : function(ind){
						if (ind != $this.data( 'options' ).current) {
							now_animated = true;
							stopAnimation();
							var current = $item.eq($this.data( 'options' ).current);
							var current_text = current.find('.' + attrClass + '-text');
							var current_image = current.find('.' + attrClass + '-image');
							var next = $item.eq(ind);
							var next_text = next.find('.' + attrClass + '-text');
							var next_image = next.find('.' + attrClass + '-image');
							
							var current_image_backup = current_image.html();
							var next_image_backup = next_image.html();
							
							
							current_image.html('<img src="' + current.data('options').image + '" />');
							next_image.html('<img src="' + next.data('options').image + '" />');
							current.removeAttr('style');
							current.css({
								'z-index' : 200
							}).show();
							next.removeAttr('style');
							next.show().css({
								'z-index' : 100
							});
							animateText(settings.textanimation,current_text,'setCurrent');
							animateText(settings.textanimation,next_text,'setNext');
							if (current_text.length) {
								if (settings.onBeforeTextAnimation) settings.onBeforeTextAnimation();
								animateText (settings.textanimation,current_text,'hide',function(){
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current_image.fadeOut(settings.speed,function () {
										current.hide();
										current_image.show();
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
								})
							} else {
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current_image.fadeOut(settings.speed,function () {
										current.hide();
										current_image.show();
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
							}
						}
					},
					slideLeft : function (ind) {
						
						if (ind != $this.data( 'options' ).current) {
							now_animated = true;
							stopAnimation();
							var current = $item.eq($this.data( 'options' ).current);
							var current_text = current.find('.' + attrClass + '-text');
							var current_image = current.find('.' + attrClass + '-image');
							var next = $item.eq(ind);
							var next_text = next.find('.' + attrClass + '-text');
							var next_image = next.find('.' + attrClass + '-image');
							
							var current_image_backup = current_image.html();
							var next_image_backup = next_image.html();

							current_image.html('<img src="' + current.data('options').image + '" />');
							next_image.html('<img src="' + next.data('options').image + '" />');
							current.removeAttr('style');
							current.css({
								'z-index' : 200,
								'right' : 'auto'
							}).show();
							next.removeAttr('style');
							next.css({
								'z-index' : 100,
								'left' : next.outerWidth(),
								'right' : 'auto'
							}).show();
							animateText(settings.textanimation,current_text,'setCurrent');
							animateText(settings.textanimation,next_text,'setNext');
							if (current_text.length) {
								if (settings.onBeforeTextAnimation) settings.onBeforeTextAnimation();
								animateText (settings.textanimation,current_text,'hide',function(){
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current.animate({
										'left' : - current.outerWidth()
									},settings.speed,function () {
										current.hide();
									});
									next.animate({
										'left' : 0
									},settings.speed,function () {
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {

											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
								})
							} else {
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current.animate({
										'left' : - current.outerWidth()
									},settings.speed,function () {
										current.hide();
									});
									next.animate({
										'left' : 0
									},settings.speed,function () {
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
							}
						}
					},
					slideRight : function (ind) {
						
						if (ind != $this.data( 'options' ).current) {
							now_animated = true;
							stopAnimation();
							var current = $item.eq($this.data( 'options' ).current);
							var current_text = current.find('.' + attrClass + '-text');
							var current_image = current.find('.' + attrClass + '-image');
							var next = $item.eq(ind);
							var next_text = next.find('.' + attrClass + '-text');
							var next_image = next.find('.' + attrClass + '-image');
							var current_image_backup = current_image.html();
							var next_image_backup = next_image.html();
							
							current_image.html('<img src="' + current.data('options').image + '" />');
							next_image.html('<img src="' + next.data('options').image + '" />');
							current.removeAttr('style');
							current.css({
								'z-index' : 200,
								'left' : 'auto'
							}).show();
							next.removeAttr('style');
							next.css({
								'z-index' : 100,
								'right' : next.outerWidth(),
								'left' : 'auto'
							}).show();
							animateText(settings.textanimation,current_text,'setCurrent');
							animateText(settings.textanimation,next_text,'setNext');
							if (current_text.length) {
								if (settings.onBeforeTextAnimation) settings.onBeforeTextAnimation();
								animateText (settings.textanimation,current_text,'hide',function(){
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current.animate({
										'right' : - current.outerWidth()
									},settings.speed,function () {
										current.hide();
									});
									next.animate({
										'right' : 0
									},settings.speed,function () {
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
								})
							} else {
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current.animate({
										'right' : - current.outerWidth()
									},settings.speed,function () {
										current.hide();
									});
									next.animate({
										'right' : 0
									},settings.speed,function () {
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
							}
						}
					},
					slideTop : function (ind) {
						if (ind != $this.data( 'options' ).current) {
							now_animated = true;
							stopAnimation();
							var current = $item.eq($this.data( 'options' ).current);
							var current_text = current.find('.' + attrClass + '-text');
							var current_image = current.find('.' + attrClass + '-image');
							var next = $item.eq(ind);
							var next_text = next.find('.' + attrClass + '-text');
							var next_image = next.find('.' + attrClass + '-image');
							var current_image_backup = current_image.html();
							var next_image_backup = next_image.html();
							
							current_image.html('<img src="' + current.data('options').image + '" />');
							next_image.html('<img src="' + next.data('options').image + '" />');
							current.removeAttr('style');
							current.css({
								'z-index' : 200,
								'top' : 0
							}).show();
							next.removeAttr('style');
							next.css({
								'z-index' : 100,
								'top' : next.outerHeight()
							}).show();
							animateText(settings.textanimation,current_text,'setCurrent');
							animateText(settings.textanimation,next_text,'setNext');
							if (current_text.length) {
								if (settings.onBeforeTextAnimation) settings.onBeforeTextAnimation();
								animateText (settings.textanimation,current_text,'hide',function(){
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current.animate({
										'top' : -current.outerHeight()
									},settings.speed,function () {
										current.hide();
									});
									next.animate({
										'top' : 0
									},settings.speed,function () {
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
								})
							} else {
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current.animate({
										'top' : -current.outerHeight()
									},settings.speed,function () {
										current.hide();
									});
									next.animate({
										'top' : 0
									},settings.speed,function () {
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
							}
						}
					},
					slideBottom : function (ind) {
						if (ind != $this.data( 'options' ).current) {
							now_animated = true;
							stopAnimation();
							var current = $item.eq($this.data( 'options' ).current);
							var current_text = current.find('.' + attrClass + '-text');
							var current_image = current.find('.' + attrClass + '-image');
							var next = $item.eq(ind);
							var next_text = next.find('.' + attrClass + '-text');
							var next_image = next.find('.' + attrClass + '-image');
							var current_image_backup = current_image.html();
							var next_image_backup = next_image.html();
							
							current_image.html('<img src="' + current.data('options').image + '" />');
							next_image.html('<img src="' + next.data('options').image + '" />');
							current.removeAttr('style');
							current.css({
								'z-index' : 200,
								'top' : 0,
								'bottom' : 'auto'
							}).show();
							next.removeAttr('style');
							next.css({
								'z-index' : 100,
								'top' : -next.outerHeight(),
								'bottom' : 'auto'
							}).show();
							animateText(settings.textanimation,current_text,'setCurrent');
							animateText(settings.textanimation,next_text,'setNext');
							if (current_text.length) {
								if (settings.onBeforeTextAnimation) settings.onBeforeTextAnimation();
								animateText (settings.textanimation,current_text,'hide',function(){
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current.animate({
										'top' : current.outerHeight()
									},settings.speed,function () {
										current.hide();
									});
									next.animate({
										'top' : 0
									},settings.speed,function () {
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
								})
							} else {
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current.animate({
										'top' : current.outerHeight()
									},settings.speed,function () {
										current.hide();
									});
									next.animate({
										'top' : 0
									},settings.speed,function () {
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									});
							}
						}
					},
					sliceUp : function(ind){
						if (ind != $this.data( 'options' ).current) {
							now_animated = true;
							stopAnimation();
							var current = $item.eq($this.data( 'options' ).current);
							var current_text = current.find('.' + attrClass + '-text');
							var current_image = current.find('.' + attrClass + '-image');
							var next = $item.eq(ind);
							var next_text = next.find('.' + attrClass + '-text');
							var next_image = next.find('.' + attrClass + '-image');
							
							var current_image_backup = current_image.html();
							var next_image_backup = next_image.html();
							
							current_image.html(function(){
								var html = '';
								var count = Math.floor(settings.slicecount / 2);
								var sizes = [Math.ceil(current.width()/settings.slicecount),Math.ceil(current.height())];
								for(var i = 0; i < settings.slicecount; i++) {
									html += '<div class="' + (i%2?attrClass + '-totop':attrClass + '-tobot') + '" style="width:' + sizes[0] +'px; height:' + sizes[1] + 'px; background:url(' + current.data('options').image + ') ' + (-sizes[0]*i) + 'px 0 no-repeat; position:absolute; top:0; left:' + (sizes[0]*i) + 'px;"></div>';
								}
								return html;
							});
							next_image.html(function(){
								var html = '';
								var count = Math.floor(settings.slicecount / 2);
								var sizes = [Math.ceil(next.width()/settings.slicecount),Math.ceil(next.height())];
								for(var i = 0; i < settings.slicecount; i++) {
									html += '<div class="' + (i%2?attrClass + '-totop':attrClass + '-tobot') + '" style="width:' + sizes[0] +'px; height:' + sizes[1] + 'px; background:url(' + next.data('options').image + ') ' + (-sizes[0]*i) + 'px 0 no-repeat; position:absolute; top:0; left:' + (sizes[0]*i) + 'px;"></div>';
								}
								return html;
							});
							current.removeAttr('style');
							current.css({
								'z-index' : 200
							}).show();
							next.removeAttr('style');
							next.show().css({
								'z-index' : 100
							});
							next_image.find('.' + attrClass + '-totop').css({
								top : next.height()
							});
							next_image.find('.' + attrClass + '-tobot').css({
								top : -next.height()
							});
							animateText(settings.textanimation,current_text,'setCurrent');
							animateText(settings.textanimation,next_text,'setNext');
							if (current_text.length) {
								if (settings.onBeforeTextAnimation) settings.onBeforeTextAnimation();
								animateText (settings.textanimation,current_text,'hide',function(){
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current_image.find('>.slider-tobot').animate({
										'top' : current.height()
									},settings.speed);
									current_image.find('>.slider-totop').animate({
										'top' : -current.height()
									},settings.speed);
									next_image.find('>*').animate({
										'top' : 0
									},settings.speed,function(){
										next_image.html('<img src="' + next.data('options').image + '" />');
									});
									window.setTimeout(function(){
										current.hide();
										current_image.html('<img src="' + current.data('options').image + '" />');
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									},settings.speed);
								})
							} else {
									if (settings.onBeforeImageAnimation) settings.onBeforeImageAnimation();
									current_image.find('>.slider-tobot').animate({
										'top' : current.height()
									},settings.speed);
									current_image.find('>.slider-totop').animate({
										'top' : -current.height()
									},settings.speed);
									next_image.find('>*').animate({
										'top' : 0
									},settings.speed,function(){
										next_image.html('<img src="' + next.data('options').image + '" />');
									});
									window.setTimeout(function(){
										current.hide();
										current_image.html('<img src="' + current.data('options').image + '" />');
										if (settings.onAfterImageAnimation) settings.onAfterImageAnimation();
										if (next_text.length) {
											animateText (settings.textanimation,next_text,'show',function(){
												if (settings.onAfterTextAnimation) settings.onAfterTextAnimation();
												$this.data( 'options', {
													current : ind,
													nextAnimation : $this.data( 'options' ).nextAnimation
													
												});
												current_image.html(current_image_backup);
												next_image.html(next_image_backup);
												continueAnimation();
												if (settings.onChangeSlide) settings.onChangeSlide();
											});
										} else {
											$this.data( 'options', {
												current : ind,
												nextAnimation : $this.data( 'options' ).nextAnimation
												
											});
											current_image.html(current_image_backup);
											next_image.html(next_image_backup);
											continueAnimation();
											if (settings.onChangeSlide) settings.onChangeSlide();
										}
									},settings.speed);
							}
						}
					}
				};
			var 
				textAnimationTypes = {
					fade : function(ob,key,f){
						if (key == 'show'){
							ob.fadeIn(settings.textspeed,function(){
								if(f) f();
							})
						} else if (key == 'hide') {
							ob.fadeOut(settings.textspeed,function(){
								if(f) f();
							})
						} else if (key == 'setCurrent') {
							ob.removeAttr('style');
						} else if (key == 'setNext') {
							ob.hide();
						}
					},
					slide : function (ob,key,f) {
						switch (settings.textposition) {
							case "bottom" : {
								if (key == 'show'){
									ob.animate({ 'bottom' : 0 },settings.textspeed,function(){
										if(f) f();
									})
								} else if (key == 'hide') {
									ob.animate({ 'bottom' : -ob.outerHeight() },settings.textspeed,function(){
										if(f) f();
									})
								} else if (key == 'setCurrent') {
									ob.removeAttr('style');
								} else if (key == 'setNext') {
									ob.css({ 'bottom' : -ob.outerHeight() });
								}
								break;
							};
							case "top" : {
								if (key == 'show'){
									ob.animate({ 'top' : 0 },settings.textspeed,function(){
										if(f) f();
									})
								} else if (key == 'hide') {
									ob.animate({ 'top' : -ob.outerHeight() },settings.textspeed,function(){
										if(f) f();
									})
								} else if (key == 'setCurrent') {
									ob.removeAttr('style');
								} else if (key == 'setNext') {
									ob.css({ 'top' : -ob.outerHeight() });
								}
								break;
							}
							case "left" : {
								if (key == 'show'){
									ob.animate({ 'left' : 0 },settings.textspeed,function(){
										if(f) f();
									})
								} else if (key == 'hide') {
									ob.animate({ 'left' : -ob.outerWidth() },settings.textspeed,function(){
										if(f) f();
									})
								} else if (key == 'setCurrent') {
									ob.removeAttr('style');
								} else if (key == 'setNext') {
									ob.css({ 'left' : -ob.outerWidth() });
								}
								break;
							}
							case "right" : {
								if (key == 'show'){
									ob.animate({ 'right' : 0 },settings.textspeed,function(){
										if(f) f();
									})
								} else if (key == 'hide') {
									ob.animate({ 'right' : -ob.outerWidth() },settings.textspeed,function(){
										if(f) f();
									})
								} else if (key == 'setCurrent') {
									ob.removeAttr('style');
								} else if (key == 'setNext') {
									ob.css({ 'right' : -ob.outerWidth() });
								}
								break;
							}
						}
					}
				};
			var animationTypes_reverse = {
				fade : animationTypes.fade,
				slideLeft : animationTypes.slideRight,
				slideRight : animationTypes.slideLeft,
				slideTop : animationTypes.slideBottom,
				slideBottom : animationTypes.slideTop,
				sliceUp : animationTypes.sliceUp
			}
			
			function animateImage (animationType,ind,direct) {
				
				if (!now_animated) {
					if (ind == undefined)var ind = $this.data('options').current + 1;
					if (ind >= $item.length) ind = 0;
					if (direct == 'reverse') animationTypes_reverse[animationType](ind)
					else animationTypes[animationType](ind);
				}
			}
			function animateText(animationType, ob, key, f) {
				textAnimationTypes[animationType](ob,key,f);
			}
			function startSlider () {
				$player.addClass('player-on');
				startAnimation ();
			}
			function stopSlider () {
				$player.removeClass('player-on');
				stopAnimation ();
			}
			function startAnimation () {
				$bullets.find('>*').not('.' + attrClass + '-player').removeClass('active');
				$bullets.find('>*').not('.' + attrClass + '-player').eq($this.data('options').current).addClass('active');
				inter = setInterval(repeatAnimation,settings.interval);
			}
			function continueAnimation () {
				$bullets.find('>*').not('.' + attrClass + '-player').removeClass('active');
				$bullets.find('>*').not('.' + attrClass + '-player').eq($this.data('options').current).addClass('active');
				now_animated = false;
				if ($player.is('.player-on') || !$player.length) startAnimation ();
			}
			function stopAnimation () {
				clearInterval(inter);
			}
			function repeatAnimation() {
				animateImage(getNextAnimation());
			}
			function nexImage () {
				animateImage(getNextAnimation());
			};
			function prevImage(){
				var ind = $this.data('options').current-1;
				if (ind < 0) ind = $item.length-1;
				animateImage(getNextAnimation(),ind,'reverse');
			}
			function getNextImage() {
					return ($this.data('options') + 1 >= $item.length?0:$this.data('options') + 1);
				
			};
			function getNextAnimation() {
				if (rand) {
					return animations[Math.floor((Math.random()) * animations.length)]
				}
				else {
					var cur_anim = $this.data('options').nextAnimation;
					var nx_anim = cur_anim + 1;
					
					if (nx_anim >= animations.length) nx_anim = 0;
					
					$this.data('options',{
						current : $this.data('options').current,
						nextAnimation : nx_anim
					});
					return animations[cur_anim];
				}
			}
			if (settings.autoplay) startSlider();
			
			$next.click(nexImage);
			$prev.click(prevImage);
			$player.click(function(){
				if ($(this).is('.player-on')) {
					stopSlider();
				} else {
					startSlider();
				}
			})
			$bullets.find('>*').not('.' + attrClass + '-player').click(function(){
				animateImage(getNextAnimation(),$bullets.find('>*').not('.' + attrClass + '-player').index(this));
				return false;
			});
	});
  }
  
})( jQuery );