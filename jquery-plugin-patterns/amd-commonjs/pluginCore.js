// Module/Plugin core
// Note: the wrapper code you see around the module is what enables
// us to support multiple module formats and specifications by
// mapping the arguments defined to what a specific format expects
// to be present. Our actual module functionality is defined lower
// down, where a named module and exports are demonstrated.
//
// Note that dependencies can just as easily be declared if required
// and should work as demonstrated earlier with the AMD module examples.
(function(name, definition) {
    var theModule = definition(), // this is considered "safe":
        hasDefine = typeof define === 'function' && define.amd, // hasDefine = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;
    if (hasDefine) { // AMD Module
        define(theModule);
    } else if (hasExports) { // Node.js Module
        module.exports = theModule;
    } else { // Assign to common namespaces or simply the global object (window)
        (this.jQuery || this.ender || this.$ || this)[name] = theModule;
        console.log((window.jQuery)[name]);
    }
})('app', function() {

    var core = this;

    var defaults = { // default settings
        name: '123'
    };

    var opts = {}; // extend options

    var $document = $(document),
        $window = $(window),
        $html = $('html');

    core.plugins = [];

    var base = {
        eventnames: {
            scroll: 'myScroll',
            resize: 'myResize'
        },
        scrollTop: 0,
        highlightColor: 'yellow',
        errorColor: 'red'
    };

    core.base = base; // set public base

    // private
    var setHandler = function(){
        var _onScroll = function(){
            base.scrollTop = $document.scrollTop();
            $document.trigger(base.eventnames.scroll);
        };
        $document.on('scroll resize', _onScroll);
    };

    // define the core base here and return the public API
    core.init = function(options) {
        opts = $.extend({}, defaults, options);
        console.log(opts);
        setHandler();
    };

    // This is the highlight method used by the core highlightAll()
    // method and all of the plugins highlighting elements different
    // colors
    core.highlight = function(el, strColor) {
        $(el).css('background', strColor);
    };

    return {
        init: function(options) {
            core.init(options);
        },
        highlight: function() {
            core.highlight(el, strColor);
        }
    };

});
