/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-cssanimations-csstransitions-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.cssanimations=function(){return F("animationName")},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
'use strict';
var Z63 = (function (parent, $) {

	var MediaQueryListener = function() {
		this.afterElement = window.getComputedStyle ? window.getComputedStyle(document.body, ':after') : false;
		this.currentBreakpoint = '';
		this.lastBreakpoint = '';
		this.init();
	};

	MediaQueryListener.prototype = {

		init: function () {
			var self = this;

			if(!self.afterElement) {
				return;
			}

			self._resizeListener();

		},
		_resizeListener: function () {
			var self = this;

			$(window).on('resize orientationchange load', function() {
				// Regexp for removing quotes added by various browsers
				self.currentBreakpoint = self.afterElement.getPropertyValue('content').replace(/^["']|["']$/g, '');

				if (self.currentBreakpoint !== self.lastBreakpoint) {
					$(window).trigger('breakpoint-change', self.currentBreakpoint);
					self.lastBreakpoint = self.currentBreakpoint;
				}

			});
		}

	};

	parent.mediaqueryListener = parent.mediaqueryListener || new MediaQueryListener();

	return parent;

}(Z63 || {}, jQuery));

// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Date: 07/20/2015
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()

    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            wrapperClassName: 'sticky-wrapper',
            center: false,
            getWidthFrom: '',
            widthFromWrapper: true, // works only when .getWidthFrom is empty
            responsiveWidth: false,
            zIndex: 'auto'
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function() {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

            for (var i = 0, l = sticked.length; i < l; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;

                //update height in case of dynamic content
                s.stickyWrapper.css('height', s.stickyElement.outerHeight());

                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement
                            .css({
                                'width': '',
                                'position': '',
                                'top': '',
                                'z-index': ''
                            });
                        s.stickyElement.parent().removeClass(s.className);
                        s.stickyElement.trigger('sticky-end', [s]);
                        s.currentTop = null;
                    }
                }
                else {
                    var newTop = documentHeight - s.stickyElement.outerHeight()
                        - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if (s.currentTop !== newTop) {
                        var newWidth;
                        if (s.getWidthFrom) {
                            newWidth = $(s.getWidthFrom).width() || null;
                        } else if (s.widthFromWrapper) {
                            newWidth = s.stickyWrapper.width();
                        }
                        if (newWidth == null) {
                            newWidth = s.stickyElement.width();
                        }
                        s.stickyElement
                            .css('width', newWidth)
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .css('z-index', s.zIndex);

                        s.stickyElement.parent().addClass(s.className);

                        if (s.currentTop === null) {
                            s.stickyElement.trigger('sticky-start', [s]);
                        } else {
                            // sticky is started but it have to be repositioned
                            s.stickyElement.trigger('sticky-update', [s]);
                        }

                        if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
                            // just reached bottom || just started to stick but bottom is already reached
                            s.stickyElement.trigger('sticky-bottom-reached', [s]);
                        } else if(s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
                            // sticky is started && sticked at topSpacing && overflowing from top just finished
                            s.stickyElement.trigger('sticky-bottom-unreached', [s]);
                        }

                        s.currentTop = newTop;
                    }

                    // Check if sticky has reached end of container and stop sticking
                    var stickyWrapperContainer = s.stickyWrapper.parent();
                    var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);

                    if( unstick ) {
                        s.stickyElement
                            .css('position', 'absolute')
                            .css('top', '')
                            .css('bottom', 0)
                            .css('z-index', '');
                    } else {
                        s.stickyElement
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .css('bottom', '')
                            .css('z-index', s.zIndex);
                    }
                }
            }
        },
        resizer = function() {
            windowHeight = $window.height();

            for (var i = 0, l = sticked.length; i < l; i++) {
                var s = sticked[i];
                var newWidth = null;
                if (s.getWidthFrom) {
                    if (s.responsiveWidth) {
                        newWidth = $(s.getWidthFrom).width();
                    }
                } else if(s.widthFromWrapper) {
                    newWidth = s.stickyWrapper.width();
                }
                if (newWidth != null) {
                    s.stickyElement.css('width', newWidth);
                }
            }
        },
        methods = {
            init: function(options) {
                var o = $.extend({}, defaults, options);
                return this.each(function() {
                    var stickyElement = $(this);

                    var stickyId = stickyElement.attr('id');
                    var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
                    var wrapper = $('<div></div>')
                        .attr('id', wrapperId)
                        .addClass(o.wrapperClassName);

                    stickyElement.wrapAll(function() {
                        if ($(this).parent("#" + wrapperId).length == 0) {
                            return wrapper;
                        }
                    });

                    var stickyWrapper = stickyElement.parent();

                    if (o.center) {
                        stickyWrapper.css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
                    }

                    if (stickyElement.css("float") === "right") {
                        stickyElement.css({"float":"none"}).parent().css({"float":"right"});
                    }

                    o.stickyElement = stickyElement;
                    o.stickyWrapper = stickyWrapper;
                    o.currentTop    = null;

                    sticked.push(o);

                    methods.setWrapperHeight(this);
                    methods.setupChangeListeners(this);
                });
            },

            setWrapperHeight: function(stickyElement) {
                var element = $(stickyElement);
                var stickyWrapper = element.parent();
                if (stickyWrapper) {
                    stickyWrapper.css('height', element.outerHeight());
                }
            },

            setupChangeListeners: function(stickyElement) {
                if (window.MutationObserver) {
                    var mutationObserver = new window.MutationObserver(function(mutations) {
                        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                            methods.setWrapperHeight(stickyElement);
                        }
                    });
                    mutationObserver.observe(stickyElement, {subtree: true, childList: true});
                } else {
                    if (window.addEventListener) {
                        stickyElement.addEventListener('DOMNodeInserted', function() {
                            methods.setWrapperHeight(stickyElement);
                        }, false);
                        stickyElement.addEventListener('DOMNodeRemoved', function() {
                            methods.setWrapperHeight(stickyElement);
                        }, false);
                    } else if (window.attachEvent) {
                        stickyElement.attachEvent('onDOMNodeInserted', function() {
                            methods.setWrapperHeight(stickyElement);
                        });
                        stickyElement.attachEvent('onDOMNodeRemoved', function() {
                            methods.setWrapperHeight(stickyElement);
                        });
                    }
                }
            },
            update: scroller,
            unstick: function(options) {
                return this.each(function() {
                    var that = this;
                    var unstickyElement = $(that);

                    var removeIdx = -1;
                    var i = sticked.length;
                    while (i-- > 0) {
                        if (sticked[i].stickyElement.get(0) === that) {
                            splice.call(sticked,i,1);
                            removeIdx = i;
                        }
                    }
                    if(removeIdx !== -1) {
                        unstickyElement.unwrap();
                        unstickyElement
                            .css({
                                'width': '',
                                'position': '',
                                'top': '',
                                'float': '',
                                'z-index': ''
                            })
                        ;
                    }
                });
            }
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };

    $.fn.unstick = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method ) {
            return methods.unstick.apply( this, arguments );
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };
    $(function() {
        setTimeout(scroller, 0);
    });
}));

