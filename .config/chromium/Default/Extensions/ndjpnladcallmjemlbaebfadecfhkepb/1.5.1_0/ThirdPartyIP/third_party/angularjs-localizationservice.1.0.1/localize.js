/* global BrowserHandler */

(function () {
    'use strict';

    /*
     * An AngularJS Localization Service
     *
     * Written by Jim Lavin
     * http://codingsmackdown.tv
     *
     * Modified to integrate with chrome.i18n infrastructure
     */

    angular
        .module('localization', [])
        // localization service responsible for retrieving resource files from chrome.i18n
        .factory('localize', ['$filter', function ($filter) {
            var localize = {
                // checks the dictionary for a localized resource string
                getLocalizedString: function (value) {
                    // default the result to an empty string
                    var result = '';

                    // pull localized resource using Chrome API
                    result = BrowserHandler.i18n.getMessage(value);

                    // return the value to the call
                    return result;
                }
            };

            // return the local instance when called
            return localize;
        }])

        // simple translation filter
        // usage {{ TOKEN | i18n }}
        .filter('i18n', ['localize', function (localize) {
            return function (input) {
                return localize.getLocalizedString(input);
            };
        }])

        // translation directive that can handle dynamic strings
        // updates the text value of the attached element
        // usage <span data-i18n="TOKEN" ></span>
        // or
        // <span data-i18n="TOKEN|VALUE1|VALUE2" ></span>
        .directive('i18n', ['localize', function (localize) {
            var i18nDirective = {
                restrict: "EAC",
                updateText: function (elm, token) {
                    var values = token.split('|');
                    if (values.length <= 1) return;

                    // construct the tag to insert into the element
                    var tag = localize.getLocalizedString(values[0]);
                    if (!tag) return;

                    // update the element
                    for (var index = 1; index < values.length; index++) {
                        var target = '{' + (index - 1) + '}';
                        tag = tag.replace(target, values[index]);
                    }

                    // insert the text into the element
                    elm.text(tag);
                },

                link: function (scope, elm, attrs) {
                    attrs.$observe('i18n', function (value) {
                        i18nDirective.updateText(elm, attrs.i18n);
                    });
                }
            };

            return i18nDirective;
        }])
        // translation directive that can handle dynamic strings
        // updates the attribute value of the attached element
        // usage <span data-i18n-attr="TOKEN|ATTRIBUTE" ></span>
        // or
        // <span data-i18n-attr="TOKEN|ATTRIBUTE|VALUE1|VALUE2" ></span>
        .directive('i18nAttr', ['localize', function (localize) {
            var i18NAttrDirective = {
                restrict: "EAC",
                updateText: function (elm, token) {
                    var values = token.split('|');
                    if (values.length < 2) return;

                    // construct the tag to insert into the element
                    var tag = localize.getLocalizedString(values[0]);
                    if (!tag) return;

                    for (var index = 2; index < values.length; index++) {
                        var target = '{' + (index - 2) + '}';
                        tag = tag.replace(target, values[index]);
                    }

                    // insert the text into the element
                    elm.attr(values[1], tag);
                },

                link: function (scope, elm, attrs) {
                    attrs.$observe('i18nAttr', function (value) {
                        i18NAttrDirective.updateText(elm, value);
                    });
                }
            };

            return i18NAttrDirective;
        }]);
})();
