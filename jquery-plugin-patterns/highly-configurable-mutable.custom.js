/*
 * 글로벌 함수 선언
 */
;(function(global) {

    global.hyphenate = function(_value) { // camelCase to hypen pattern, hyphenate(key)
        var cache = {};
        var replacer = function(_match) {
            return '-' + _match[0].toLowerCase();
        };
        return cache[_value] || (cache[_value] = _value.replace(/([A-Z])/g, replacer));
    }

    global.round = function(n) { // 소숫점 4자리
        return Math.round(n * 10000) / 10000;
    }

    global.random = function() { // 0~1000 난수
        return Math.floor(Math.random() * 1000)
    }

    global.setUniqueId = function(_str) { // Unique Id 생성하기, 특수문자 제거 또는 난수 생성
        return (typeof _str == 'string') ? _str.toLowerCase().replace(/[^a-z0-9)]/gi, '') : Math.floor(Math.random() * 1000)
    };

    global.extend = function(_source, _props) { // object 병합
        var _key;
        for (_key in _props) {
            if (_props.hasOwnProperty(_key)) {
                _source[_key] = _props[_key];
            }
        }
        return _source;
    };

})(this);

/*
 * 'Highly configurable' mutable plugin boilerplate
 * Author: @markdalgleish
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// Note that with this pattern, as per Alex Sexton's, the plugin logic
// hasn't been nested in a jQuery plugin. Instead, we just use
// jQuery for its instantiation.

;(function($, window, document, undefined) {

    'use strict';

    var root = (function(g) { // global 셋업
        return g;
    })(this);

    var Plugin = function(element, options) { // plugin constructor 생성

        var base = { // base 선언
            el: element,
            $el: $(element),
            appId: '',
            scrollTop: 0
        };

        base.appId = setUniqueId(base.$el.attr('id')) + random(); // set unit app id

        var $document = $(document), // dom 캐쉬
            $window = $(window),
            $html = $('html'),
            $body = $('body'),
            __this = this;

        var metadata = base.$el.attr('data-plugin-options'); // option 에 취합하기 위한 metadata 생성, // <body id="app" data-plugin-options='{ "foo": "123" }'>
        metadata = (metadata !== undefined) ? $.parseJSON(metadata) : {};

        var defaults = { // default 셋팅
            onScroll: noop,
            namespace: '.app'
        };

        var opts = {}; // option 셋업

        var timer = { // 타이머 셋업
            scroll: null // 스크롤 타이머
        };

        // common functions

        function noop() {}; // noop

        function callFunc(_func){ // call function
            if (typeof _func !== 'function') return false;
            _func.call(null, base);
        };

        var handler = {
            scroll: function(){
                var onScroll = function () {
                    base.scrollTop = $window.scrollTop();
                    callFunc(opts.onScroll);
                };
                if (timer.scroll !== null) { // 타이머 해제
                    clearTimeout(timer.scroll);
                    timer.scroll = null;
                }
                timer.scroll = setTimeout(onScroll, 10);
            },
            init: function(){
                $document.on('scroll' + opts.namespace, this.scroll); // set handler
            },
            destroy: function(){
                $document.off('scroll' + opts.namespace, this.scroll); // set handler
            }
        };

        function refresh() { // refresh
            console.log('refresh');
        };

        function init() {
            opts = $.extend({}, defaults, options, metadata); // option 셋업
            handler.init(); // 핸들러 등록
        };

        init();

        return {
            init: init,
            refresh: refresh
        }

    };

    $.fn.plugin = function(options) { // jquery 플러그인 생성
        return this.each(function() {
            new Plugin(this, options);
        });
    };

    window.Plugin = Plugin; // set global func

})(jQuery, window, document);


$(function() {

    $('#app').plugin({
        message: 'Goodbye World! 111',
        onScroll: function(base) {
            console.log(base);
            base.$el.append($('<div>' + base.scrollTop + '</div>'));
        }
    });

    var myApp = new Plugin(document.getElementById('app'), {
        message: 'Goodbye World! 222'
    });

    var myApp2 = new Plugin(document.getElementById('app'), {
        message: 'Goodbye World! 333'
    }).refresh();

});
// References
/*
Creating Highly Configurable jQuery Plugins (by Mark Dalgleish) - http://goo.gl/1VwfP http://goo.gl/bg63
Essential jQuery Plugin Patterns (by Addy Osmani) - http://goo.gl/oE0ge
*/