/**
 * jquery.dlmenu.js v1.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {

	'use strict';

	// global
	var Modernizr = window.Modernizr, $body = $( 'body' );

	$.DLMenu = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.DLMenu.defaults = {
		// classes for the animation effects
		animationClasses : { classin : 'dl-animate-in-1', classout : 'dl-animate-out-1' },
		// callback: click a link that has a sub menu
		// el is the link element (li); name is the level name
		onLevelClick : function( el, name ) { return false; },
		// callback: click a link that does not have a sub menu
		// el is the link element (li); ev is the event obj
		onLinkClick : function( el, ev ) { return false; }
	};

	$.DLMenu.prototype = {
		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.DLMenu.defaults, options );
			// cache some elements and initialize some variables
			this._config();

			var animEndEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				},
				transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				};
			// animation end event name
			this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
			// transition end event name
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu',
			// support for css animations and css transitions
			this.supportAnimations = Modernizr.cssanimations,
			this.supportTransitions = Modernizr.csstransitions;

			this._initEvents();

		},
		_config : function() {
			this.open = false;
			this.$trigger = this.$el.children( '.dl-trigger' );
			//this.$menu = this.$el.children( 'ul.dl-menu' );
			this.$menu = this.$el.children( '.dl-menu' );
			this.$menuitems = this.$menu.find( 'li:not(.dl-back)' );
			//this.$el.find( 'ul.dl-submenu' ).prepend( '<li class="dl-back"><a href="#">back</a></li>' );
			this.$el.find( '.dl-submenu' ).prepend( '<li class="dl-back o-nav__sub-link"><a href="#">terug</a></li>' );
			this.$back = this.$menu.find( 'li.dl-back' );
		},
		_initEvents : function() {

			var self = this;

			this.$trigger.on( 'click.dlmenu', function() {
				if( self.open ) {
					self.closeMenu();
				}
				else {
					self.openMenu();
				}
				return false;

			} );

			this.$menuitems.on( 'click.dlmenu', function( event ) {

				event.stopPropagation();

				var $item = $(this),
					//$submenu = $item.children( 'ul.dl-submenu' );
					$submenu = $item.children( '.dl-submenu' );

				if( $submenu.length > 0 ) {

					var $flyin = $submenu.clone().css( 'opacity', 0 ).insertAfter( self.$menu ),
						onAnimationEndFn = function() {
							self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classout ).addClass( 'dl-subview' );
							$item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
							$flyin.remove();
						};

					setTimeout( function() {
						$flyin.addClass( self.options.animationClasses.classin );
						self.$menu.addClass( self.options.animationClasses.classout );
						if( self.supportAnimations ) {
							self.$menu.on( self.animEndEventName, onAnimationEndFn );
						}
						else {
							onAnimationEndFn.call();
						}

						self.options.onLevelClick( $item, $item.children( 'a:first' ).text() );
					} );

					return false;

				}
				else {
					self.options.onLinkClick( $item, event );
				}

			} );

			this.$back.on( 'click.dlmenu', function( event ) {

				var $this = $( this ),
					//$submenu = $this.parents( 'ul.dl-submenu:first' ),
					$submenu = $this.parents( '.dl-submenu:first' ),
					$item = $submenu.parent(),

					$flyin = $submenu.clone().insertAfter( self.$menu );

				var onAnimationEndFn = function() {
					self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classin );
					$flyin.remove();
				};

				setTimeout( function() {
					$flyin.addClass( self.options.animationClasses.classout );
					self.$menu.addClass( self.options.animationClasses.classin );
					if( self.supportAnimations ) {
						self.$menu.on( self.animEndEventName, onAnimationEndFn );
					}
					else {
						onAnimationEndFn.call();
					}

					$item.removeClass( 'dl-subviewopen' );

					var $subview = $this.parents( '.dl-subview:first' );
					if( $subview.is( 'li' ) ) {
						$subview.addClass( 'dl-subviewopen' );
					}
					$subview.removeClass( 'dl-subview' );
				} );

				return false;

			} );

		},
		closeMenu : function() {
			if( !this.open ) {
				return;
			}
            var self = this,
                onTransitionEndFn = function() {
                    self.$menu.off( self.transEndEventName );
                    self._resetMenu();
                };

            this.$menu.removeClass( 'dl-menuopen' );
            this.$menu.addClass( 'dl-menu-toggle' );
            this.$trigger.removeClass( 'dl-active' );

            if( this.supportTransitions ) {
                this.$menu.on( this.transEndEventName, onTransitionEndFn );
            }
            else {
                onTransitionEndFn.call();
            }

            this.open = false;
		},
		openMenu : function() {
           if( this.open ) {
				return;
			}
            var self = this;
            //console.log(this.$el);
            $('.js-dlmenu').dlmenu('closeMenu');
            // clicking somewhere else makes the menu close
            $body.off( 'click' ).on( 'click.dlmenu', function() {
                self.closeMenu() ;
            } );
            this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
                $( this ).removeClass( 'dl-menu-toggle' );
            } );
            this.$trigger.addClass( 'dl-active' );
            this.open = true;
		},
		// resets the menu to its original state (first level of options)
		_resetMenu : function() {
			this.$menu.removeClass( 'dl-subview' );
			this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.dlmenu = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'dlmenu' );
				if ( !instance ) {
					logError( "cannot call methods on dlmenu prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for dlmenu instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		}
		else {
			this.each(function() {
				var instance = $.data( this, 'dlmenu' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );

/*  -----------------------------------------------------------------
 *  Hoteliers.js v3.2.0                                             *
 *  @author Hoteliers.com                                           *
 *  -----------------------------------------------------------------
 */

