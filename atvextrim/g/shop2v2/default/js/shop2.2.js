'use strict';

(function($) {

  var $document = $(document);

  $.expr[':'].style = function(obj, index, meta) {
    var $obj = $(obj),
      params = meta[3].split(','),
      property,
      value;

    params = $.map(params, function(n) {
      return $.trim(n);
    });

    property = params[0];
    value = params[1];

    if ($obj.css(property) == value) {
      return true;
    }
  };

  $.s3throttle = function(name, func, time) {
    var id = $.s3throttle.timeouts[name];
    if (id) {
      clearTimeout(id);
    }

    $.s3throttle.timeouts[name] = setTimeout(func, time);
  };

  $.s3escape = function(text) {
    return $('<div>').text(text).html();
  };

  $.s3throttle.timeouts = {};

  $.fn.s3center = function() {

    return this.each(function() {
      var $this = $(this),
        isVisible = $this.is(':visible');

      if (!isVisible) {
        $this.show();
      }

      $this.css({
        marginLeft: -$this.outerWidth() / 2,
        marginTop: -$this.outerHeight() / 2
      });

      if (!isVisible) {
        $this.hide();
      }
    });
  };


  $.fn.s3deserializeArray = function(arr) {
    return this.each(function() {
      var $this = $(this);
      $.each(arr, function() {
        var $el = $this.find('[name="' + this.name + '"]');
        if (!$el.length) {
          return;
        }
        if ($el.is('input[type=radio]')) {
          $el.filter('[value="' + this.value + '"]').trigger('click');
        } else {
          $el.val(this.value).trigger('change');
        }
      });
    });
  };

  $.fn.caret = function(begin, end) {
    var range;

    if (this.length === 0 || this.is(':hidden')) {
      return;
    }

    if ($.type(begin) === 'number') {
      end = ($.type(end) === 'number') ? end : begin;
      return this.each(function() {
        if (this.setSelectionRange) {
          this.setSelectionRange(begin, end);
        } else if (this.createTextRange) {
          range = this.createTextRange();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();
        }
      });
    } else {
      if (this[0].setSelectionRange) {
        begin = this[0].selectionStart;
        end = this[0].selectionEnd;
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
      }
      return {
        begin: begin,
        end: end
      };
    }
  };

  $.keys = {};

  $.KEYS = {
    Digit: [48, 57],
    Backspace: 8,
    Comma: 44,
    Point: 46
  };

  $.each($.KEYS, function(key, value) {
    $.keys['is' + key] = function(code) {
      if ($.isArray(value)) {
        return (value[0] <= code && code <= value[1]);
      } else {
        return value === code;
      }
    };
  });

  $.fn.getVal = function() {
    var values = [];

    this.each(function() {
      var v = $(this).val();
      v = parseFloat(v);
      if (!v) {
        v = 0;
      }
      values.push(v);
    });
    return values;
  };

  $.fn.keyFilter = function(selector, settings) {
    settings = $.extend({
      type: 'int',
      def: '',
      callback: $.noop
    }, settings);

    return this.each(function() {
      var $this = $(this);

      $this.on('keypress', selector, function(e) {
        var caret, isBackspace, isDigit, isPoint, val, input = $(this);

        if (e.shiftKey || e.ctrlKey) {
          return false;
        }

        if (e.which === 0) {
          return true;
        }

        isDigit = $.keys.isDigit(e.which);
        isPoint = $.keys.isPoint(e.which) || $.keys.isComma(e.which);
        isBackspace = $.keys.isBackspace(e.which);

        if (!isDigit && !isPoint && !isBackspace) {
          return false;
        }

        if (settings.type === 'int' && isPoint) {
          return false;
        }

        val = input.val().replace(/,/g, '.');
        caret = input.caret();
        input.val(val);
        input.caret(caret.begin, caret.end);

        if (isPoint && val.indexOf('.') !== -1) {
          return false;
        }
      });

      $this.on('keyup', selector, function() {
        var input = $(this);
        settings.callback(input);
      });

      $this.on('blur', selector, function() {
        var input = $(this);
        if (input.val() === '') {
          input.val(settings.def);
          settings.callback(input);
        }
      });
    });
  };

  $.fn.getHeights = function() {
    var values = [],
      max = 0;

    this.each(function() {
      var $this = $(this),
        height;

      $this.css('min-height', 0);

      height = $this.height();
      values.push(height);

      if (height > max) {
        max = height;
      }
    });

    return {
      values: values,
      max: max
    };
  };

  $.fn.eachRow = function(processing, deleteMarginRight) {
    var elements = this,
      wrap = elements.parent(),
      wrapWidth, elementWidth, inRow, left, right, i = 0,
      len;

    if (wrap.get(0) && elements.get(0)) {
      wrapWidth = wrap.width();
      elementWidth = elements.outerWidth(true);
      if (deleteMarginRight) {
        wrapWidth += parseFloat(elements.css('margin-right'));
      }
      inRow = Math.floor(wrapWidth / elementWidth);
      if (inRow > 1) {
        for (len = elements.length; i < len; i += inRow) {
          left = i;
          right = i + inRow;
          if (right > len) {
            right = len;
          }
          processing(elements.slice(left, right), elements.eq(left), elements.eq(right - 1));
        }
      }
    }
    return elements;
  };

  $.on = function(selector, obj) {

    $.each(obj, function(key, value) {

      $document.on(key, selector, value);

    });

  };

  $.fn.s3tooltip = function(settings) {

    settings = $.extend({
      data: function() {
        return this.alt || '';
      },

      cls: 'tooltip-1',
      slide: true,
      dir: 'bottom'

    }, settings);

    var tooltip = $('#shop2-tooltip');

    if (!tooltip.get(0)) {
      tooltip = $('<div id="shop2-tooltip"></div>');
      $('body').append(tooltip);
    }

    var selector = this.selector;

    var win = {
        $el: $(window)
      },
      width,
      height;

    $.on(selector, {

      mouseenter: function(e) {
        var html = settings.data.call(this);

        if (!html) {
          return;
        }

        win.width = win.$el.width();
        win.height = win.$el.height();

        tooltip.html(html);
        tooltip.addClass(settings.cls);
        tooltip.show();

        width = tooltip.outerWidth(true);
        height = tooltip.outerHeight(true);
      },

      mouseleave: function(e) {
        tooltip.hide();
        tooltip.removeClass(settings.cls);
      },

      mousemove: function(e) {

        var left = e.pageX,
          top = e.pageY,
          scrollTop = $document.scrollTop();

        if (left + width > win.width) {
          left -= width;
        }

        if (settings.dir == 'top') {
          top -= height;

          if (top < scrollTop) {

            if (settings.slide) {

              top = scrollTop;

            } else {

              top += height;
            }

          }

        } else {

          if (top + height > win.height + scrollTop) {

            if (settings.slide) {

              top = win.height + scrollTop - height;

            } else {

              top -= height;

            }

          }

        }

        tooltip.css({
          left: left,
          top: top
        });

      }
    });

  };

})(jQuery);


