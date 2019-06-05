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

    var Plugin = function(elem, options) { // our plugin constructor

        var base = this;

        base.elem = elem;
        base.$elem = $(elem);
        base.options = options;

        // This next line takes advantage of HTML5 data attributes
        // to support customization of the plugin on a per-element
        // basis. For example,
        // <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>

        base.metadata = base.$elem.attr('data-plugin-options'); // metadata

    };

    // the plugin prototype
    Plugin.prototype = {

        defaults: {
            message: 'Hello world!'
        },

        build: function() {
            // eg. show the currently configured message
            console.log(this.config.message);
        },

        init: function() {

            var metadata = $.parseJSON(this.metadata);


            // console.info(JSON.parse(this.metadata));

            // Introduce defaults that can be extended either
            // globally or using an object literal.
            this.config = $.extend({}, this.defaults, this.options, metadata);

            console.log(this.config);

            // Sample usage:
            // Set the message per instance:
            // $('#elem').plugin({ message: 'Goodbye World!'});

            // or

            // var p = new Plugin(document.getElementById('elem'),
            // { message: 'Goodbye World!'}).init()
            // or, set the global default message:
            // Plugin.defaults.message = 'Goodbye World!'

            this.build();

            return this;
        }
    }

    Plugin.defaults = Plugin.prototype.defaults;

    $.fn.plugin = function(options) {
        return this.each(function() {
            new Plugin(this, options).init();
        });
    };

    window.Plugin = Plugin; // set global func

})(jQuery, window, document);


$(function(){

    $('#app').plugin({
        message: 'Goodbye World! 111'
    });

    var myApp = new Plugin(document.getElementById('app'), {
        message: 'Goodbye World! 222'
    }).init();

    var myApp2 = new Plugin(document.getElementById('app'), {
        message: 'Goodbye World! 333'
    }).init();

});
// References
/*
Creating Highly Configurable jQuery Plugins (by Mark Dalgleish) - http://goo.gl/1VwfP http://goo.gl/bg63
Essential jQuery Plugin Patterns (by Addy Osmani) - http://goo.gl/oE0ge
*/