/*  Constructor of hoteliers_form
 *  @param id:                      the id of the hotel
 *  @param language:                the session language
 *  @param dyn_options:             any option that differ from default options, thus dynamic
 *  @param type:                    could be 'default', 'packages', 'rooms'
 *                                  depending on the type of form used
 *  @param enable_onSiteOverlay:    can be 'true' or 'false' (boolean)
 *                                  this will show a dialog after closing the booking engine to let the
 *                                  booker remind himself/herself of his/her booking
 *                                  !note: the feature should still be enabled in Hoteliers Extranet!
 *  @return                         new object
 */
function hoteliers_form(id,language,dyn_options) {
    var _ = this;
    _.type = 'default';
    _.params = {};
    _.params.ID = id;
    _.params.lang = language;

    // Static options
    _.options = {
        form_class: 'hoteliers-form__form',
        date_format: 'dd.mm.yy',
        default_days: 1,
        frame_width: 1020,
        frame_height: '100%',
        use_inline_iframe: false,
        packages: false,
        rooms: false,
        shownrofmonths: 2,
        hoteliers_submit: 'hf-checkform',
        hoteliers_arrival: 'hf-arrivaldate',
        hoteliers_departure: 'hf-departuredate',
        enable_onSiteOverlay: false,
    };

    jQuery.extend(_.options,dyn_options);

    // Init all other requisites
    _.init();
}