(function($, self) {

  var shop2 = {
    queue: {},
    callbacks: {},
    init: function(settings) {

      $.extend(this, settings);

      this.my = this.my || {};

      $(function() {
        var queue = shop2.queue;
        $.each(queue, function(method) {
          var f = queue[method];
          if ($.isFunction(f)) {
            f();
          }
        });
      });

    }
  };

  if (document.location.search.indexOf('debug') != -1) {
    shop2.debug = true;
  }

  try {

    if (window.sessionStorage) {
      var current = sessionStorage.getItem('shop2_current_url');
      var url = location.pathname + location.search;
      if (current != url) {
        sessionStorage.setItem('shop2_back_url', current);
      }
      sessionStorage.setItem('shop2_current_url', url);
    }

    shop2.back = function() {
      var url;
      if (window.sessionStorage) {
        url = sessionStorage.getItem('shop2_back_url');
        if (url === 'null') {
          url = '/';
        }
      } else {
        url = document.referrer;
      }
      document.location = url || '/';
      return false;
    };

  } catch (e) {
    shop2.back = function() {
      document.location = document.referrer;
    }
  }

  shop2.on = function(type, func) {
    var _this = this;

    $.each(type.split(','), function(index, type) {
      type = $.trim(type);

      if (!_this.callbacks[type]) {
        _this.callbacks[type] = $.Callbacks();
      }

      _this.callbacks[type].add(func);
    });
  };

  shop2.off = function(type, func) {
    if (this.callbacks[type]) {
      func ? this.callbacks[type].remove(func) : this.callbacks[type].empty();
    }
  };

  shop2.trigger = function(type) {
    if (this.callbacks[type]) {
      this.callbacks[type].fireWith(self, [].slice.call(arguments, 1));
    }
  };

  shop2.fire = function(type, func) {
    if ($.isFunction(func)) {
      var has = !!(this.callbacks && this.callbacks[type] && this.callbacks[type].has(func));

      if (!has) {
        func.apply(self, [].slice.call(arguments, 2));
      }
    }
  };

  shop2.filter = {
    _pre_params: '',
    init: function() {
      var search = decodeURIComponent(document.location.search);
      if (search) {
        search = search.slice(1);
      }
      this.str = search;
    },
    escape: function(name) {
      return name.replace(/(\[|\])/g, '\\$1');
    },
    remove: function(name, value) {
      var str = name + '=';
      if (typeof value !== 'undefined') {
        str += value;
      }
      var re = new RegExp('(.*)(' + this.escape(str) + '[^&]*&*)(.*)', 'ig');
      this.str = this.str.replace(re, '$1$3').replace(/&$/, '');
      return this;
    },
    add: function(name, value) {
      this.remove(name, value);
      this.str += (this.str !== '') ? '&' : '';
      this.str += name + '=' + value;
      return this;
    },
    has: function(name, value) {
      var str = name + '=';
      if (typeof value !== 'undefined') {
        str += value;
      }
      if (this.str.indexOf(str) > -1) {
        return true;
      }
      return false;
    },
    get: function(name) {
      var re = new RegExp(this.escape(name) + '=([^&]*)'),
        matches = this.str.match(re);
      if (matches && matches.length == 2) {
        return matches[1];
      }
      return false;
    },
    toggle: function(name, value) {

      if (name == 's[amount][min]') {
        if (this.get('s[amount][max]') === '0') {
          this.remove('s[amount][max]');
          this.add('s[amount][min]', 0);
          return this;
        } else if (this.get('s[amount][min]') === '0') {
          this.remove('s[amount][min]');
          this.add('s[amount][max]', 0);
          return this;
        }
      } else if (name == 's[amount][max]') {
        if (this.get('s[amount][min]') === '1') {
          this.remove('s[amount][min]');
          this.add('s[amount][min]', 0);
          return this;
        } else if (this.get('s[amount][min]') === '0') {
          this.remove('s[amount][min]');
          this.add('s[amount][min]', 1);
          return this;
        }
      }

      if (this.has(name, value)) {
        this.remove(name, value);
      } else {
        this.add(name, value);
      }
      return this;
    },
    sort: function(name) {
      var re = new RegExp(this.escape('s[sort_by]') + '=([^&]*)'),
        params = this.str.match(re),
        desc = name + ' desc',
        asc = name + ' asc';

      params = (params && params.length > 1) ? params[1] : '';

      if (params.indexOf(desc) !== -1) {
        params = params.replace(desc, asc);
      } else if (params.indexOf(asc) !== -1) {
        params = params.replace(asc, desc);
      } else if (params !== '') {
        params += ',' + desc;
      } else {
        params = desc;
      }

      this.remove('s[sort_by]');
      this.add('s[sort_by]', params);
      return this;
    },
    go: function() {
      var str = '';
      if (this.str) {
        str += (this.str.charAt(0) == '?') ? '' : '?';
        str += this.str;
      }

      document.location =
        document.location.pathname.replace(/\/p\/\d*/g, '') +
        str +
        document.location.hash;
      return false;
    },
    count: function(func) {
      var url = '/my/s3/api/shop2/?cmd=getSearchMatches&hash=' +
        shop2.apiHash.getSearchMatches +
        '&ver_id=' + shop2.verId +
        '&' + this.str +
        this._pre_params;

      shop2.trigger('beforeGetSearchMatches');

      $.get(
        url,
        function(d, status) {
          if (status == 'success') {
            if ($.type(d) === 'string') {
              d = $.parseJSON(d);
            }
          }

          if (shop2.facets.enabled) {
            shop2.facets.aggregation(d);
          }

          shop2.fire('afterGetSearchMatches', func, d, status);
          shop2.trigger('afterGetSearchMatches', d, status);
        }
      );

    }
  };

  shop2.search = {
    getParams: function(folder_id, func) {
      var url;

      shop2.trigger('beforeGetFolderCustomFields');

      if (folder_id > 0) {
        url = '/my/s3/api/shop2/?cmd=getFolderCustomFields' +
          '&hash=' + shop2.apiHash.getFolderCustomFields +
          '&ver_id=' + shop2.verId +
          '&folder_id=' + folder_id +
          '&' + decodeURIComponent(document.location.search).replace(/[^&]*=(&|$)/g, '');

        $.getJSON(url, function(d, status) {
          shop2.fire('afterGetFolderCustomFields', func, d, status);
          shop2.trigger('afterGetFolderCustomFields', d, status);
        });
      }
    }
  };

  shop2.facets = {
    enabled: false,
    aggs: null,
    _data: {},
    emptyClass: 'empty-val',

    mask: '[data-name^="s[field]"][data-value="key"],' +
      '[name="s[parentField][parentKey]"] [value="key"],' +
      '[name="s[field]"] [value="key"],' +
      '[data-name="s[field][index]"],' +
      '[data-name="s[field][key]"],' +
      '[name="s[field][key]"]',

    filter: {
      wrapper: '.shop2-filter, #shop2-color-ext-list',
      items: '[data-name], [name], [name] [value]'
    },

    search: {
      wrapper: '.shop2-block.search-form form, #shop2-color-ext-select',
      items: '[data-name], [name], [name] [value]'
    },

    ignoreClear: function($item) {
      this._data.attrName = $item.attr('name') ? $item.attr('name') : $item.parent().attr('name');
      this._data.isSelect = $item.prop('tagName').toLowerCase() === 'select';
      this._data.val = $item.prop('tagName').toLowerCase() === 'option' && $item.val() === '';
      return /s\[(folder_id|products_per_page)\]/i.test(this._data.attrName) || this._data.isSelect || this._data.val;
    },

    set: function(mod /* module filter, search */ ) {
      var module = shop2.facets[mod];

      if (!module) {
        return;
      }

      var $wrapper = $(module.wrapper);
      var $items = $wrapper.find(module.items);

      this._data.$wrapper = $wrapper;

      this.clearItems($items);
      this.insertData(this.aggs);

      var eventName = 'afterFacets' + mod.charAt(0).toUpperCase() + mod.slice(1);

      shop2.trigger(eventName, this.aggs);
    },

    searchSetup: function() {
      if (!this.search) {
        return;
      }

      var $form = $(this.search.wrapper);

      if (!$form.length) {
        return;
      }

      var $items = $form.find(this.search.items);
      var self = this;
      var url = '/my/s3/api/shop2/?cmd=getSearchMatches&hash=' +
        shop2.apiHash.getSearchMatches +
        '&ver_id=' + shop2.verId + '&',
        fullUrl = url + $form.serialize();

      this.getDataSearch(fullUrl);

      $(document).on('change', $items, function(e) {
        if (e.target.name == "s[products_per_page]") {
          return;
        }

        fullUrl = url + $form.serialize()

        self.getDataSearch(fullUrl);
      });
    },

    getDataSearch: function(url) {
      $.get(
        url,
        function(d, status) {
          if (status == 'success') {
            if ($.type(d) === 'string') {
              d = $.parseJSON(d);
            }

            shop2.facets.aggregation(d);
            shop2.facets.set('search');
          }
        }
      );
    },

    clearItems: function($items) {
      var emptyClass = this.emptyClass;
      var self = this;
      var $item, nodeName;

      $items.each(function(index, item) {
        $item = $(item);

        if (self.ignoreClear($item)) {
          return true;
        }

        nodeName = $item.prop('tagName').toLowerCase();

        switch (nodeName) {
          case 'select':
            break;
          case 'input':
            $item.attr('placeholder', '');
            break;
          case 'option':
            if ($item.attr('value')) {
              $item.attr('disabled', 'disabled');
            }
            break;
        }

        $item.attr('data-param-val', '0');
        $item.addClass(emptyClass);
      });
    },

    aggregation: function(d) {
      if (typeof d === 'object' && d.data.aggs) {
        this.aggs = this.dataSetup(d.data.aggs);
      }

      return this.aggs;
    },

    dataSetup: function(aggs) {
      var cf = aggs.cf;
      var key, field;

      for (key in cf) {
        field = cf[key];

        if ($.isArray(field) && !field.length) {
          delete cf[key];
        }
      }

      return aggs;
    },

    insertData: function(aggs, field, parentField) {
      $.each(aggs, $.proxy(function(key, value) {
        if (typeof value === "object") {
          this.insertData(value, key, field);
        } else {
          this._data.$item = this.getItem(field, key, parentField);

          if (!this._data.$item.length || !value) {
            return true;
          }

          switch (this._data.$item.prop('tagName').toLowerCase()) {
            case 'input':
              this._data.$item.attr('placeholder', value);
              break;
            case 'option':
              this._data.$item.removeAttr('disabled');
              break;
          }

          this._data.$item.attr('data-param-val', value);
          this._data.$item.removeClass(this.emptyClass);
        }
      }, this));
    },

    getItem: function(field, key, parentField) {
      if (parentField && parentField !== 'cf') {
        this._data.selector = this.mask.replace(/parentField/g, parentField).replace(/parentKey/g, field).replace(/key/g, key);
      } else {
        this._data.selector = this.mask.replace(/field/g, field).replace(/key/g, key);
      }

      return this._data.$wrapper.find(this._data.selector);
    },

    setMask: function(mask) {
      this.mask = mask;
    },

    setEmptyClass: function(emptyClassName) {
      this.emptyClass = emptyClassName;
    },

    setContainers: function(module, obj) {
      this[module] = obj;
    }
  };

  shop2.cart = {
    add: function(kind_id, a4, func) {

      shop2.trigger('beforeCartAddItem');

      $.post(
        '/my/s3/api/shop2/?cmd=cartAddItem', {
          hash: shop2.apiHash.cartAddItem,
          ver_id: shop2.verId,
          kind_id: kind_id,
          amount: a4
        },
        function(d, status) {
          shop2.fire('afterCartAddItem', func, d, status);
          shop2.trigger('afterCartAddItem', d, status);
        },
        'json'
      );
    },

    addMultiple: function(params, func) {

      shop2.trigger('beforeCartAddMultipleItems');

      params = $.extend({
        hash: shop2.apiHash.cartAddItem,
        ver_id: shop2.verId
      }, params);

      $.post('/my/s3/api/shop2/?cmd=cartAddItem', params, function(d, status) {

        shop2.fire('afterCartAddMultipleItems', func, d, status);
        shop2.trigger('afterCartAddMultipleItems', d, status);

      }, 'json');

    },

    remove: function(kind_id, func) {
      kind_id = kind_id.toString().replace(/\"/g, '\\"').replace(/\'/g, '"');
      kind_id = $.parseJSON(kind_id);

      shop2.trigger('beforeCartRemoveItem');

      $.getJSON(
        '/my/s3/api/shop2/?cmd=cartRemoveItem', {
          hash: shop2.apiHash.del,
          ver_id: shop2.verId,
          kind_id: kind_id
        },
        function(d, status) {
          shop2.fire('afterCartRemoveItem', func, d, status);
          shop2.trigger('afterCartRemoveItem', d, status);
        }
      );

      return false;
    },

    clear: function() {

      shop2.trigger('beforeCartClear');
      $.get(shop2.uri + '?mode=cart&action=cleanup', function(d, status) {
        shop2.trigger('afterCartClear', d, status);
      });

    },

    update: function(form, func) {
      var data = form.serialize();

      shop2.trigger('beforeCartUpdate');

      $.post(
        '/my/s3/api/shop2/?cmd=cartUpdate',
        'ver_id=' + shop2.verId +
        '&hash=' + shop2.apiHash.up +
        '&' + data,
        function(d, status) {
          shop2.fire('afterCartUpdate', func, d, status);
          shop2.trigger('afterCartUpdate', d, status);
        }
      );

      return false;
    },

    addCoupon: function(coupon, func) {

      shop2.trigger('beforeCartAddCoupon');

      $.getJSON(
        '/my/s3/api/shop2/?cmd=cartAddCoupon', {
          hash: shop2.apiHash.coupon_add,
          ver_id: shop2.verId,
          coupon: coupon
        },
        function(d, status) {
          shop2.fire('afterCartAddCoupon', func, d, status);
          shop2.trigger('afterCartAddCoupon', d, status);
        }
      );

      return false;
    },

    removeCoupon: function(coupon, func) {

      shop2.trigger('beforeCartRemoveCoupon');

      $.getJSON(
        '/my/s3/api/shop2/?cmd=cartRemoveCoupon', {
          hash: shop2.apiHash.coupon_del,
          ver_id: shop2.verId,
          coupon: coupon
        },
        function(d, status) {
          shop2.fire('afterCartRemoveCoupon', func, d, status);
          shop2.trigger('afterCartRemoveCoupon', d, status);
        }
      );
    }
  };

  shop2.delivery = {
    deligate: false,
    ymapsMap: null,
    ymapsData: [],
    ymapsIconsData: {
      'default': '/g/shop2v2/default/images/map-pin.svg',
      'spsr': '/g/shop2v2/default/images/map-pin-red.svg',
      'dellin': '/g/shop2v2/default/images/map-pin-purple.svg',
      'edostavka': '/g/shop2v2/default/images/map-pin-green.svg',
      'pickpoint': '/g/shop2v2/default/images/map-pin.svg',
      'boxberry': '/g/shop2v2/default/images/map-pin-boxberry.svg',
      'delica': '/g/shop2v2/default/images/map-pin.svg',
    },
    calc: function(attach_id, params, func) {

      shop2.trigger('beforeDeliveryCalc');

      $.getJSON(
        '/my/s3/api/shop2/?cmd=deliveryCalc', {
          hash: shop2.apiHash.calc,
          ver_id: shop2.verId,
          attach_id: attach_id,
          params: params
        },
        function(d, status) {
          shop2.fire('afterDeliveryCalc', func, d, status);
          shop2.trigger('afterDeliveryCalc', d, status);
        }
      );
    },
    YmapsInit: function(service_code) {
      var obj = Object.keys(shop2.delivery.ymapsData).length,
        localize_text_div = $('.baloon-content-localize'),
        localize_text = {
          'point': localize_text_div.data('point-text'),
          'term': localize_text_div.data('term-text'),
          'price': localize_text_div.data('price-text'),
          'address': localize_text_div.data('address-text'),
          'phone': localize_text_div.data('phone-text'),
          'worktime': localize_text_div.data('worktime-text'),
          'url': localize_text_div.data('url-text'),
          'more': localize_text_div.data('more-text'),
          'choose': localize_text_div.data('choose-text'),
        };
      if (!obj) {
        $('.shop2-delivery--item__tab.points').addClass('disabled');
        return false;
      }
      var dadataJson = $.parseJSON($('#dadata').val()),
        coordsCenter = [dadataJson.geo_lat, dadataJson.geo_lon],
        options = {
          id: service_code,
          center: coordsCenter,
          zoom: 11,
        };

      ymaps.ready(function() {
        shop2.delivery.ymapsMap = new ymaps.Map(options.id, {
          center: options.center,
          zoom: options.zoom,
          controls: ["zoomControl"]
        });
        var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
          '<div class="delivery-baloon-content">' +
          '<h3>$[properties.address]</h3>' +
          '<div class="buttons"><button type="button" class="shop2-btn" id="balloon-select">' + localize_text.choose + '</button>[if properties.site]<a target="_blank" class="shop2-btn" href="$[properties.site]">' + localize_text.more + '</a>[endif]</div>' +
          '<div class="note-block">[if properties.term] <p><span>' + localize_text.term + ':</span><strong class="term">$[properties.term]</strong></p>[endif] <p>$[properties.cost]</p> </div>' +
          '[if properties.phone]<div class="phone"><span>' + localize_text.phone + ':</span>$[properties.phone]</div>[endif]' +
          '[if properties.worktime]<div class="worktime"><span>' + localize_text.worktime + ':</span>$[properties.worktime]</div>[endif]' +
          '[if properties.desc]<div class="desc"><span>' + localize_text.url + ':</span>$[properties.desc]</div>[endif]' +
          '<form data-attach_id="$[properties.attach_id]"><input type="hidden" name="delivery_type" value="$[properties.delivery_type]"><input class="point-address" type="hidden" name="$[properties.attach_id][0]" value="$[properties.address]"><input type="hidden" name="$[properties.attach_id][deligate][tarif]" class="tariff" value="$[properties.tariff_hash]"><input type="hidden" name="$[properties.attach_id][deligate][terminal]" value="$[properties.id]"></form>' +
          '</div>', {
            build: function() {
              MyBalloonContentLayoutClass.superclass.build.call(this);
              $('#balloon-select').bind('click', this.onCounterClick);
            },
            clear: function() {
              $('#balloon-select').unbind('click', this.onCounterClick);
              MyBalloonContentLayoutClass.superclass.clear.call(this);
            },
            onCounterClick: function(e) {
              e.preventDefault();
              var balloonContent = $(this).parents('.delivery-baloon-content:first'),
                form = balloonContent.find('form'),
                pointName = balloonContent.find('h3').text(),
                pointCostInp = balloonContent.find('label.cost input:checked'),
                pointCost = pointCostInp.parent().data('cost'),
                pointTerm = balloonContent.find('.term').text(),
                attach_id = form.data("attach_id"),
                deliveryBlock = $('#shop2-order-delivery'),
                options = deliveryBlock.find('.option-label'),
                groups = deliveryBlock.find('.option-type'),
                details = deliveryBlock.find('.option-details'),
                pointTab = deliveryBlock.find('.shop2-delivery--item__tab.points'),
                pointFields = $(shop2.delivery.ymapsMap.container._parentElement).next(),
                pointAddress = form.find('input.point-address').val(),
                option = $(shop2.delivery.ymapsMap.container._parentElement).parents('.option-details:first');

              $("#delivery_id_deligate").val(attach_id);
              form.find('input.tariff').val(pointCostInp.val());
              pointFields.find('.fields').html(form.html());
              pointFields.find('.point-name').html(pointName);
              pointFields.find('.point-cost').html(pointCost);
              pointFields.find('.point-term').html(pointTerm);
              pointFields.find('.point-address').html(pointAddress);
              option.addClass('selected');
              $('html, body').scrollTop(option.parent().offset().top - 60);
              //pointFields.show();
              shop2.delivery.ymapsMap.balloon.close();
            }
          }
        );

        var myCollection = new ymaps.GeoObjectCollection();

        $.each(shop2.delivery.ymapsData[service_code], function(key, item) {
          var iconPic = shop2.delivery.ymapsIconsData[service_code] || shop2.delivery.ymapsIconsData['default'];
          if (item.service_code == service_code) {
            myCollection.add(new ymaps.Placemark(
              item.coords,
              item, {
                balloonContentLayout: MyBalloonContentLayoutClass,
                iconLayout: 'default#image',
                iconImageHref: iconPic,
                iconImageSize: [26, 36], // размеры картинки
                iconImageOffset: [-13, -36], // смещение картинки
                balloonMaxWidth: 530,
                balloonPanelMaxMapArea: 'Infinity',
                balloonMinHeight: 330,
                balloonshadow: false,

              }
            ));
          }
        });

        shop2.delivery.ymapsMap.geoObjects.add(myCollection);
        shop2.delivery.ymapsMap.container.fitToViewport();
        shop2.delivery.ymapsMap.behaviors.disable('multiTouch');
      });
    },
    changeDeliveryPoint: function(obj, service_code) {
      var $this = $(obj),
        option = $this.parents('.option-details:first');

      if (shop2.delivery.ymapsMap) {
        shop2.delivery.ymapsMap.destroy();
        shop2.delivery.ymapsMap = null;
      }

      option.find('.map-select select option:first').prop('selected', true);
      option.find('.map-select select').trigger('refresh');
      option.find('.deligate_points_fields .fields').empty();
      option.removeClass('selected');
      $('html, body').scrollTop(option.parent().offset().top - 60);
      shop2.delivery.YmapsInit(service_code);
      return false;
    },
    selectSuggestion: function(value, enter) {
      var name = value;
      $.ajax({
        url: '/my/s3/xapi/public/?method=deligate/suggestAddress',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          query: name,
          count: 1
        }),
        success: function(suggestion) {
          if (suggestion.result.suggestions) {
            suggestion.result.suggestions[0].data.source = name;
          }
          if (enter) {
            $('#shop2-deligate-calc').trigger('click');
          } else {
            $("#dadata").val(JSON.stringify(suggestion.result.suggestions[0].data));
            $("#address").val(name);
            $('#shop2-deligate-calc').trigger('click');
          }
        }
      });
    }
  };

  shop2.compare = {
    add: function(kind_id, callback) {
      this.action('add', kind_id, callback);
    },
    remove: function(kind_id, callback) {
      this.action('del', kind_id, callback);
    },
    clear: function(callback) {
      this.action('clear', null, callback);
    },
    action: function(action, kind_id, func) {

      var eventName = $.camelCase('Compare-' + action);

      shop2.trigger('before' + eventName);

      $.post(
        '/my/s3/api/shop2/?cmd=compare', {
          hash: shop2.apiHash.compare,
          ver_id: shop2.verId,
          kind_id: kind_id,
          action: action
        },
        function(d, status) {
          shop2.fire('after' + eventName, func, d, status);
          shop2.trigger('after' + eventName, d, status);
        }
      );
    }
  };

  shop2.product = {
    getProductListItem: function(product_id, kind_id, func) {
      var url = '/my/s3/api/shop2/?cmd=getProductListItem&hash=' + shop2.apiHash.getProductListItem + '&ver_id=' + shop2.verId;

      shop2.trigger('beforeGetProductListItem');

      $.post(
        url, {
          product_id: product_id,
          kind_id: kind_id
        },
        function(d, status) {
          shop2.fire('afterGetProductListItem', func, d, status);
          shop2.trigger('afterGetProductListItem', d, status);
        }
      );
    },

    checkMetaItemValue: function(meta, key, value) {

      var res = meta[key];

      if (res == "undefined" || res == null) {
        return false;
      }

      if (res == value) {
        return true;
      }

      if (res instanceof Object) {
        for (var i in res) {
          if (res[i] == value) {
            return true;
          }
        }
      }

      return false;

    },

    getMetaItemValue: function(meta, key) {
      var res = meta[key];

      if ($.type(res) === 'undefined') {
        return false;
      }

      if ($.type(res) === 'object') {

        if ($.type(res.v) !== 'undefined') {
          return res.v;
        }

        if ($.type(res.image_id) !== 'undefined') {
          return res.image_id;
        }

      }

      return res;
    },

    findKindId: function(product_id, kinds, paramName, paramValue, meta, keys) {
      var i;
      var len;
      var d;
      var kind;
      var matches;
      var lastMatches = 0;
      var refs = $.extend(true, {}, shop2.productRefs[product_id]);

      if (keys) {
        $.each(refs, function(key) {
          if (!keys[key]) {
            delete refs[key];
          }
        });
      }

      if (kinds.length == 1) {
        return kinds[0];
      }

      if ($.type(meta) !== 'object') {
        meta = $.parseJSON(meta);
      }

      for (i = 0, len = kinds.length; i < len; i += 1) {
        d = Number(kinds[i]);
        matches = 0;

        $.each(refs, function(p, ref) {

          $.each(ref, function(v) {

            if (p == paramName) {

              if (v == paramValue) {
                matches += 1;
              }

            } else {

              if (String(refs[p][v]).indexOf(d) === -1) {
                return;
              }

              matches += 1;

              if (meta && shop2.product.checkMetaItemValue(meta, p, v)) {
                matches += 1;
              }

            }

          });

        });

        if (matches > lastMatches) {
          kind = d;
          lastMatches = matches;
        }

      }

      return kind;
    },

    getNodeData: function(node, key, decode) {
      var data = false;

      if (node.tagName == 'SELECT') {
        data = $(node.options[node.selectedIndex]).data(key);
      } else if (node.nodeType == 1) {
        data = $(node).data(key);
      }

      if (decode) {
        data = this.decodeFieldData(data);
      }

      return data;
    },

    decodeFieldData: function(data) {

      if ($.type(data) !== 'string') {
        return [data];
      }

      data = data.split(',');

      return $.map(data, function(n) {
        return $.trim(n);
      });

    },

    hasKindId: function(data, kinds) {
      var i, len;
      if (data) {
        for (i = 0, len = kinds.length; i < len; i += 1) {
          if (data.indexOf(kinds[i]) !== -1) {
            return true;
          }
        }
      }
      return false;
    }
  };

  shop2.options = {
    amountDefaultValue: 1,
    amountDefaultInc: 1,
    amountType: 'int',
    msgTime: 3000,
    printCSS: '/g/shop2v2/default/css/print.less.css'
  };

  //* client-order-cancelling *//
  shop2.orderCancelling = {
    alert: function() {
      var linkButton = $('.order-cancelling'),
        attrToLinkOrder = linkButton.data('href'),
        attrLinkTitle = linkButton.data('cancellingTitle'),
        attrLinkButtonTitle = linkButton.data('cancellingButtonTitle'),
        attrLinkButtonClose = linkButton.data('cancellingClose'),

        html = '<div class="order-cancel-title">' + attrLinkTitle + '</div>' +
        '<div class="order-cancel-buttons">' +
        '<a class="shop2-btn" href="' + attrToLinkOrder + '">' + attrLinkButtonTitle + '</a>' +
        '<a class="shop2-alert-close" onclick="shop2.alert.hide(); return false;" href="#">' + attrLinkButtonClose + '</a>' +
        '</div>';

      shop2.alert(html, '', 'shop2-alert--warning order-cancel');
    }
  };
  $(document).on('click', '.order-cancelling', function(e) {
    e.preventDefault();
    shop2.orderCancelling.alert();
  });

  //* client-order-repeat *//
  shop2.orderRepeat = {
    alert: function($this) {
      var linkButton = $this.filter('.order-repeat'),
        attrToLinkOrder = linkButton.data('href'),
        attrLinkTitle = linkButton.data('repeatTitle'),
        attrLinkButtonTitle = linkButton.data('repeatButtonTitle'),
        attrLinkButtonClose = linkButton.data('repeatClose'),

        html = '<div class="order-repeat-title">' + attrLinkTitle + '?</div>' +
        '<div class="order-repeat-buttons">' +
        '<a class="shop2-btn" href="' + attrToLinkOrder + '">' + attrLinkButtonTitle + '</a>' +
        //'<a class="shop2-btn" href="#" onclick="location.href=\'' + attrToLinkOrder + '\'">'+ attrLinkButtonTitle +'</a>' +
        '<a class="shop2-alert-close" onclick="shop2.alert.hide(); return false;" href="#">' + attrLinkButtonClose + '</a>' +
        '</div>';
      shop2.alert(html, 'Закрыть', 'shop2-alert--warning order-cancel');
    }
  };
  $(document).on('click', '.order-repeat', function(e) {
    e.preventDefault();
    shop2.orderRepeat.alert($(this));
  });

  shop2.msg = function(text, obj) {
    var selector = '#shop2-msg',
      msg = $(selector),
      offset = obj.offset(),
      width = obj.outerWidth(true),
      height = obj.outerHeight(true);

    if (!msg.get(0)) {
      msg = $('<div id="shop2-msg">');
      $(document.body).append(msg);
      msg = $(selector);
    }

    msg.html(text).show();

    var msgWidth = msg.outerWidth();
    var left = offset.left + width;
    var top = offset.top + height;

    if (left + msgWidth > $(window).width()) {
      left = offset.left - msgWidth;
    }

    msg.css({
      left: left,
      top: top
    });

    $.s3throttle('msg', function() {
      msg.hide();
    }, shop2.options.msgTime);

  };

  shop2.queue = {

    cookiesDisabled: function() {
      if (navigator && navigator.cookieEnabled == false) {
        $('.shop2-cookies-disabled')
          .html('<p>Внимание! Для корректной работы у Вас в браузере должна быть включена поддержка cookie. В случае если по каким-либо техническим причинам передача и хранение cookie у Вас не поддерживается оформление заказа невозможно.</p>')
          .removeClass('hide');
      }
    },

    cartState: function() {

      try {
        window.sessionStorage;
      } catch (e) {
        return;
      }

      if (!window.chrome || !sessionStorage || !shop2.my.save_cart_state) {
        return;
      }

      if (!readCookie('s3s2_cart')) {
        sessionStorage.removeItem('cart-reload');
        sessionStorage.removeItem('cart-state');
      }

      function getHTML() {
        return $('<div>').append($('#shop2-cart-preview').clone()).html();
      }

      function setHTML(html) {
        if (html) {
          $('#shop2-cart-preview').replaceWith(html);
        }
      }

      if (sessionStorage.getItem('cart-reload') == 1) {
        sessionStorage.removeItem('cart-reload');
        sessionStorage.setItem('cart-state', getHTML());
      }

      shop2.on('afterCartAddItem', function(res, status) {
        var html = res.data;
        if (status != 'success') {
          html = '';
        }
        sessionStorage.setItem('cart-state', html);
      });

      shop2.on('afterCartRemoveItem, afterCartUpdate', function() {
        sessionStorage.setItem('cart-reload', 1);
      });

      $(window).on('pageshow', function() {
        setHTML(sessionStorage.getItem('cart-state'));
      });

    },

    keys: function() {

      $(document).keyFilter('input.shop2-input-int');

      $(document).keyFilter('input.shop2-input-float', {
        type: 'float'
      });

    },

    heights: function() {

      $('.product-list-thumbs').each(function() {
        var $this = $(this);

        $this.find('.product-item-thumb').eachRow(function(group) {
          var heights;
          var names = group.find('.product-name');
          var nHeights;

          names.css('min-height', 0);
          nHeights = names.getHeights();
          names.css('min-height', nHeights.max);

          var $sp = group.find('.product-amount');

          if ($sp.length) {
            $sp.css('margin-top', 0);
            heights = group.getHeights();
            group.each(function(i) {
              $(this).find('.product-amount').css('margin-top', heights.max - heights.values[i]);
            });
          } else {
            group.each(function() {
              var $this = $(this);
              var $sp = $this.find('.shop2-product-actions');
              if (!$sp.length) {
                $sp = $this.find('.product-bot');
              }
              var paddingTop = $sp.data('padding-top');
              if ($.type(paddingTop) === 'undefined') {
                paddingTop = parseInt($this.css('padding-top'));
                $sp.data('padding-top', paddingTop);
              }
              $sp.css('padding-top', paddingTop);
            });
            heights = group.getHeights();
            group.each(function(i) {
              var $this = $(this);
              var $sp = $this.find('.shop2-product-actions');
              if (!$sp.length) {
                $sp = $this.find('.product-bot');
              }
              var paddingTop = $sp.data('padding-top');
              $sp.css('padding-top', heights.max - heights.values[i] + paddingTop);
            });
          }
        });
      });

    },

    resize: function() {

      $(window).resize(function() {
        shop2.queue.heights();
      });

    },

    product: function() {

      shop2.product._reload = function(node) {

        var $node = $(node);
        var kinds = shop2.product.getNodeData(node, 'kinds', true);
        var paramName = shop2.product.getNodeData(node, 'name');
        var paramValue = shop2.product.getNodeData(node, 'value');
        var $form = $node.closest('form');
        var form = $form.get(0);
        var meta;
        var kind_id;
        var product_id;
        var keys = {};

        if (kinds && $.type(paramName) !== 'undefined' && $.type(paramValue) !== 'undefined' && form) {

          meta = $form.find('input[name=meta]').val();

          product_id = $form.find('input[name=product_id]').val();

          $form.find('[name=submit]').prop('disabled', true);

          $form.find('select.shop2-cf>option, li.shop2-cf, li.shop2-color-ext-selected, ul.shop2-color-ext-list>li').each(function() {
            var name = $(this).data('name');
            if (name) {
              keys[name] = true;
            }
          });

          kind_id = shop2.product.findKindId(product_id, kinds, paramName, paramValue, meta, keys);

          if (shop2.mode == 'product') {

            if (shop2.uri) {
              document.location = shop2.uri + '/product/' + kind_id;
            } else {
              document.location = document.location.href.replace(/\/product\/.+/, '/product/' + kind_id);
            }

          } else {

            shop2.product.getProductListItem(product_id, kind_id, function(d, status) {
              var cont, newCont, body;
              if (status === 'success') {
              
              	shop2.trigger('afterProductReloaded');

                cont = $node.closest('.shop2-product-item');
                cont.hide();

                body = $.trim(d.data.body);
                newCont = $(body).insertBefore(cont);

                cont.remove();

                shop2.queue.heights();
              }

            });

          }
        }

      };

      $.on('select.shop2-cf', {
        change: function() {
          shop2.product._reload(this);
        }
      });

      $.on('li.shop2-cf:not(.active-color, .active-texture)', {
        click: function() {
          shop2.product._reload(this);
        }
      });

      $.on('span.shop2-path-show-folders', {
        click: function(e) {
          e.preventDefault();
          $(this).next().show();
          $(this).hide();
        }
      });

    },

    addToCart: function() {


      $(document).on('click', '.shop2-product-btn', function(e) {

        var $this = $(this),
          $form = $this.closest('form'),
          form = $form.get(0),
          adds = $form.find('.additional-cart-params'),
          len = adds.length,
          i, el,
          a4 = form.amount.value,
          kind_id = form.kind_id.value;

        e.preventDefault();

        if (len) {
          a4 = {
            amount: a4
          };

          for (i = 0; i < len; i += 1) {
            el = adds[i];
            if (el.value) {
              a4[el.name] = el.value;
            }
          }
        }

        shop2.cart.add(kind_id, a4, function(d) {

          $('#shop2-cart-preview').replaceWith(d.data);

          if (d.errstr) {
            shop2.msg(d.errstr, $this);
          } else {
            var $text = window._s3Lang.JS_SHOP2_ADD_CART_WITH_LINK;
            // window._s3Lang.JS_ADDED - Добавлено
            shop2.msg($text.replace('%s', shop2.uri + '/cart'), $this);
          }

          if (d.panel) {
            $('#shop2-panel').replaceWith(d.panel);
          }
        });

      });

    },

    amount: function() {

      var $document = $(document);

      function validate(input) {
        var kind = input.data('kind'),
          max = input.data('max'),
          val = Number(input.val()),
          amount = 0,
          available;

        if (kind && max > 0) {
          $('input[data-kind=' + kind + ']').each(function() {
            amount += Number(this.value);
          });

          if (amount > max) {
            available = max - amount + val;
            input.val(available);
            shop2.msg(_s3Lang.JS_AVAILABLE_ONLY + ' ' + available, input);
          }
        }
      }

      $document.on('click', '.amount-minus', function() {
        var $this = $(this),
          text = $this.siblings('input:text'),
          value = text.getVal();

        if (value) {
          value = value[0];
        }
        value -= shop2.options.amountDefaultInc;
        value = value.toFixed(5) - 0;

        if (value <= shop2.options.amountDefaultValue) {
          value = shop2.options.amountDefaultValue;
        }

        text.val(value);
        text.trigger('keyup');
      });

      $document.on('click', '.amount-plus', function() {

        var $this = $(this),
          text = $this.siblings('input:text'),
          value = text.getVal();

        if (value) {
          value = value[0];
        }

        value += shop2.options.amountDefaultInc;
        value = value.toFixed(5) - 0;

        text.val(value);
        text.trigger('keyup');
      });

      $document.on('keyup', '.shop2-product-amount input:text', function() {
        var $this = $(this);
        validate($this);
      });

      $document.keyFilter('.shop2-product-amount input:text', {
        type: shop2.options.amountType
      });
    },

    discounts: function() {

      $(document).on('click', '.shop2-product-actions dt', function(e) {
        var $this = $(this),
          win = $this.next(),
          left = $this.position().left;

        e.stopPropagation();

        if (win.is(':hidden')) {
          $('.shop2-product-actions dd').hide();
          win.show();
          win.css('left', left);
        } else {
          win.hide();
        }

      });

      $(document).on('click', '.close-desc-action', function(e) {
        var $this = $(this),
          win = $this.closest('dd');

        e.stopPropagation();

        win.hide();
      });

      $(document).on('click', function() {
        $('.shop2-product-actions dd').hide();
      });

    },

    question: function() {
      var cls = '.price-old.question, .shop2-cart-total .question';

      $(document).on('mouseenter', cls, function() {
        var $this = $(this),
          win = $this.next().show(),
          position = $this.position(),
          height = win.outerHeight(true);

        win.css({
          top: position.top - height - 5,
          left: position.left
        });

      }).on('mouseleave', cls, function() {

        var $this = $(this),
          win = $this.next();

        win.hide();

      });

    },

    tabs: function() {

      var tabs = $('.shop2-product-tabs li'),
        btns = tabs.find('a'),
        texts = $('.shop2-product-desc > div');

      btns.on('click', function(e) {
        var $this = $(this),
          href = $this.attr('href');

        e.preventDefault();

        tabs.removeClass('active-tab');
        $this.parent().addClass('active-tab');

        texts.removeClass('active-area');
        $(href).addClass('active-area');
      });


    },

    filter: function() {

      var wrap = $('.shop2-filter'),
        result = $('.result');

      shop2.filter.init();

      shop2.on('afterGetSearchMatches', function(d, status) {

        if (d.data.total_found === 0) {

          result.addClass('no-result');
        } else {
          result.removeClass('no-result');
        }

        if (shop2.facets.enabled) {
          shop2.facets.set('filter');
        }

        $('#filter-result').html(d.data.total_found);

        result.removeClass('hide');
      });

      wrap.find('.param-val').on('click', function(e) {
        var $this = $(this),
          name = $this.data('name'),
          value = $this.data('value');

        e.preventDefault();

        $this.toggleClass('active-val');
        shop2.filter.toggle(name, value);
        shop2.filter.count();
      });

      wrap.find('select').on('change', function() {
        var $this = $(this),
          name = this.name,
          value = $this.val();

        shop2.filter.add(name, value);
        shop2.filter.count();
      });

      wrap.find('input:text').keyup(function() {
        var $this = $(this),
          name = $this.attr('name');

        $.s3throttle('filter: ' + name, function() {
          var value = $this.val();

          shop2.filter.add(name, value);
          shop2.filter.count();
        }, 500);
      });

      wrap.find('.shop2-filter-go').on('click', function(e) {
        e.preventDefault();
        shop2.filter.go();
      });

    },

    sort: function() {
      var wrap = $('.sorting');

      wrap.find('.sort-param').on('click', function(e) {
        var $this = $(this),
          name = $this.data('name');

        e.preventDefault();
        shop2.filter.sort(name);
        shop2.filter.go();
      });

      wrap.find('.sort-reset').on('click', function(e) {
        e.preventDefault();
        shop2.filter.remove('s[sort_by]');
        shop2.filter.go();
      });

    },

    views: function() {
      $('.view-shop a').on('click', function(e) {
        var $this = $(this),
          value = $this.data('value');

        e.preventDefault();
        shop2.filter.remove('view');
        shop2.filter.add('view', value);
        shop2.filter.go();

      });
    },

    toggle: function() {

      function tgl(el, wrap, cls, cookie) {
        $(document).on('click', wrap + ' ' + el, function(e) {
          var w = $(wrap);
          e.preventDefault();
          if (w.hasClass(cls)) {
            w.removeClass(cls);
            eraseCookie(cookie);
          } else {
            w.addClass(cls);
            createCookie(cookie, 1, 7);
          }
        });
      }

      tgl('.block-title', '.cart-preview', 'opened', 'cart_opened');
      tgl('.block-title', '.search-form', 'opened', 'search_opened');
      tgl('.block-title', '.login-form ', 'opened', 'login_opened');

    },

    search: function() {
      var custom = $('#shop2_search_custom_fields'),
        global = $('#shop2_search_global_fields');

      shop2.on('afterGetFolderCustomFields', function(d, status) {
        custom.html(d.data);
        global.find('input, select').prop('disabled', true);
        global.hide();
      });

      $('#s\\[folder_id\\]').on('change', function() {
        var $this = $(this),
          folder_id = $this.val();

        if (folder_id) {

          shop2.search.getParams(folder_id);

        } else {

          custom.html('');

          global.find('input, select').prop('disabled', false);

          global.show();
        }
      }).trigger('change');

      if (shop2.facets.enabled) {
        shop2.facets.searchSetup();
      }
    },

    cart: function() {

      var updateBtn = $('.shop2-cart-update'),
        cartTable = $('.shop2-cart-table'),
        form = $('#shop2-cart');

      shop2.on('afterCartRemoveItem, afterCartUpdate', function() {
        document.location.reload();
      });

      function updateBtnShow() {
        updateBtn.show();
      }

      var eventName;

      ['keypress', 'keyup', 'keydown'].forEach(function(item) {
        if ('on' + item in document) {
          eventName = item;
          return false;
        }
      });

      cartTable.find('input:text').on(eventName, function(e) {
        if (e.keyCode == 13) {
          shop2.cart.update(form);
        } else {
          updateBtnShow();
        }
      });

      $(document).on('change, click', 'select.param-value, li.param-value:not(.shop2-color-ext-selected)', function() {
        updateBtnShow();
      });

      cartTable.find('.amount-minus, .amount-plus').on('click', updateBtnShow);

      updateBtn.on('click', function(e) {
        e.preventDefault();
        shop2.cart.update(form);
        return false;
      });


      $('.cart-delete a').on('click', function(e) {
        var $this = $(this),
          id = $this.data('id');

        e.preventDefault();

        shop2.cart.remove(id);

      });

      $('#shop2-deligate-calc').on('click', function(e) {
        var data = {},
          delivery = $('#shop2-order-delivery'),
          tabs = delivery.find('.shop2-delivery--item__tab');

        $('#shop2-perfect-form').find('input, textearea, select').each(function() {
          var $this = $(this);
          if (this.tagName === 'INPUT' && this.type === 'checkbox') {
            if (this.checked) {
              data[this.name] = 'on';
            }
          } else {
            data[this.name] = $(this).val();
          }
        });

        e.preventDefault();
        tabs.removeClass('active-tab');
        tabs.removeClass('point');
        delivery.addClass('preloader');
        $('#shop2-delivery-wait').show();
        $('input#address').blur();
        $('#shop2-deligate-calc').hide();
        //$('#form_g-anketa .text-right button').prop('disabled', true).addClass('g-button--disabled');

        $.ajax({
          url: '/my/s3/xapi/public/?method=deligate/calc&param[get_vars][]',
          type: 'post',
          dataType: 'json',
          data: data,
          success: function(result) {
            delivery.removeClass('preloader');
            $('#shop2-delivery-wait').hide();
            $('#shop2-order-delivery').html(result.result.html);
            $('#shop2-order-delivery').append('<div class="preloader"><div class="spinner"></div></div>');
            $('#shop2-order-delivery').find('.delivery-items').each(function() {
              var $this = $(this);
              if ($.trim($this.text()) == "") {
                $this.parents('.shop2-delivery--item__tab:first').addClass('disabled');
              }
            });
            if (result.result.error) {
              shop2.alert(result.result.error);
            } else {

              var dadataJson = $.parseJSON($('#dadata').val()),
                coordsCenter = [dadataJson.geo_lat, dadataJson.geo_lon];

              shop2.queue.edost2();
              $('#shop2-ems-calc, #shop2-edost-calc').on('click', function(e) {
                var $this = $(this);
                var attach_id = $this.data('attach-id');
                var to = $('select[name=' + attach_id + '\\[to\\]]');
                var zip = $('input[name=' + attach_id + '\\[zip\\]]');
                var order_value = $('input[name=' + attach_id + '\\[order_value\\]]');

                if (to.length == 0) {
                  to = $('#shop2-edost2-to');
                }

                e.preventDefault();

                to = to.get(0) ? to.val() : '';
                zip = zip.get(0) ? zip.val() : '';
                order_value = order_value.prop("checked") ? 'on' : '';

                shop2.delivery.calc(attach_id, 'to=' + to + '&zip=' + zip + '&order_value=' + order_value, function(d) {
                  if (!d.data && d.errstr) {
                    shop2.alert(d.errstr);
                    $('#delivery-' + attach_id + '-cost').html(0);
                  } else {
                    $('#delivery-' + attach_id + '-cost').html(d.data.cost);

                    if (d.data.html) {
                      $('#delivery-' + attach_id + '-html').html(d.data.html);
                      shop2.queue.edost();
                    }
                  }
                });

              });
              $('#shop2-deligate-calc').hide();
            }
          }
        });
      });
    },

    coupon: function() {

      shop2.on('afterCartAddCoupon, afterCartRemoveCoupon', function() {
        document.location.reload();
      });

      $('.coupon-btn').on('click', function(e) {
        var coupon = $('#coupon'),
          code = coupon.val();

        e.preventDefault();

        if (code) {

          shop2.cart.addCoupon(code);

        }

      });


      $('.coupon-delete').on('click', function(e) {
        var $this = $(this),
          code = $this.data('code');

        e.preventDefault();

        if (code) {

          shop2.cart.removeCoupon(code);

        }

      });

    },

    delivery: function() {
      $('#shop2-order-delivery').find('.delivery-items').each(function() {
        var $this = $(this);
        if ($.trim($this.text()) == "") {
          $this.parents('.shop2-delivery--item__tab:first').addClass('disabled');
        }
      });
      $(document).on('change', '.map-select select', function() {
        var $this = $(this),
          index = $this.find('option:selected').index(),
          pos = $this.find('option:selected').text(),
          id = $this.val();

        if (index == 0) {
          shop2.delivery.ymapsMap.balloon.close();
          return;
        }

        var it = shop2.delivery.ymapsMap.geoObjects.getIterator(),
          ss;
        while (ss = it.getNext()) {
          for (var i = 0, len = ss.getLength(); i < len; i++) {
            var placemark = ss.get(i);
            if (placemark.properties.get('id') === id) {
              if (placemark.balloon.isOpen()) {
                placemark.balloon.close();
              } else {
                placemark.balloon.open();
              }
              return;
            }
          }
        }

      });
      $(document).on('click', '.option-label', function(e) {
        var options = $(document).find('.option-label'),
          groups = $(document).find('.option-type'),
          details = options.next();

        var $this = $(this),
          index = $this.parent().index();

        if (e.target.nodeName != 'INPUT' && shop2.delivery.deligate) {
          e.preventDefault();
        }

        if (shop2.delivery.ymapsMap) {
          shop2.delivery.ymapsMap.destroy();
          shop2.delivery.ymapsMap = null;
        }

        groups.removeClass('active-type');
        $this.parent().addClass('active-type');
        details.find('input, textarea, select').prop('disabled', true);
        $this.next().find('input, textarea, select').prop('disabled', false);
        if (shop2.delivery.deligate) {
          $this.find('input:first').prop('checked', true);
        }

        if ($this.hasClass('ymap')) {
          shop2.delivery.YmapsInit($this.data('service-code'));
        }

      });
      $(document).on('click', '.shop2-delivery--item__tab .tab-label', function() {
        var groups = $(document).find('.shop2-delivery--item__tab'),
          $this = $(this),
          parent = $this.parents('.shop2-delivery--item__tab:first'),
          index = parent.index();

        if (parent.hasClass('disabled')) return false;
        if (parent.hasClass('active-tab')) {
          parent.removeClass('active-tab');
          return;
        }

        groups.removeClass('active-tab').eq(index).addClass('active-tab');
      });

      $(document).on("click", ".option-label", function() {
        var $this = $(this),
          attach_id = $this.data("attach_id"),
          siblings = $this.parent().siblings(".option-type"),
          tabsSib = $this.parents('.shop2-delivery--item__tab:first').siblings();
        $("#delivery_id_deligate").val(attach_id);
        $("#deligate_points_fields .fields").empty();
        $("#deligate_points_fields").hide();
        tabsSib.find('.option-type input').prop('checked', false);
        tabsSib.removeClass('point');
        siblings.find('input').prop('checked', false);
      });

      $('#shop2-ems-calc, #shop2-edost-calc').on('click', function(e) {
        var $this = $(this);
        var attach_id = $this.data('attach-id');
        var to = $('select[name=' + attach_id + '\\[to\\]]');
        var zip = $('input[name=' + attach_id + '\\[zip\\]]');
        var order_value = $('input[name=' + attach_id + '\\[order_value\\]]');

        if (to.length == 0) {
          to = $('#shop2-edost2-to');
        }

        e.preventDefault();

        to = to.get(0) ? to.val() : '';
        zip = zip.get(0) ? zip.val() : '';
        order_value = order_value.prop("checked") ? 'on' : '';

        shop2.delivery.calc(attach_id, 'to=' + to + '&zip=' + zip + '&order_value=' + order_value, function(d) {
          if (!d.data && d.errstr) {
            shop2.alert(d.errstr);
            $('#delivery-' + attach_id + '-cost').html(0);
          } else {
            $('#delivery-' + attach_id + '-cost').html(d.data.cost);

            if (d.data.html) {
              $('#delivery-' + attach_id + '-html').html(d.data.html);
              shop2.queue.edost();
            }
          }
        });

      });
    },

    edost: function() {
      // см delivery

      function find(name) {
        var selector = '[name=' + name.replace(/([\[\]])/g, '\\$1') + ']';
        return $(selector);
      }

      var btn = $('#shop2-edost-calc'),
        attach_id = btn.data('attach-id'),
        address = find(attach_id + '[address]');

      function setAddress(office) {
        var text = $.trim(office.text()).replace(/\s*\n\s*/g, '\n').split('\n').splice(1).join('\n');
        address.val(text).prop('readonly', true);
      }

      find(attach_id + '[edost][office]').on('click', function() {
        var $this = $(this),
          wrap = $this.closest('.shop2-edost-office');

        setAddress(wrap);
        $this.prop('checked', true);
      });

      find(attach_id + '[edost][tarif]').on('click', function() {
        var $this = $(this),
          wrap = $this.closest('.shop2-edost-variant'),
          siblings = wrap.siblings(),
          office = wrap.find('.shop2-edost-office'),
          checked;

        siblings.find('.shop2-edost-office input, .shop2-edost-pickpointmap input').prop({
          disabled: true,
          checked: false
        });

        var radio = wrap.find('.shop2-edost-office input, .shop2-edost-pickpointmap input').prop({
          disabled: false
        }).filter(':radio');

        checked = radio.filter(':checked');

        if (radio.get(0)) {

          if (checked.get(0)) {
            checked.trigger('click');
          } else {
            radio.eq(0).trigger('click');
          }

        } else {

          if (office.length == 1) {
            setAddress(office);
          } else if (address.prop('readonly')) {
            address.prop('readonly', false).val('');
          }

        }
        shop2.trigger('afterEdostSet');

      }).filter(':checked').trigger('click');


      $('.shop2-edost-pickpointmap a').on('click', function() {
        var $this = $(this),
          span = $this.children(),
          city = $this.data('city');

        $this.closest('.shop2-edost-variant').find('> label input').trigger('click');

        function cb(data) {
          var res = {};
          $.each(['name', 'address', 'id'], function(i, k) {
            res[k] = data[k];
          });
          $this.next().val(JSON.stringify(res));
          span.html(': ' + res.name);
          address.val(res.name + ',\n' + res.address).prop('readonly', true);
        }

        PickPoint.open(cb, {
          city: city,
          ids: null
        });

        return false;
      });

      // if (address.prop('readonly')) {
      // 	address.prop('readonly', false).val('');
      // }

    },

    edost2: function() {

      if (!window.shop2EdostRegions) {
        return;
      }

      var $country = $('#shop2-edost2-country');
      var countryDef = $country.html();
      var $region = $('#shop2-edost2-region');
      var regionDef = $region.html();
      var $city = $('#shop2-edost2-city');
      var cityDef = $city.html();
      var $to = $('#shop2-edost2-to');
      var list;


      if ($country.length) {
        list = $.grep(shop2EdostRegions, function(item) {
          return item.is_country;
        });
        $country.html(countryDef + makeHTML(list));
        hide($region);
        hide($city);

        $country.on('change', function() {
          var country = $(this).val();
          if ($region.length) {
            list = $.grep(shop2EdostRegions, function(item) {
              return item.is_region && item.country == country;
            });
            $region.html(regionDef + makeHTML(list));
            if (list.length == 0) {
              hide($region);
              hide($city);
              $to.val(country);
            } else {
              show($region);
              $to.val('');
            }
          } else if ($city.length) {
            list = $.grep(shop2EdostRegions, function(item) {
              return item.is_city && item.country == country;
            });
            $city.html(cityDef + makeHTML(list));
            if (list.length == 0) {
              hide($city);
              $to.val(country);
            } else {
              show($city);
              $to.val('');
            }
          } else {
            $to.val(country);
          }
        });
      }

      if ($region.length) {
        if (!$country.length) {
          list = $.grep(shop2EdostRegions, function(item) {
            return item.is_region;
          });
          $region.html(regionDef + makeHTML(list));
          hide($city);
        }

        $region.on('change', function() {
          var region = $(this).val();
          list = $.grep(shop2EdostRegions, function(item) {
            return item.is_city && item.region == region;
          });
          $city.html(cityDef + makeHTML(list));
          if (list.length == 0) {
            hide($city);
            $to.val(region);
          } else {
            show($city);
            $to.val(region);
          }
        });
      }

      if (!$country.length && !$region.length) {
        list = $.grep(shop2EdostRegions, function(item) {
          return item.is_city;
        });
        $city.html(regionDef + makeHTML(list));
      }

      $city.on('change', function() {
        var val = $(this).val();
        if (val === 'default') {
          if ($region.length) {
            $to.val($region.val());
          }
        } else if (val) {
          $to.val(val);
        }
      });

      var countryValue = $country.data('value');
      var regionValue = $region.data('value');
      var cityValue = $city.data('value');

      if (countryValue) {
        $country.val(countryValue);
      }

      $country.trigger('change');

      if (regionValue) {
        $region.val(regionValue);
      }

      $region.trigger('change');

      if (cityValue) {
        $city.val(cityValue);
      }

      $city.trigger('change');

      function makeHTML(arr) {
        var html = $.map(arr, function(item) {
          return '<option value="' + item.id + '">' + item.name + '</option>';
        });
        return html.join('');
      }

      function hide($el) {
        $el.html('').closest('.option-item').addClass('hide');
      }

      function show($el) {
        $el.closest('.option-item').removeClass('hide');
      }

    },

    print: function() {

      $('#order-print').on('click', function() {

        s3.printMe('shop2-order', {
          stylesheet: shop2.options.printCSS
        });

        return false;
      });

    },

    hs: function() {

      $('.shop2-compare-product-image a img, .shop2-compare-data a img, .shop2-product .product-image a img, .shop2-product .product-thumbnails li a img, .cart-product-image a img, .cart-product-param a img').closest('a').on('click', function() {
        hs.expand(this);
        return false;
      }).addClass('highslide');

      $(document).on('click', '.shop2-edost-office-address a', function() {
        hs.htmlExpand(this, {
          objectType: 'iframe',
          wrapperClassName: 'draggable-header',
          outlineType: 'rounded-white',
          width: 900,
          height: 600,
          align: 'center'
        });
        return false;
      });


    },

    vendors: function() {

      $('.shop2-vendor').eachRow(function(group) {
        var heights = group.getHeights();

        group.each(function(i) {
          var $this = $(this),
            delta = heights.max - heights.values[i],
            name = $this.find('.vendor-name'),
            height = name.height();

          name.css('min-height', height + delta);

        });
      });

    },

    toggleFields: function() {

      var fields = $('.shop2-filter-fields'),
        cookieName = 'filter_opened',
        opened = readCookie(cookieName),
        btn = $('.shop2-toggle-fields');

      btn.on('click', function() {
        var $this = $(this),
          alt = $this.data('alt'),
          text = $this.html();

        if (fields.hasClass('hide')) {
          createCookie(cookieName, 1, 7);
        } else {
          eraseCookie(cookieName);
        }

        fields.toggleClass('hide');
        $this.html(alt);
        $this.data('alt', text);

        return false;
      });

      if (!opened) {
        btn.trigger('click');
      }

    },

    lazyLoad: function() {

      var $document = $(document),
        $window = $(window),
        blocked = false,
        products = $('.product-list');

      function path(url, param, value) {
        return url + (~url.indexOf('?') ? '&' : '?') + param + '=' + value;
      }

      if (shop2.my.lazy_load_subpages && products.get(0)) {
        $document.scroll(function() {
          var pagelist = $('.shop2-pagelist:last');
          var next = pagelist.find('.active-num').next().find('a');

          if (!next.length) {
            return;
          }

          pagelist.addClass('show');
          var offsetTop = pagelist.offset().top;
          pagelist.removeClass('show');

          if ($document.scrollTop() + $window.height() >= offsetTop && !blocked && next.get(0)) {
            blocked = true;

            $.get(path(next.attr('href'), 'products_only', 1), function(data) {
              pagelist.after('<hr />' + data);
              pagelist = $('.shop2-pagelist:last');
              pagelist.find('a').each(function() {
                var $this = $(this),
                  href = $this.attr('href');
                $this.attr('href', href.replace(/[&|\?]*products_only=[^&]/, ''));
              });

              shop2.queue.heights();

              blocked = false;
            });
          }
        });
      }

    },

    compare: function() {

      var $document = $(document);

      function update(el, res) {

        // el.closest('.product-compare').replaceWith(res.data);
        $('input[type=checkbox][value=' + el.val() + ']').closest('.product-compare').replaceWith(res.data);

        $('.product-compare-added a span').html('(' + res.count + ')');

        if (res.panel) {
          $('#shop2-panel').replaceWith(res.panel);
        }

      }

      $document.on('click', '.product-compare input:checkbox', function() {
        var $this = $(this),
          action = $this.attr('checked') ? 'del' : 'add';

        shop2.compare.action(action, $this.val(), function(res, status) {
          if (status == 'success') {

            if (res.errstr) {
              shop2.alert(res.errstr);
              $this.prop('checked', false);
            } else {
              update($this, res);
            }
          }
        });
      });

    },

    compareTable: function() {

      $('.shop2-compare-table').each(function() {
        var $this = $(this),
          relay = $this.find('.shop2-compare-switch a'),
          options = $this.find('.shop2-compare-data');

        $this.find('.shop2-compare-delete').on('click', function() {
          var $this = $(this),
            kind_id = $this.data().id;

          shop2.compare.remove(kind_id, function() {
            document.location.reload();
          });

          return false;
        });

        function compareTd(tr) {
          var td = tr.find('td'),
            val = td.eq(1).html(),
            differ = false,
            i = 2,
            len = td.length;

          if (len <= 2) {
            return false;
          }

          for (; i < len; i += 1) {
            if (val != td.eq(i).html()) {
              differ = true;
              break;
            }
            val = td.eq(i).html();
          }

          return differ;
        }

        relay.on('click', function() {

          var $this = $(this);

          relay.removeClass('shop2-compare-switch-active');
          $this.addClass('shop2-compare-switch-active');

          if ($this.index() === 0) {
            options.show();
          } else {
            options.each(function() {
              var $this = $(this),
                differ = compareTd($this);

              if (differ) {
                $this.show();
              } else {
                $this.hide();
              }
            });
          }

          return false;

        }).eq(1).trigger('click');


      });
    },

    alert: function() {

      var tpl = [
          '<div id="shop2-alert">',
          '<div id="shop2-alert-body"></div>',
          '<a href="#" id="shop2-alert-ok" class="shop2-btn"></a>',
          '</div>',
          '<div id="shop2-alert-overlay"></div>'
        ].join('\n'),

        win,
        overlay,
        body,
        ok,
        cls;

      $(document.body).append(tpl);

      win = $('#shop2-alert');
      overlay = $('#shop2-alert-overlay');
      body = $('#shop2-alert-body');
      ok = $('#shop2-alert-ok');

      function hide() {
        overlay.hide();
        win.hide();
        win.removeAttr('class');
        cls = '';
        shop2.trigger('alertHide', win);
        return false;
      }

      function show() {
        overlay.show();
        win.attr('class', cls);
        win.show().s3center();
        shop2.trigger('alertShow', win);
      }

      overlay.on('click', hide);
      ok.on('click', hide);

      shop2.alert = function(msg, btn, c) {
        ok.html(btn || 'Ok');
        body.html(msg);
        cls = c || 'shop2-alert--warning';
        show();
      };

      shop2.alert.hide = hide;

    },

    tooltip: function() {

      $('.shop2-tooltip').s3tooltip({
        cls: 'shop2-color-ext-tooltip',
        dir: 'top',
        data: function() {
          return $(this).data('tooltip');
        }
      });

    },

    colorTooltip: function() {

      $('.shop2-color-ext-list li').s3tooltip({

        cls: 'shop2-color-ext-tooltip',
        dir: 'top',
        data: function() {
          return $(this).children('div').html();
        }

      });

      $('.shop2-color-ext-multi').s3tooltip({

        cls: 'shop2-color-ext-tooltip',
        dir: 'top',
        data: function() {
          var ul = this.getElementsByTagName('ul');
          if (ul.length) {
            return ul[0].outerHTML;
          }
        }

      });

    },

    colorPopup: function() {

      var popup = $('<div id="shop2-color-ext-popup"></div>');
      var close = $('<div id="shop2-color-ext-close"></div>');
      var list = $('<ul id="shop2-color-ext-list" class="shop2-color-ext-list"></ul>');
      var colors = null;

      popup.append(close);
      popup.append(list);
      $(document.body).append(popup);

      $.on('.shop2-color-ext-caption', {

        click: function() {
          var caption = $(this);
          var wrap = caption.closest('.shop2-color-ext-popup');
          var ul = wrap.find('.shop2-color-ext-list');
          var offset = caption.offset();

          colors = ul.children('li');
          list.html(ul.html());

          popup.css(offset).show();

          return false;
        }

      });


      $(document).on('click', '.shop2-color-ext-list li', function() {
        var $this = $(this);
        var data = $this.data();
        var input = $this.parent().find('input.additional-cart-params');
        var isSelected = $this.is('.shop2-color-ext-selected');

        if (typeof data.kinds !== 'undefined' || input.length) {

          $this.addClass('shop2-color-ext-selected').siblings().removeClass('shop2-color-ext-selected');

          if (input.length) {
            input.val(data.value);
          } else {
            if (!isSelected) {
              shop2.product._reload(this);
            }
          }

        } else {

          var index = $this.index();
          var isPopup = !!$this.closest('#shop2-color-ext-popup').length;
          if (isPopup) {
            $this.toggleClass('shop2-color-ext-selected');
            colors.eq(index).toggleClass('shop2-color-ext-selected');
            shop2.filter.toggle(data.name, data.value);
            shop2.filter.count();
          }
        }
      });

      $(document).on('click', function(e) {
        var target = $(e.target);
        var wrap = target.closest('#shop2-color-ext-popup');

        if (!wrap.get(0) || e.target == close.get(0)) {
          popup.hide();
        }
      });

    },

    colorSelect: function() {

      var select = $('<div id="shop2-color-ext-select"><ins></ins></div>');
      var colors = null;
      var input = null;
      $(document.body).append(select);

      function hide() {
        if (select.is(':visible')) {
          select.hide();
          return true;
        }
      }

      $(document).on('click', hide);

      $.on('.shop2-color-ext-select', {

        click: function() {

          if (hide()) {
            return;
          }

          var wrap = $(this);
          var ul = wrap.find('.shop2-color-ext-options');
          var offset = wrap.offset();

          var html =
            '<div class="baron-wrapper">' +
            '	<div class="baron-scroller">' +
            '		<div class="baron-container">' +
            '			<div class="shop2-color-ext-options">' +
            ul.html() +
            '			</div>' +
            '		</div>' +
            '		<div class="baron-scroller-bar"></div>' +
            '	</div>' +
            '</div>';

          colors = ul.children('li');
          input = wrap.find('input');

          select.html(html)
          select.show();

          var wrapWidth = wrap.width();
          var selectWidth = select.data('width') || (function() {
            var width = select.width();
            select.data('width', width);
            return width;
          })();

          if (wrapWidth > selectWidth) {
            select.css('width', wrapWidth);
          } else {
            select.css('width', selectWidth);
          }

          baron(select, {
            scroller: '.baron-scroller',
            container: '.baron-container',
            bar: '.baron-scroller-bar'
          });

          select.css(offset);

          return false;

        }

      });

      $.on('#shop2-color-ext-select li:not(.shop2-color-ext-selected)', {

        click: function() {
          var $this = $(this);
          var index = $this.index();
          var data = $this.data();

          $this.addClass('shop2-color-ext-selected').siblings().removeClass('shop2-color-ext-selected');
          colors.removeClass('shop2-color-ext-selected');
          colors.eq(index).addClass('shop2-color-ext-selected');


          if (data.kinds) {
            shop2.product._reload(colors.get(index));
          } else {
            input.val(data.value);
          }

        }

      });

    },

    coordinates: function() {

      $(document).on('click', '.shop2-map-link', function(e) {
        e.preventDefault();
        var $this = $(this);
        var data = $this.data();
        var map = data.map;
        if (!map.title) {
          map.title = $this.text();
        }
        shop2.maps.alert(data.mapType, map);
      });
    },

    /*restoreOrderForms: function() {

     var key = 'shop2-order-in-one-page-form';
     var $form = $('.shop2-order-in-one-page-form');

     if (!window.sessionStorage || $form.length === 0) {
     return;
     }

     function getValues() {
     return JSON.parse(sessionStorage.getItem(key));
     }

     function setValues() {
     var values = $form.serializeArray();
     var filled = [];
     $.each(values, function() {
     if (this.value) {
     filled.push(this);
     }
     });
     sessionStorage.setItem(key, JSON.stringify(filled));
     }

     $form.on('change', ':input', setValues);

     var values = getValues();

     if (!values) {
     return;
     }

     var hash = {};
     $.each(values, function() {
     hash[this.name] = this.value;
     });

     if (values) {
     $form.s3deserializeArray(values);
     //sessionStorage.removeItem(key);
     }


     function afterDeliveryCalc() {
     var name;
     var $tarif;
     name = hash.delivery_id + '[edost][tarif]';

     if (hash[name]) {
     $tarif = $form.find('[name="' + name + '"][value="' + hash[name] + '"]').trigger('click').trigger('change');
     }

     name = hash.delivery_id + '[edost][office]';
     if (hash[name] && $tarif) {
     $tarif.closest('.shop2-edost-variant').find('[name="' + name + '"][value="' + hash[name] + '"]').trigger('click').trigger('change');
     }
     }

     var $edostBtn = $('#shop2-edost-calc');
     var $edostTo = $('#shop2-edost2-to');
     var edostToValue = $edostTo.val();

     if (hash.delivery_id && $edostBtn.is(':visible') && edostToValue && edostToValue != 'default') {
     shop2.on('afterDeliveryCalc', function() {
     afterDeliveryCalc();
     afterDeliveryCalc = $.noop;
     });

     $edostBtn.trigger('click');
     }



     setValues();

     },*/


    fixDoubleOrders: function() {

      var $form = $('.shop2-order-form, .shop2-order-in-one-page-form');
      var $submit = $form.find('[type=submit]');

      $form.on('submit', function() {
        $submit.prop('disabled', true);
        setTimeout(function() {
          $submit.prop('disabled', false);
        }, 1000);
      });

    },

    paymentMethods: function() {

      var $types = $('.shop2-payment-type input');
      var $methods = $('.shop2-payment-methods input');


      $types.on('change', function() {
        var $this = $(this);
        var $method = $this.closest('.shop2-payment-type').next('.shop2-payment-methods').find('input:first');
        $methods.prop('checked', false);
        $method.prop('checked', true);
      });

      $methods.on('change', function() {
        var $this = $(this);
        var $type = $this.closest('.shop2-payment-methods').prev('.shop2-payment-type').find('input:first');
        $types.prop('checked', false);
        $type.prop('checked', true);
      });

    },

    auth: function() {

      $(document).on('click', '.js-shop2-cart-auth__expand', function(e) {
        e.preventDefault();
        $('.js-shop2-cart-auth__form').toggle();
      });

    }

  };

  var maps = shop2.maps = {};

  maps.alert = function(type, params) {
    shop2.alert('<div id="shop2-alert-map"></div>', 'Закрыть', 'shop2-alert--map');
    maps[type].ready(function() {
      maps[type].draw('shop2-alert-map', params);
    });
  };

  maps.getCenter = function(arr) {
    var x = 0;
    var y = 0;
    $.each(arr, function() {
      x += this.x;
      y += this.y;
    });

  };


  maps.yandex = {
    ymaps: window.ymaps,
    _loading: $.Deferred(),
    _loading_init: false,
    _loading_callback: function(ymaps) {
      this.ymaps = ymaps;
      this._loading.resolve(ymaps);
    },
    ready: function(callback) {
      this._loading.done(callback);
      if (this.ymaps) {
        this._loading.resolve(this.ymaps);
        return;
      }
      if (!this._loading_init) {
        $('head').append('<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=shop2.maps.yandex._loading_callback" type="text/javascript">');
        this._loading_init = true;
      }
    },
    draw: function(id, point) {
      point = $.extend({}, point);
      point.title = $.s3escape(point.title);
      point.text = $.s3escape(point.text);

      var map = new this.ymaps.Map(id, {
        zoom: point.z,
        center: [point.x, point.y],
        behaviors: ['drag', 'rightMouseButtonMagnifier', 'scrollZoom']
      });

      var MyBalloonContentLayoutClass = this.ymaps.templateLayoutFactory.createClass(
        '<div class="shop2-map-baloon-content">' +
        '<h3>$[properties.title]</h3>' +
        '$[properties.text]' +
        '</div>'
      );
      var placemark = new self.ymaps.Placemark([point.x, point.y], point, {
        balloonContentLayout: MyBalloonContentLayoutClass
      });
      map.geoObjects.add(placemark);
    }
  };


  maps.google = {
    gmaps: window.google && window.google.maps ? window.google.maps : false,
    _loading: $.Deferred(),
    _loading_init: false,
    _loading_callback: function() {
      try {
        this.gmaps = window.google.maps;
        this._loading.resolve(this.gmaps);
      } catch (e) {
        console.log(e);
      }
    },
    ready: function(callback) {
      this._loading.done(callback);
      if (this.gmaps) {
        this._loading.resolve(this.gmaps);
        return;
      }
      if (!this._loading_init) {
        $('head').append('<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&callback=shop2.maps.google._loading_callback" type="text/javascript">');
        this._loading_init = true;
      }
    },
    draw: function(id, point) {
      var map = new this.gmaps.Map(document.getElementById(id), {
        zoom: Number(point.z),
        center: new google.maps.LatLng(point.x, point.y)
      });
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(point.x, point.y),
        map: map,
        title: point.title
      });
      var infowindow = new google.maps.InfoWindow({
        content: '<div class="shop2-map-baloon-content">' +
          '<h3>' + $.s3escape(point.title) + '</h3>' +
          $.s3escape(point.text) +
          '</div>'
      });
      this.gmaps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    }
  };


  $(window).on('load', function() {
    shop2.queue.heights();
  });

  self.shop2 = shop2;

  $(function() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent),
      clickStart = (isMobile) ? 'touchend.respons' : 'click.respons';


    $('.personal-html-btn, .close-btn').on(clickStart, function(e) {
      e.preventDefault();
      $('.personal-html-content').toggleClass('active');
    });

    $(document).on(clickStart, function(event) {
      if ($(event.target).closest('.personal-html-content-in, .personal-html-btn').length) return;
      $('.personal-html-content').removeClass('active');
    });
    $(this).keydown(function(eventObject) {
      if (eventObject.which == 27) {
        $('.personal-html-content').removeClass('active');
      }
    });
  });

})(jQuery, window);