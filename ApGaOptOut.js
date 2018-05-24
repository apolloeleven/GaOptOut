/**
 *
 *
 *
 */

(function () {
    'use strict';

    var ApGaOptOut = function (options) {
        options = this.objectMerge({}, ApGaOptOut.defaults, options);
        this.debug = options.debug;
        this.gaAppId = options.gaAppId;
        this.gaOptOutCookiePrefix = options.gaOptOutCookiePrefix;
        this.optOutCallEvent = options.optOutCallEvent;
        this.elementSelector = options.elementSelector;

        this.init();
    };


    ApGaOptOut.defaults = {
        debug: false,
        gaAppId: '',
        gaOptOutCookiePrefix: 'ga-disable-',
        optOutCallEvent: 'click',
        elementSelector: ''
    };


    ApGaOptOut.VERSION = '1.0.0';


    ApGaOptOut.prototype = {
        constructor: ApGaOptOut,


        init: function () {
            this._log('Init ApGaOptOut');
            this._log('optOutCallEvent: ' + this.optOutCallEvent);
            this._log('elementSelector: ' + this.elementSelector);
            if (!this.gaAppId) {
                console.error('gaAppId must be provided to work google analytics opt out');
                this._log('Your provided Ga App ID is: ' + this.gaAppId);
                return;
            }
            var self = this,
                el = document.querySelector(self.elementSelector);
            if (el) {
                el.addEventListener(self.optOutCallEvent, function () {
                    self._log(self.optOutCallEvent + ' Triggered');
                    self._setGaOptOut();
                })
            }

            this._checkGaOptOut();
        },


        /**
         * If object.assign function is not available create it and merge objects
         *
         * @param target
         * @param defaults
         * @param options
         */
        objectMerge: function (target, defaults, options) {
            if (typeof Object.assign !== 'function') {
                Object.assign = function(target) {
                    if (target === null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    target = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var source = arguments[index];
                        if (source !== null) {
                            for (var key in source) {
                                if (Object.prototype.hasOwnProperty.call(source, key)) {
                                    target[key] = source[key];
                                }
                            }
                        }
                    }
                    return target;
                };
            }
            return Object.assign(target, defaults, options);
        },


        /**
         * Check if if opt out cookie exists and put it on window object
         *
         * @private
         */
        _checkGaOptOut: function () {
            if (this._checkOptOutCookie()) {
                this._log('Google analytics already disabled.');
                window[this.gaOptOutCookiePrefix + this.gaAppId] = true;
            }
        },


        /**
         * Disable Google Analytics for current user
         *
         * @private
         */
        _setGaOptOut: function () {
            this._log('Google analytics has disabled successfully.');
            this._setOptOutCookie();
            window[this.gaOptOutCookiePrefix + this.gaAppId] = true;
        },


        /**
         * Check if opt out cookie already exists
         *
         * @returns {boolean}
         * @private
         */
        _checkOptOutCookie: function () {
            return document.cookie.indexOf(this.gaOptOutCookiePrefix + this.gaAppId + '=true') > -1;
        },


        /**
         * Set opt out cookie
         *
         * @private
         */
        _setOptOutCookie: function () {
            document.cookie = this.gaOptOutCookiePrefix + this.gaAppId + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
        },


        /**
         *
         *
         * @private
         */
        _log: function () {
            if (this.debug === true) {
                window.console.log.apply(this, arguments);
            }
        }

    };

    window.ApGaOptOut = ApGaOptOut;
})();