hoteliers_form.prototype = {
    init: function() {
        var _ = this;
        _.set_attributes();
        _.set_datepickers();
        _.set_eventlisteners();
        _.onSiteOverlay.init(_);
    },

    /*  Function to reset the params object */
    /*  @return         void */
    reset: function() {
        for (var prop in this.params) {
            if (!(prop === 'ID' || prop === 'lang')) {
                delete this.params[prop];
            }
        }
    },

    /*  Function to retrieve the script type */
    /*  @return         script type */
    get_type: function() {
        return this.type;
    },

    /*  Function to return the current option settings */
    /*  @return         current option settings */
    get_options: function() {
        return this.options;
    },

    /*  Function to set the neccesary attributes if empty */
    /*  @return         void: attributes set */
    set_attributes: function(obj) {
        var _ = this;
        jQuery('.'+_.get_options().form_class).find('.hoteliers-form__grid-item,.js-hoteliers-form__grid-item,.js-grid-item').each(function() {
            var $this = jQuery(this),
                $inputAndButton = $this.find('input, button'),
                element = $this.attr('data-item');

            if (!$inputAndButton.attr('id')) {
                $inputAndButton.attr('id',element);
            }
            _.get_options()[element] = $inputAndButton.attr('id');

            $this.find('label').attr('for',$this.find('input').attr('id'));
        });
    },

    /*  Function to set the datepickers and their options */
    /*  @return         void: initialized datepicker objects */
    set_datepickers: function() {
        jQuery.datepicker.setDefaults(jQuery.datepicker.regional[this.params.lang]);

        var _ = this,
            today = new Date(),
            $arrival = jQuery('#'+_.get_options().hoteliers_arrival),
            $departure = jQuery('#'+_.get_options().hoteliers_departure);

        $arrival.datepicker({
            dateFormat: _.get_options().date_format,
            minDate: '0',
            numberOfMonths: ((portable_devices.isMobile() === true) ? 1 : _.get_options().shownrofmonths),
            onSelect: function(date) {
                var curr_date = $arrival.datepicker('getDate');
                curr_date.setDate(curr_date.getDate()+_.get_options().default_days);
                $departure.datepicker('option','minDate',curr_date);
            }
        });
        $departure.datepicker({
            dateFormat: _.get_options().date_format,
            minDate: '0',
            numberOfMonths: ((portable_devices.isMobile() === true) ? 1 : _.get_options().shownrofmonths),
        });

        $arrival.datepicker('setDate',today);
        today.setDate(today.getDate()+1);
        $departure.datepicker('setDate',today);
    },

    /*  Function to set all event listeners needed */
    /*  @return         void: initialized eventlisteners */
    set_eventlisteners: function() {
        var _ = this;

        jQuery('#'+_.get_options().hoteliers_submit).click(function(event) {
            event.preventDefault();

            // Execute
            _.hf_check_form(this);
        });

        _.onSiteOverlay.addCloseListener(window,'message',function(objEvent) {
            _.onSiteOverlay.iframeListener(objEvent,_);
        });

    },

    /*  On-site Overlay child object */
    onSiteOverlay: {
        /*  Function to set some params from parent to child object */
        /*  @return void */
        _setDataFromParent: function(objParent) {
            var _ = this;
            _.options = objParent.get_options();
            _.params = objParent.params;
            return _;
        },

        /*  Listen to 'close' event */
        /*  @return void */
        addCloseListener: function(objTarget,strEvent,fncCallback) {
            switch (true) {
                //IE
                case 'attachEvent' in objTarget:
                    objTarget.attachEvent('on'+strEvent,fncCallback);
                    break;
                case 'addEventListener' in objTarget:
                default:
                    objTarget.addEventListener(strEvent,fncCallback,false);
                    break;
            }
        },

        /*  Listen to events on-site overlay */
        /*  @return void */
        iframeListener: function(objEvent,objParent) {
            var _ = this._setDataFromParent(objParent);
            if (objEvent.data === 'hide_overlay' && _.options.$onSiteOverlay) {
                _.options.$onSiteOverlay.hide();
            }
        },

        /*  Function to initialize the On-site Overlay */
        /*  @return void */
        init: function(objParent) {
            var _ = this._setDataFromParent(objParent);

            // Check if feature is enabled in form options
            if (_.options.enable_onSiteOverlay !== true) {
                return;
            }

            // Avoid multiple loads
            if (window.onSiteOverlayAdded && window.onSiteOverlayAdded === true) {
                return;
            }
            window.onSiteOverlayAdded = true;

            // Load JavaScript to check if on-site overlay is enabled on Hoteliers side
            var strExtension = window.location.href.match(/^https?\:\/\/(.*?)\//i)[1].split('.').reverse()[0],
                objScript = document.createElement('script');
            objScript.setAttribute('src','//www.hoteliers.com/'+_.params.lang+'/on-site-overlay/1/'+_.params.ID);
            document.head.appendChild(objScript);
        },
    },

    /*  Function to check if the dates are correct */
    /*  @return         true of false */
    hf_check_dates: function() {
        var _ = this,
            arrival_date = jQuery('#'+_.get_options().hoteliers_arrival).datepicker('getDate'),
            departure_date = jQuery('#'+_.get_options().hoteliers_departure).datepicker('getDate');
        if (departure_date > arrival_date) {
            _.params.arrival = arrival_date.getDate()+'-'+(arrival_date.getMonth()+1)+'-'+arrival_date.getFullYear();
            _.params.departure = departure_date.getDate()+'-'+(departure_date.getMonth()+1)+'-'+departure_date.getFullYear();
            return true;
        }
        return false;
    },

    /* Function to check if a room id is present in the sibling object */
    /* @return          void: set roomID in object */
    hf_check_roomid: function() {
        var _ = this,
            room_id = jQuery('.'+_.get_options().form_class).find('.hf_room_id').val();
        if (typeof room_id !== 'undefined') {
            _.params.roomID = room_id;
            _.type = 'one_room';
        }
    },

    /* Function to check if a room id is present in the sibling object */
    /* @return          void: set roomID in object */
    hf_check_packageid: function() {
        var _ = this,
            package_id = jQuery('.'+_.get_options().form_class).find('.hf_package_id').val();
        if (typeof package_id !== 'undefined') {
            _.params.pID = package_id;
            _.type = 'one_package';
        }
    },


    /*  Function to check if an engine option is selected */
    /*  @return         void */
    hf_check_engineselect: function() {
        var _ = this,
            engine_select = jQuery('#hf_engine').val();
        if (engine_select === 'rooms' || _.get_options().rooms) {
            _.type = 'rooms';
        }
        if (engine_select === 'packages' || _.get_options().packages) {
            _.type = 'packages';
        }
    },

    /*  Function to check if an hotel option is selected */
    /*  @return         void */
    hf_check_hotelselect: function() {
        var _ = this,
            hotel_select = jQuery('#hf_hotel_hotelid').val();
        if (typeof hotel_select !== 'undefined') {
            _.params.ID = hotel_select;
        }
    },

    /*  Function to check if a corporate code was used */
    /*  @return         void */
    hf_check_password: function() {
        var _ = this,
            password = jQuery('#'+_.get_options().hoteliers_code).val();
        if (_.type === 'passwd' && password === '') {
            _.type = 'default';
        }
        if (typeof password !== 'undefined' && password !== '') {
            _.type = 'passwd';
            _.params.passwd = password;
        }
    },

    /*  Function to create the engine link */
    /*  @return         the created engine link */
    hf_create_enginelink: function() {
        var protocolHost = 'https://www.hoteliers.com/',
            engines = {
                default: protocolHost+'wlpEngine.php',
                packages: protocolHost+'wlpPEngine.php',
                passwd: protocolHost+'cwlpEngine.php',
                rooms: protocolHost+'wlpREngine.php',
                one_package: protocolHost+'wlp1PEngine.php',
                one_room: protocolHost+'wlp1REngine.php',
            };
        return engines[this.get_type()];
    },

    /*  Function to set the additional data */
    /*  @return         the parameters needed for the type */
    hf_create_params: function() {
        var _ = this,
            params = '?'+jQuery.param(_.params);
        return _.hf_get_analytics(params);
    },

    /*  Function to set the google analytics parameters */
    /*  @return         string of the ga params */
    hf_get_analytics: function(params) {
        if (typeof(_gaq) !== 'undefined') {
            _gaq.push(function() {
                if (typeof(_gat) !== 'undefined') {
                    params = _gat._getTrackerByName()._getLinkerUrl(params);
                }
            });
        }
        if (typeof(ga) !== 'undefined') {
            ga(function(tracker) {
                params += '&'+tracker.get('linkerParam');
            });
        }
        return params;
    },

    /*  Function to open a fancybox */
    /*  @return         void */
    hf_open_fancybox: function(engine_link) {
        var _ = this,
            booShowLightbox = null,
            objOptions = _.get_options(),
            $onSiteOverlay = null;

        try {
            $onSiteOverlay = objOptions.$onSiteOverlay || new htlrsOnSiteOverlay();
        } catch(e) {}

        jQuery.fancybox({
            type: 'iframe',
            width: objOptions.frame_width,
            height: objOptions.frame_height,
            href: engine_link,
            beforeClose: function() {
                if (_.options.enable_onSiteOverlay !== true) {
                    return true;
                }

                var objArrivalDate = jQuery('#'+objOptions.hoteliers_arrival).datepicker('getDate'),
                    strArrivalDate = [objArrivalDate.getFullYear(),objArrivalDate.getMonth()+1,objArrivalDate.getDate(),].join('-'),
                    objDepartureDate = jQuery('#'+objOptions.hoteliers_departure).datepicker('getDate'),
                    strDepartureDate = [objDepartureDate.getFullYear(),objDepartureDate.getMonth()+1,objDepartureDate.getDate(),].join('-');

                if ($onSiteOverlay !== null) {
                    _.options.$onSiteOverlay = $onSiteOverlay;
                    _.options.$onSiteOverlay
                        .initialize()
                        .setArrival(strArrivalDate)
                        .setDeparture(strDepartureDate)
                        .create();

                    // Show lightbox
                    booShowLightbox = confirm($onSiteOverlay.getConfirmMessage('leave'));
                }

                return (booShowLightbox !== null ? booShowLightbox : true);
            },
            afterClose: function() {
                if (booShowLightbox === true) {
                    _.options.$onSiteOverlay.show();
                }
            },
        });
    },

    /*  Function to open a inline iframe */
    /*  @return         void */
    hf_use_inline_iframe: function(engine_link) {
        var _ = this,
            iFrame = document.createElement('iframe');
        with (iFrame) {
            src = engine_link;
            width = _.get_options().frame_width;
            height = _.get_options().frame_height;
        }
        jQuery('#iframe_container').html(iFrame);
    },

    /*  Function to check if the form values are valid and execute */
    /*  @return         void: opens a new tab if a link has been created */
    hf_check_form: function(event) {
        var _ = this;
        if (_.hf_check_dates()) {
            _.hf_check_roomid(event);
            _.hf_check_packageid(event);
            _.hf_check_hotelselect();
            _.hf_check_engineselect();
            _.hf_check_password();

            var params = _.hf_create_params(),
                engine_link = _.hf_create_enginelink(),
                booIsMobile = portable_devices.isMobile(),
                booIsTablet = portable_devices.isTablet();

            if (engine_link != null) {
                if (booIsTablet || booIsMobile) {
                    window.open(engine_link+params,'_blank');
                } else {
                    if (_.get_options().use_inline_iframe) {
                        _.hf_use_inline_iframe(engine_link+params);
                    } else {
                        _.hf_open_fancybox(engine_link+params);
                    }
                }
            }
        }
        _.reset();
    }
};

var portable_devices = {
    // Returns true or false
    hasTouchscreen: function() {
        return ('ontouchstart' in document.documentElement);
    },
    isTablet: function() {
        return (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i) && screen.width >= 600);
    },
    isMobile: function() {
        return (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) && screen.width <= 600);
    },
    isDesktop: function() {
        var _ = this;
        return (!_.isTablet() || !_.isMobile());
    }
}



