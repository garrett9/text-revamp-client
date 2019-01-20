(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TextRevampClient", [], factory);
	else if(typeof exports === 'object')
		exports["TextRevampClient"] = factory();
	else
		root["TextRevampClient"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new TextRevampClient instance.\n * \n * @param {string} companyId - The ID of the company to add contacts to.\n */\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nfunction TextRevampClient(companyId, params) {\n\tthis.companyId = companyId;\n\tthis.params = (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' ? params : {};\n\tthis.basePath = typeof this.params.basePath === 'string' ? this.params.basePath : 'https://textrevamp.com';\n}\n\n/**\n * Bind a form to the subscribing of a new client.\n * \n * @param {string} query - The query string selector for the form to bind the client to.\n * @param {Object} [parameters] - Optional parameters\n * @param {string} [parameters.group_id] - Optional group ID to add the contact to.\n * @param {Function} [parameters.onSubmit] - A callback to execute as soon as the form that the client is bound to is submitted, but before the AJAX request fires.\n * @param {Function} [parameters.onSuccess] - A callback to execute on a successful ajax request.\n * @param {Function} [parameters.onError] - A callback to execute on an error.\n */\nTextRevampClient.prototype.bind = function (query, parameters) {\n\tvar _this = this;\n\tvar params = (typeof parameters === 'undefined' ? 'undefined' : _typeof(parameters)) === 'object' ? parameters : {};\n\tvar form = document.querySelector(query);\n\tform.addEventListener('submit', function (e) {\n\t\te.preventDefault();\n\t\tif (typeof params.onSubmit === 'function') {\n\t\t\tparams.onSubmit();\n\t\t}\n\t\tvar data = new FormData(form);\n\t\t_this.subscribe(data.get('phone').replace(/[^0-9]/g, ''), {\n\t\t\tfirst_name: data.get('first_name'),\n\t\t\tlast_name: data.get('last_name'),\n\t\t\tgroup_id: params.group_id,\n\t\t\tonSuccess: params.onSuccess,\n\t\t\tonError: params.onError\n\t\t});\n\t}, false);\n};\n\n/**\n * Add a contact to a the client's associated company.\n * \n * @param {string} phoneNumber - The phone number to add to the company.\n * @param {Object} [parameters] - Optional parameters\n * @param {string} [parameters.first_name] - Optional first name to associate with the contact\n * @param {string} [parameters.last_name] - Optional last name to associate with the contact.\n * @param {string} [parameters.group_id] - Optional group ID to add the contact to.\n * @param {Function} [parameters.onSuccess] - A callback to execute on a successful ajax request.\n * @param {Function} [parameters.onError] - A callback to execute on an error.\n */\nTextRevampClient.prototype.subscribe = function (phoneNumber, parameters) {\n\tvar params = (typeof parameters === 'undefined' ? 'undefined' : _typeof(parameters)) === 'object' ? parameters : {};\n\tvar xhr = new XMLHttpRequest();\n\txhr.open('POST', this.basePath + '/api/v1/contacts');\n\txhr.responseType = 'json';\n\txhr.setRequestHeader('Content-Type', 'application/json');\n\txhr.setRequestHeader('Accept', 'application/json');\n\tvar data = {};\n\tdata.company_id = this.companyId;\n\tdata.phone = phoneNumber;\n\tdata.first_name = params.first_name;\n\tdata.last_name = params.last_name;\n\tdata.folder_id = params.group_id;\n\n\txhr.onload = function () {\n\t\tif (xhr.status >= 200 && xhr.status < 300) {\n\t\t\tif (typeof params.onSuccess === 'function') {\n\t\t\t\tparams.onSuccess(xhr.response);\n\t\t\t}\n\t\t} else {\n\t\t\tif (typeof params.onError === 'function') {\n\t\t\t\tparams.onError(xhr.response);\n\t\t\t}\n\t\t}\n\t};\n\n\txhr.send(JSON.stringify(data));\n};\n\nmodule.exports = TextRevampClient;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvdGV4dC1yZXZhbXAtY2xpZW50LmpzPzFhZjMiXSwibmFtZXMiOlsiVGV4dFJldmFtcENsaWVudCIsImNvbXBhbnlJZCIsInBhcmFtcyIsImJhc2VQYXRoIiwicHJvdG90eXBlIiwiYmluZCIsInF1ZXJ5IiwicGFyYW1ldGVycyIsIl90aGlzIiwiZm9ybSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJvblN1Ym1pdCIsImRhdGEiLCJGb3JtRGF0YSIsInN1YnNjcmliZSIsImdldCIsInJlcGxhY2UiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiZ3JvdXBfaWQiLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwicGhvbmVOdW1iZXIiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJyZXNwb25zZVR5cGUiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiY29tcGFueV9pZCIsInBob25lIiwiZm9sZGVyX2lkIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFhOztBQUViOzs7Ozs7OztBQUtBLFNBQVNBLGdCQUFULENBQTBCQyxTQUExQixFQUFxQ0MsTUFBckMsRUFBNkM7QUFDNUMsTUFBS0QsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxNQUFLQyxNQUFMLEdBQWMsUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixHQUE2QkEsTUFBN0IsR0FBc0MsRUFBcEQ7QUFDQSxNQUFLQyxRQUFMLEdBQWdCLE9BQU8sS0FBS0QsTUFBTCxDQUFZQyxRQUFuQixLQUFnQyxRQUFoQyxHQUEyQyxLQUFLRCxNQUFMLENBQVlDLFFBQXZELEdBQWtFLHdCQUFsRjtBQUNBOztBQUVEOzs7Ozs7Ozs7O0FBVUFILGlCQUFpQkksU0FBakIsQ0FBMkJDLElBQTNCLEdBQWtDLFVBQVNDLEtBQVQsRUFBZ0JDLFVBQWhCLEVBQTRCO0FBQzdELEtBQUlDLFFBQVEsSUFBWjtBQUNBLEtBQUlOLFNBQVMsUUFBT0ssVUFBUCx5Q0FBT0EsVUFBUCxPQUFzQixRQUF0QixHQUFpQ0EsVUFBakMsR0FBOEMsRUFBM0Q7QUFDQSxLQUFJRSxPQUFPQyxTQUFTQyxhQUFULENBQXVCTCxLQUF2QixDQUFYO0FBQ0FHLE1BQUtHLGdCQUFMLENBQXNCLFFBQXRCLEVBQWdDLFVBQVNDLENBQVQsRUFBWTtBQUMzQ0EsSUFBRUMsY0FBRjtBQUNBLE1BQUcsT0FBT1osT0FBT2EsUUFBZCxLQUEyQixVQUE5QixFQUEwQztBQUN6Q2IsVUFBT2EsUUFBUDtBQUNBO0FBQ0QsTUFBSUMsT0FBTyxJQUFJQyxRQUFKLENBQWFSLElBQWIsQ0FBWDtBQUNBRCxRQUFNVSxTQUFOLENBQWdCRixLQUFLRyxHQUFMLENBQVMsT0FBVCxFQUFrQkMsT0FBbEIsQ0FBMEIsU0FBMUIsRUFBcUMsRUFBckMsQ0FBaEIsRUFBMEQ7QUFDekRDLGVBQVlMLEtBQUtHLEdBQUwsQ0FBUyxZQUFULENBRDZDO0FBRXpERyxjQUFXTixLQUFLRyxHQUFMLENBQVMsV0FBVCxDQUY4QztBQUd6REksYUFBVXJCLE9BQU9xQixRQUh3QztBQUl6REMsY0FBV3RCLE9BQU9zQixTQUp1QztBQUt6REMsWUFBU3ZCLE9BQU91QjtBQUx5QyxHQUExRDtBQU9BLEVBYkQsRUFhRyxLQWJIO0FBY0EsQ0FsQkQ7O0FBb0JBOzs7Ozs7Ozs7OztBQVdBekIsaUJBQWlCSSxTQUFqQixDQUEyQmMsU0FBM0IsR0FBdUMsVUFBU1EsV0FBVCxFQUFzQm5CLFVBQXRCLEVBQWtDO0FBQ3hFLEtBQUlMLFNBQVMsUUFBT0ssVUFBUCx5Q0FBT0EsVUFBUCxPQUFzQixRQUF0QixHQUFpQ0EsVUFBakMsR0FBOEMsRUFBM0Q7QUFDQSxLQUFJb0IsTUFBTSxJQUFJQyxjQUFKLEVBQVY7QUFDQUQsS0FBSUUsSUFBSixDQUFTLE1BQVQsRUFBaUIsS0FBSzFCLFFBQUwsR0FBZ0Isa0JBQWpDO0FBQ0F3QixLQUFJRyxZQUFKLEdBQW1CLE1BQW5CO0FBQ0FILEtBQUlJLGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLGtCQUFyQztBQUNBSixLQUFJSSxnQkFBSixDQUFxQixRQUFyQixFQUErQixrQkFBL0I7QUFDQSxLQUFJZixPQUFPLEVBQVg7QUFDQUEsTUFBS2dCLFVBQUwsR0FBa0IsS0FBSy9CLFNBQXZCO0FBQ0FlLE1BQUtpQixLQUFMLEdBQWFQLFdBQWI7QUFDQVYsTUFBS0ssVUFBTCxHQUFrQm5CLE9BQU9tQixVQUF6QjtBQUNBTCxNQUFLTSxTQUFMLEdBQWlCcEIsT0FBT29CLFNBQXhCO0FBQ0FOLE1BQUtrQixTQUFMLEdBQWlCaEMsT0FBT3FCLFFBQXhCOztBQUVBSSxLQUFJUSxNQUFKLEdBQWEsWUFBVztBQUN2QixNQUFHUixJQUFJUyxNQUFKLElBQWMsR0FBZCxJQUFxQlQsSUFBSVMsTUFBSixHQUFhLEdBQXJDLEVBQTBDO0FBQ3pDLE9BQUcsT0FBT2xDLE9BQU9zQixTQUFkLEtBQTRCLFVBQS9CLEVBQTJDO0FBQzFDdEIsV0FBT3NCLFNBQVAsQ0FBaUJHLElBQUlVLFFBQXJCO0FBQ0E7QUFDRCxHQUpELE1BSU87QUFDTixPQUFHLE9BQU9uQyxPQUFPdUIsT0FBZCxLQUEwQixVQUE3QixFQUF5QztBQUN4Q3ZCLFdBQU91QixPQUFQLENBQWVFLElBQUlVLFFBQW5CO0FBQ0E7QUFDRDtBQUNELEVBVkQ7O0FBWUFWLEtBQUlXLElBQUosQ0FBU0MsS0FBS0MsU0FBTCxDQUFleEIsSUFBZixDQUFUO0FBQ0EsQ0EzQkQ7O0FBNkJBeUIsT0FBT0MsT0FBUCxHQUFpQjFDLGdCQUFqQiIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVGV4dFJldmFtcENsaWVudCBpbnN0YW5jZS5cbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBhbnlJZCAtIFRoZSBJRCBvZiB0aGUgY29tcGFueSB0byBhZGQgY29udGFjdHMgdG8uXG4gKi9cbmZ1bmN0aW9uIFRleHRSZXZhbXBDbGllbnQoY29tcGFueUlkLCBwYXJhbXMpIHtcblx0dGhpcy5jb21wYW55SWQgPSBjb21wYW55SWQ7XG5cdHRoaXMucGFyYW1zID0gdHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcgPyBwYXJhbXMgOiB7fTtcblx0dGhpcy5iYXNlUGF0aCA9IHR5cGVvZiB0aGlzLnBhcmFtcy5iYXNlUGF0aCA9PT0gJ3N0cmluZycgPyB0aGlzLnBhcmFtcy5iYXNlUGF0aCA6ICdodHRwczovL3RleHRyZXZhbXAuY29tJztcbn1cblxuLyoqXG4gKiBCaW5kIGEgZm9ybSB0byB0aGUgc3Vic2NyaWJpbmcgb2YgYSBuZXcgY2xpZW50LlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBUaGUgcXVlcnkgc3RyaW5nIHNlbGVjdG9yIGZvciB0aGUgZm9ybSB0byBiaW5kIHRoZSBjbGllbnQgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtZXRlcnNdIC0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtzdHJpbmd9IFtwYXJhbWV0ZXJzLmdyb3VwX2lkXSAtIE9wdGlvbmFsIGdyb3VwIElEIHRvIGFkZCB0aGUgY29udGFjdCB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwYXJhbWV0ZXJzLm9uU3VibWl0XSAtIEEgY2FsbGJhY2sgdG8gZXhlY3V0ZSBhcyBzb29uIGFzIHRoZSBmb3JtIHRoYXQgdGhlIGNsaWVudCBpcyBib3VuZCB0byBpcyBzdWJtaXR0ZWQsIGJ1dCBiZWZvcmUgdGhlIEFKQVggcmVxdWVzdCBmaXJlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwYXJhbWV0ZXJzLm9uU3VjY2Vzc10gLSBBIGNhbGxiYWNrIHRvIGV4ZWN1dGUgb24gYSBzdWNjZXNzZnVsIGFqYXggcmVxdWVzdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwYXJhbWV0ZXJzLm9uRXJyb3JdIC0gQSBjYWxsYmFjayB0byBleGVjdXRlIG9uIGFuIGVycm9yLlxuICovXG5UZXh0UmV2YW1wQ2xpZW50LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ocXVlcnksIHBhcmFtZXRlcnMpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblx0dmFyIHBhcmFtcyA9IHR5cGVvZiBwYXJhbWV0ZXJzID09PSAnb2JqZWN0JyA/IHBhcmFtZXRlcnMgOiB7fTtcblx0dmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcblx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmKHR5cGVvZiBwYXJhbXMub25TdWJtaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHBhcmFtcy5vblN1Ym1pdCgpO1xuXHRcdH1cblx0XHR2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblx0XHRfdGhpcy5zdWJzY3JpYmUoZGF0YS5nZXQoJ3Bob25lJykucmVwbGFjZSgvW14wLTldL2csICcnKSwge1xuXHRcdFx0Zmlyc3RfbmFtZTogZGF0YS5nZXQoJ2ZpcnN0X25hbWUnKSxcblx0XHRcdGxhc3RfbmFtZTogZGF0YS5nZXQoJ2xhc3RfbmFtZScpLFxuXHRcdFx0Z3JvdXBfaWQ6IHBhcmFtcy5ncm91cF9pZCxcblx0XHRcdG9uU3VjY2VzczogcGFyYW1zLm9uU3VjY2Vzcyxcblx0XHRcdG9uRXJyb3I6IHBhcmFtcy5vbkVycm9yXG5cdFx0fSk7XG5cdH0sIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBBZGQgYSBjb250YWN0IHRvIGEgdGhlIGNsaWVudCdzIGFzc29jaWF0ZWQgY29tcGFueS5cbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IHBob25lTnVtYmVyIC0gVGhlIHBob25lIG51bWJlciB0byBhZGQgdG8gdGhlIGNvbXBhbnkuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtZXRlcnNdIC0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtzdHJpbmd9IFtwYXJhbWV0ZXJzLmZpcnN0X25hbWVdIC0gT3B0aW9uYWwgZmlyc3QgbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGUgY29udGFjdFxuICogQHBhcmFtIHtzdHJpbmd9IFtwYXJhbWV0ZXJzLmxhc3RfbmFtZV0gLSBPcHRpb25hbCBsYXN0IG5hbWUgdG8gYXNzb2NpYXRlIHdpdGggdGhlIGNvbnRhY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3BhcmFtZXRlcnMuZ3JvdXBfaWRdIC0gT3B0aW9uYWwgZ3JvdXAgSUQgdG8gYWRkIHRoZSBjb250YWN0IHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3BhcmFtZXRlcnMub25TdWNjZXNzXSAtIEEgY2FsbGJhY2sgdG8gZXhlY3V0ZSBvbiBhIHN1Y2Nlc3NmdWwgYWpheCByZXF1ZXN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3BhcmFtZXRlcnMub25FcnJvcl0gLSBBIGNhbGxiYWNrIHRvIGV4ZWN1dGUgb24gYW4gZXJyb3IuXG4gKi9cblRleHRSZXZhbXBDbGllbnQucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHBob25lTnVtYmVyLCBwYXJhbWV0ZXJzKSB7XG5cdHZhciBwYXJhbXMgPSB0eXBlb2YgcGFyYW1ldGVycyA9PT0gJ29iamVjdCcgPyBwYXJhbWV0ZXJzIDoge307XG5cdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9wZW4oJ1BPU1QnLCB0aGlzLmJhc2VQYXRoICsgJy9hcGkvdjEvY29udGFjdHMnKTtcblx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicgKTtcblx0dmFyIGRhdGEgPSB7fTtcblx0ZGF0YS5jb21wYW55X2lkID0gdGhpcy5jb21wYW55SWQ7XG5cdGRhdGEucGhvbmUgPSBwaG9uZU51bWJlcjtcblx0ZGF0YS5maXJzdF9uYW1lID0gcGFyYW1zLmZpcnN0X25hbWU7XG5cdGRhdGEubGFzdF9uYW1lID0gcGFyYW1zLmxhc3RfbmFtZTtcblx0ZGF0YS5mb2xkZXJfaWQgPSBwYXJhbXMuZ3JvdXBfaWQ7XG5cblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcblx0XHRcdGlmKHR5cGVvZiBwYXJhbXMub25TdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHBhcmFtcy5vblN1Y2Nlc3MoeGhyLnJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYodHlwZW9mIHBhcmFtcy5vbkVycm9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHBhcmFtcy5vbkVycm9yKHhoci5yZXNwb25zZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRSZXZhbXBDbGllbnQ7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3RleHQtcmV2YW1wLWNsaWVudC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ })
/******/ ]);
});