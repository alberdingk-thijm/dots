/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This script should run at document start to set up
	 * intercepts before FB loads.
	 */
	"use strict";

	const disable_infinite_scroll_1 = __webpack_require__(217);
	disable_infinite_scroll_1.default();

/***/ },

/***/ 212:
/***/ function(module, exports) {

	"use strict";

	const paths = ['', '/'];
	function isEnabled() {
	    return paths.indexOf(window.location.pathname) > -1;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = isEnabled;

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Intercept the scroll event and kill it to prevent the
	 * infinite scroll algorithm triggering.
	 */
	"use strict";

	const is_enabled_1 = __webpack_require__(212);
	// Check if the event target is a chat conversation
	let isConversation = target => {
	    if (!target || !target.matches) {
	        return false;
	    }
	    if (target.matches('.conversation') || target.matches('#ChatTabsPagelet')) {
	        return true;
	    }
	    if (!target.parentNode) {
	        return false;
	    }
	    return isConversation(target.parentElement);
	};
	const maybeBlock = event => {
	    if (!is_enabled_1.default()) {
	        return false;
	    }
	    // Allow infinite scrolling of chats on the home page
	    if (isConversation(event.target)) {
	        return false;
	    }
	    event.stopImmediatePropagation();
	    return true;
	};
	function default_1() {
	    window.addEventListener('scroll', maybeBlock, true);
	    window.addEventListener('mousewheel', maybeBlock, true);
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;

/***/ }

/******/ });