// Animate scroll to anchor on page
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

var hc_scripts = {

    toggleMobileQuickbooker : function()
    {
        if(jQuery('.js-quickbooker').length > 0) {

            jQuery('.js-toggle-mobile-qb').click(function () {
                jQuery('.js-quickbooker').toggleClass('m-quickbooker--mobile-active');
            });

        }
    },

    setBooker : function() {
        var $booker = jQuery('.js-quickbooker');
        if ($booker.length <= 0) {
            return;
        }

        $booker.each(function() {
            var $this = jQuery(this),
                strIndex = $this.find('input[name="index"]').val(),
                intHotelId = $this.find('input[name="hotel"]').val(),
                strLanguage = $this.find('input[name="language"]').val(),
                hoteliersForm = new hoteliers_form(intHotelId,strLanguage,{
                    date_format: 'dd/mm/yy',
                    enable_onSiteOverlay: true,
                    hoteliers_arrival: 'hf-arrivaldate'+strIndex,
                    hoteliers_departure: 'hf-departuredate'+strIndex,
                    hoteliers_submit: 'hf-checkform'+strIndex,
                }),
                hoteliersFormOptions = hoteliersForm.get_options();
            jQuery('#'+hoteliersFormOptions.hoteliers_arrival).datepicker('option','onClose',function() {
                jQuery('#'+hoteliersFormOptions.hoteliers_departure).datepicker('show');
            });
        });
    },

    deactivateMobileBooker : function() {

        jQuery('.js-trigger').on('click', function () {

            if(jQuery('.m-quickbooker--mobile-active').length > 0) {
                jQuery('.m-quickbooker--mobile-active').removeClass('m-quickbooker--mobile-active');
            }

        });

    }

    //toggleNav : function()
    //{
    //    if(jQuery('.js-toggle-nav').length > 0) {
    //
    //        jQuery('.js-toggle-nav').click(function () {
    //            if(jQuery('.js-qb').hasClass('h-shown')) {
    //
    //                jQuery('.js-qb').addClass('exit');
    //                setTimeout(function(){
    //                    jQuery('.js-qb').removeClass('h-shown'),
    //                        jQuery('.js-qb').removeClass('exit')
    //                }, 250);
    //                jQuery('.js-nav').addClass('h-shown');
    //
    //            } else if(jQuery('.js-nav').hasClass('h-shown')) {
    //
    //                jQuery('.js-nav').addClass('exit');
    //                setTimeout(function(){
    //                    jQuery('.js-nav').removeClass('h-shown'),
    //                        jQuery('.js-nav').removeClass('exit')
    //                }, 250);
    //
    //            } else (
    //                jQuery('.js-nav').addClass('h-shown')
    //            )
    //        });
    //
    //    }
    //},

    //toggleQuickbooker : function()
    //{
    //    if(jQuery('.js-toggle-qb').length > 0) {
    //        jQuery('.js-toggle-qb').click(function () {
    //            if(jQuery('.js-nav').hasClass('h-shown')) {
    //                jQuery('.js-nav').addClass('exit');
    //                setTimeout(function(){
    //                    jQuery('.js-nav').removeClass('h-shown'),
    //                        jQuery('.js-nav').removeClass('exit')
    //                }, 250);
    //                jQuery('.js-qb').addClass('h-shown');
    //            } else if(jQuery('.js-qb').hasClass('h-shown')) {
    //                jQuery('.js-qb').addClass('exit');
    //                setTimeout(function(){
    //                    jQuery('.js-qb').removeClass('h-shown'),
    //                        jQuery('.js-qb').removeClass('exit')
    //                }, 250);
    //            } else (
    //                jQuery('.js-qb').addClass('h-shown')
    //            )
    //        });
    //    }
    //}

};

jQuery( document ).ready(function() {

    // init custom dropdowns
    if ( jQuery( '.js-custom-dropdown' ).length > 0 ){

        jQuery(document).click(function(){
            // Remove all the active classes, menu is closed
            jQuery( '.js-custom-dropdown' ).removeClass('custom-dropdown--active');
            return;
        });

        jQuery( '.js-custom-dropdown' ).on( 'click', function () {
            return false;
        });

        // NAVIGATION
        jQuery( '.js-custom-dropdown-link' ).on( 'click', function () {

            var strActiveLevel  = jQuery(this).attr('data-level-parent');
            var strActiveGroup  = jQuery(this).attr('data-level-group');
            var strTopLevel     = jQuery(this).attr('data-level-top');

            // Check for a Top level click
            if(typeof strTopLevel != 'undefined' && strTopLevel == 'top' ) {
                // Check if top level is currently active
                if(jQuery( '.js-custom-dropdown[data-level-type="'+strActiveLevel+'"]').hasClass('custom-dropdown--active')) {
                    // Remove all the active classes, menu is closed
                    jQuery( '.js-custom-dropdown' ).removeClass('custom-dropdown--active');
                    return;
                }
            }

            // Check if Clicked Menu isn't already active yet
            if(! jQuery( '.js-custom-dropdown[data-level-type="'+strActiveLevel+'"]').hasClass('custom-dropdown--active')) {
                // Remove all active classes on group
                jQuery( '.js-custom-dropdown[data-level-group="'+strActiveGroup+'"]' ).removeClass( 'custom-dropdown--active' );
            }

            // Toggle Class on clicked item
            jQuery( '.js-custom-dropdown[data-level-type="'+strActiveLevel+'"]' ).toggleClass( 'custom-dropdown--active' );


        });

    }

    if ( jQuery( '.js-custom-dropdown' ).length > 0 ){
        $(".js-scroll-to").click(function() {

            var strScrollToTarget = jQuery(this).attr('rel');
            scrollToAnchor(strScrollToTarget);
        });
    }

    $(function() {
        $( '.js-dlmenu' ).dlmenu({
            animationClasses : { classin : 'dl-animate-in-2', classout : 'dl-animate-out-2' }
        });
    });



    $(window).on('breakpoint-change', function(e, breakpoint) {

        if(breakpoint === 'bp-small') {
            console.log('CSS Breakpoint screen-small');

            $(".js-nav--main").unstick();
        }

        if(breakpoint === 'bp-up-from-small') {
            console.log('CSS Breakpoint up-from-small');

            $(".js-nav--main").sticky(
                {
                    topSpacing: 0,
                    wrapperClassName: 'sticky-nav',
                    getWidthFrom: 'body',
                    zIndex: 5000
                }
            );
        }

    });

    //Toggle nav on palmsized devices
    //hc_scripts.toggleNav();

    //Toggle qb on palmsized devices
    //hc_scripts.toggleQuickbooker();

    //Toggle qb on mobile devices
    hc_scripts.toggleMobileQuickbooker();

    // Set Hoteliers Booker with Onsite Overlay
    hc_scripts.setBooker();

    // Deactivate
    hc_scripts.deactivateMobileBooker();

});


