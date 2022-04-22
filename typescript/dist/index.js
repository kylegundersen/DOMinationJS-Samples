(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/domination-js/dist/esm/index.js":
/*!*******************************************************!*\
  !*** ../node_modules/domination-js/dist/esm/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOM": () => (/* binding */ DOM)
/* harmony export */ });
/**
 * Document Object Model - helper functions
 * Helps you interact with the DOM safely and easily.
 *
 */
class DOM {
    /**
     * Adds an event listener that follows the event delegation pattern. The advantage is that you can add
     * elements at any depth inside the parent container without having to worry about the event being
     * applied. This solves having to add, remove, and manage events per element.
     * @param type - Event type, example: click, dblclick, mouseover, ect..
     * @param selector - Same as query selector. Element class denoted with period, id denoted with #, or element name.
     * @param callback - A callback function to perform when the event is triggered.
     * @param useCapture - Optionally use capture instead of event bubbling.
     * @param parent - Optionally where to add the listener. Defaults to the document.
     *
     * ```javascript
     *
     * // Example 1 - Adds click to ID unique-id inside of document.
     * DOM.addEventDelegate('click', "#unique-id", () => { console.log("FIRE!") });
     *
     * // Example 2 - Adds click to class .btn inside of document.
     * DOM.addEventDelegate('click', ".btn", () => { console.log("FIRE!") });
     *
     * // Example 3 - Adds click to button elements inside window via capture.
     * DOM.addEventDelegate('click', "button", () => { console.log("FIRE!") }, true, window);
     *
     *
     * ```
     */
    static addEventDelegate(type, selector, callback, useCapture = false, parent = document) {
        parent.addEventListener(type, (e) => {
            if (e.target.matches(selector))
                callback(e);
        }, useCapture);
    }
    /**
     * Create a complex DOM element with a single funciton.
     * @param element - Standard HTML element. Example: div, span, input, button, ect...
     * @param attributes - (Optional) Pass an object using this pattern. **{ attributeName : value }**.
     * - ```text``` You are able to pass a string as textContent.
     * - ```append``` Pass an element/node, or an array of elements/nodes to append.
     * - ```html``` You are able to pass a string as HTML. **Do not pass user changable data for obvious security reasons!**
     * - ```class``` You are able to pass multiple classes using a space as the delimiter.
     * @param events - (Optional) Pass an object using this pattern to add events. **{ eventType: callback }**. The eventType consists of standard javascript events.
     * @returns The new created element inferred from the ```element``` param.
     * ```javascript
     *
     * // Example 1 - <div id="unique-id" class="text-class"> Some call to action text! </div>
     * let newElement = DOM.create("div", { id: "unique-id", class: "text-class", text: "Some call to action text!"});
     *
     * // Example 2 - When clicked it prints out "Clicked!" to the console.
     * // <button id="unique-id-2" class="button-class">
     * //  <div id="unique-id" class="text-class"> Some call to action text! </div>
     * // </button>
     * DOM.create("button", { id: "unique-id-2", class: "button-class", text: newElement}, { click: () => console.log('Clicked!') });
     *
     *
     * ```
     */
    static create(element, attributes = null, events = null) {
        let elem = document.createElement(element);
        if (attributes !== null) {
            Object.keys(attributes).forEach(attributeName => {
                switch (attributeName) {
                    case "class":
                        (attributes[attributeName].trim().split(/\s+/)).forEach(attrClass => { elem.classList.add(attrClass); });
                        break;
                    case "text":
                    case "append":
                        if (typeof attributes[attributeName] === "string") {
                            elem.textContent = attributes[attributeName];
                        }
                        else {
                            if (attributes[attributeName].length) {
                                elem.append(...attributes[attributeName]);
                            }
                            else {
                                elem.append(attributes[attributeName]);
                            }
                        }
                        break;
                    case "html":
                        elem.innerHTML = attributes[attributeName];
                        break;
                    case "dataset":
                        Object.entries(attributes[attributeName]).forEach(([dataKey, dataValue]) => {
                            elem.dataset[dataKey] = dataValue;
                        });
                        break;
                    default: elem.setAttribute(attributeName, attributes[attributeName]);
                }
            });
        }
        if (events !== null) {
            let eventList = Object.keys(events);
            eventList.forEach(event => elem.addEventListener(event, events[event]));
        }
        return elem;
    }
    /**
     * Shorthand for the query selector
     * @param query - A query selector string, Example: ```".class"```
     * @param element - (Optional) Defaults to the document object
     * @return The first or only element
     */
    static select(query, parent = document) {
        return parent.querySelector(query);
    }
    /**
     * Shorthand for the query selector all with the added bonus of returning an array.
     * @param query - A query selector string, Example: ```".class"```
     * @param element - (Optional) Defaults to the document object
     * @return An array of elements
     */
    static selectAll(query, parent = document) {
        return Array.prototype.slice.call(parent.querySelectorAll(query));
    }
    /**
     * Detach and return an Element from the DOM
     * @param reference A query selector string or elem reference (Element, ect...)
     * @return The detached element
     */
    static detach(reference) {
        let elem = typeof reference === "string" ? this.select(reference) : reference;
        return elem.parentElement.removeChild(elem);
    }
    /**
     * Two-way data binding between an object's property and an Element's attribute.
     * @param object - The parent object where the property will be added.
     * @param objectProperty - Create a property that binds with an attribute.
     * @param element - The element or query selector of the element.
     * @param elementAttribute - The attribute to bind to the object's property.
     * ```javascript
     *
     * // Example - Binds Object Property "name" (dataObject.name) to an element's attribute value.
     * let dataObject = {};
     * DOM.bindAttribute(dataObject, "name", "#unique-id", 'value');
     *
     *
     * ```
     */
    static bindAttribute(object, objectProperty, element, elementAttribute) {
        let elem = typeof element === "string" ? this.select(element) : element;
        Object.defineProperty(object, objectProperty, {
            get() {
                return elem.getAttribute(elementAttribute);
            },
            set(value) {
                elem.setAttribute(elementAttribute, value);
            }
        });
    }
    /**
     * Get a route based on current location path name.
     * @param isArray - (Optional) This will return the path as an array ```['some', 'path', 'defined']```
     * otherwise it will default to a string ```'/some/path/defined'```.
     * @return - A string or array representing the current document.location.pathName
     *
     * ```javascript
     *
     * // Example 1 - Get path `/some/path/defined`
     * let currentRoute = DOM.getRoute();
     *
     * // Example 2 - Get path as array ['some', 'path', 'defined']
     * let currentRoute = DOM.getRoute(true);
     *
     * ```
     */
    static getRoute(isArray = false) {
        return isArray ? document.location.pathname.split("/").filter(n => n) : document.location.pathname;
    }
    /**
     * Get the routes query string as a string or an object
     * @param isObject - (Optional) Defaults to true and will return an object by default.
     * @return - A string or object representing the current document.location.search
     *
     * ```javascript
     *
     * // Example 1 - Get query string as object ```{ test : 1 }```
     * let currentRoute = DOM.getRouteData();
     *
     * // Example 2 - Get query string as string ```"?test=1"```
     * let currentRoute = DOM.getRouteData(false);
     *
     * ```
     */
    static getRouteData(isObject = true) {
        return isObject ? Object.fromEntries(new URLSearchParams(document.location.search)) : document.location.search;
    }
    /**
     * Set the browser url and update browser history without triggering a full page refresh.
     * @param route - The path location with an optional query string
     *
     * ```javascript
     *
     * // Example 1 - Set url localhost:4200/some/path/defined
     * DOM.setRoute('/some/path/defined');
     *
     * // Example 2 - Gets current route as array ['some', 'path', 'defined']
     * //             Sets new route localhost:4200/some/path/new
     * let currentRoute = DOM.getRoute(true);
     * DOM.setRoute(`/${currentRoute[0]}/${currentRoute[1]}/new`);
     *
     * ```
     */
    static setRoute(route) {
        window.history.pushState({}, "", route);
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/index-exposed.ts":
/*!******************************!*\
  !*** ./src/index-exposed.ts ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js!./index.ts */ "./node_modules/ts-loader/index.js!./src/index.ts");
var ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../node_modules/expose-loader/dist/runtime/getGlobalThis.js */ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js");
var ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;
___EXPOSE_LOADER_GLOBAL_THIS___["DOM"] = ___EXPOSE_LOADER_IMPORT___;
module.exports = ___EXPOSE_LOADER_IMPORT___;


/***/ }),

/***/ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js":
/*!******************************************************************!*\
  !*** ./node_modules/expose-loader/dist/runtime/getGlobalThis.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// eslint-disable-next-line func-names
module.exports = function () {
  if (typeof globalThis === "object") {
    return globalThis;
  }

  var g;

  try {
    // This works if eval is allowed (see CSP)
    // eslint-disable-next-line no-new-func
    g = this || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if (typeof window === "object") {
      return window;
    } // This works if the self reference is available


    if (typeof self === "object") {
      return self;
    } // This works if the global reference is available


    if (typeof __webpack_require__.g !== "undefined") {
      return __webpack_require__.g;
    }
  }

  return g;
}();

/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/index.ts":
/*!********************************************************!*\
  !*** ./node_modules/ts-loader/index.js!./src/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var domination_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! domination-js */ "../node_modules/domination-js/dist/esm/index.js");

let backButton = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('button', { class: "header", text: "Back to index" }, {
    click: () => {
        document.location = "http://localhost:3000/";
    }
});
let header = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('div', { class: "header", style: "padding:20px;width:100%;background:#cFF", text: backButton });
/**
 * Backing building and triggering events
 *
 */
let newElement = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('h1', { class: "title", text: "TypeScript Event Sample" });
let newDesc = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("p", { text: "Hello, click the button to see how events work." });
let newButton = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("button", { class: "class-1 class-2", id: 'unique-guid', text: 'Click button to test' }, {
    click: () => {
        eventSectionContainer.append(domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("p", { text: "Button Clicked!", style: "padding:5px 20px;" }));
    }
});
let eventSectionContainer = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('div', { style: "padding:20px;", append: [newElement, newDesc, newButton] });
/**
 * Routing pattern
 *
 */
// Routing - Dom Build
let routerTitle = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('h1', { class: "title", text: "Basic Routing Sample" });
let routerButton1 = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("button", { routeLink: "/typescript/index.html", text: "Goto Route /typescript/index.html", style: "margin-left:10px" });
let routerButton2 = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("button", { routeLink: "/some/path", text: "Goto Route /some/path", style: "margin-left:10px" });
let routeContainer1 = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('div', { style: "padding:20px;background:#f0e8ca;margin-top:10px", routeShow: "/some/path", text: `Show when on "/some/path" route` });
let routeContainer2 = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('div', { style: "padding:20px;background:#cae3f0;margin-top:10px", routeShow: "/typescript/index.html", text: `Show when on "/typescript/index.html" route` });
let routerSectionContainer = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('div', { style: "padding:20px;", append: [routerTitle, routerButton1, routerButton2, routeContainer1, routeContainer2] });
// Delegate SPA links
domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.addEventDelegate('click', '[routeLink]', (e) => {
    let element = e.target;
    domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.setRoute(element.getAttribute('routeLink'));
    render(); // Rerender view Elements
});
// Delegate SPA Routes
function renderRouteViews() {
    let currentRoute = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.getRoute();
    // Adding the routeShow attribute on an html element will show it on a matching route
    let routeViews = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.selectAll('[routeShow]');
    routeViews.forEach((element) => {
        element.style.display = currentRoute.includes(element.getAttribute('routeShow')) ? 'flex' : 'none';
    });
    // Adding the routeHide attribute on an html element will hide it on a matching route
    routeViews = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.selectAll('[routeHide]');
    routeViews.forEach((element) => {
        element.style.display = currentRoute.includes(element.getAttribute('routeHide')) ? 'none' : 'flex';
    });
}
/**
 *  Render Pipeline this will be triggered in the following ways
 *  - Once on every first load
 *  - Once on every internal page route event by click on a [routeLink]
 */
function render() {
    renderRouteViews();
}
// Add constructed elements to the page
document.body.append(header, eventSectionContainer, routerSectionContainer);
document.body.style.margin = "0";
render(); // Fire it once to render intial view


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index-exposed.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2RvbWluYXRpb24tanMvLi4vbm9kZV9tb2R1bGVzL2RvbWluYXRpb24tanMvZGlzdC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy8uL3NyYy9pbmRleC1leHBvc2VkLnRzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qcyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyoqXHJcbiAqIERvY3VtZW50IE9iamVjdCBNb2RlbCAtIGhlbHBlciBmdW5jdGlvbnNcclxuICogSGVscHMgeW91IGludGVyYWN0IHdpdGggdGhlIERPTSBzYWZlbHkgYW5kIGVhc2lseS5cclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBET00ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgZm9sbG93cyB0aGUgZXZlbnQgZGVsZWdhdGlvbiBwYXR0ZXJuLiBUaGUgYWR2YW50YWdlIGlzIHRoYXQgeW91IGNhbiBhZGRcclxuICAgICAqIGVsZW1lbnRzIGF0IGFueSBkZXB0aCBpbnNpZGUgdGhlIHBhcmVudCBjb250YWluZXIgd2l0aG91dCBoYXZpbmcgdG8gd29ycnkgYWJvdXQgdGhlIGV2ZW50IGJlaW5nXHJcbiAgICAgKiBhcHBsaWVkLiBUaGlzIHNvbHZlcyBoYXZpbmcgdG8gYWRkLCByZW1vdmUsIGFuZCBtYW5hZ2UgZXZlbnRzIHBlciBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIHR5cGUgLSBFdmVudCB0eXBlLCBleGFtcGxlOiBjbGljaywgZGJsY2xpY2ssIG1vdXNlb3ZlciwgZWN0Li5cclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciAtIFNhbWUgYXMgcXVlcnkgc2VsZWN0b3IuIEVsZW1lbnQgY2xhc3MgZGVub3RlZCB3aXRoIHBlcmlvZCwgaWQgZGVub3RlZCB3aXRoICMsIG9yIGVsZW1lbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcGVyZm9ybSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgKiBAcGFyYW0gdXNlQ2FwdHVyZSAtIE9wdGlvbmFsbHkgdXNlIGNhcHR1cmUgaW5zdGVhZCBvZiBldmVudCBidWJibGluZy5cclxuICAgICAqIEBwYXJhbSBwYXJlbnQgLSBPcHRpb25hbGx5IHdoZXJlIHRvIGFkZCB0aGUgbGlzdGVuZXIuIERlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cclxuICAgICAqXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKlxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gQWRkcyBjbGljayB0byBJRCB1bmlxdWUtaWQgaW5zaWRlIG9mIGRvY3VtZW50LlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCIjdW5pcXVlLWlkXCIsICgpID0+IHsgY29uc29sZS5sb2coXCJGSVJFIVwiKSB9KTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBBZGRzIGNsaWNrIHRvIGNsYXNzIC5idG4gaW5zaWRlIG9mIGRvY3VtZW50LlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCIuYnRuXCIsICgpID0+IHsgY29uc29sZS5sb2coXCJGSVJFIVwiKSB9KTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDMgLSBBZGRzIGNsaWNrIHRvIGJ1dHRvbiBlbGVtZW50cyBpbnNpZGUgd2luZG93IHZpYSBjYXB0dXJlLlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCJidXR0b25cIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0sIHRydWUsIHdpbmRvdyk7XHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRkRXZlbnREZWxlZ2F0ZSh0eXBlLCBzZWxlY3RvciwgY2FsbGJhY2ssIHVzZUNhcHR1cmUgPSBmYWxzZSwgcGFyZW50ID0gZG9jdW1lbnQpIHtcclxuICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQubWF0Y2hlcyhzZWxlY3RvcikpXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlKTtcclxuICAgICAgICB9LCB1c2VDYXB0dXJlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgY29tcGxleCBET00gZWxlbWVudCB3aXRoIGEgc2luZ2xlIGZ1bmNpdG9uLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLSBTdGFuZGFyZCBIVE1MIGVsZW1lbnQuIEV4YW1wbGU6IGRpdiwgc3BhbiwgaW5wdXQsIGJ1dHRvbiwgZWN0Li4uXHJcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlcyAtIChPcHRpb25hbCkgUGFzcyBhbiBvYmplY3QgdXNpbmcgdGhpcyBwYXR0ZXJuLiAqKnsgYXR0cmlidXRlTmFtZSA6IHZhbHVlIH0qKi5cclxuICAgICAqIC0gYGBgdGV4dGBgYCBZb3UgYXJlIGFibGUgdG8gcGFzcyBhIHN0cmluZyBhcyB0ZXh0Q29udGVudC5cclxuICAgICAqIC0gYGBgYXBwZW5kYGBgIFBhc3MgYW4gZWxlbWVudC9ub2RlLCBvciBhbiBhcnJheSBvZiBlbGVtZW50cy9ub2RlcyB0byBhcHBlbmQuXHJcbiAgICAgKiAtIGBgYGh0bWxgYGAgWW91IGFyZSBhYmxlIHRvIHBhc3MgYSBzdHJpbmcgYXMgSFRNTC4gKipEbyBub3QgcGFzcyB1c2VyIGNoYW5nYWJsZSBkYXRhIGZvciBvYnZpb3VzIHNlY3VyaXR5IHJlYXNvbnMhKipcclxuICAgICAqIC0gYGBgY2xhc3NgYGAgWW91IGFyZSBhYmxlIHRvIHBhc3MgbXVsdGlwbGUgY2xhc3NlcyB1c2luZyBhIHNwYWNlIGFzIHRoZSBkZWxpbWl0ZXIuXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRzIC0gKE9wdGlvbmFsKSBQYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4gdG8gYWRkIGV2ZW50cy4gKip7IGV2ZW50VHlwZTogY2FsbGJhY2sgfSoqLiBUaGUgZXZlbnRUeXBlIGNvbnNpc3RzIG9mIHN0YW5kYXJkIGphdmFzY3JpcHQgZXZlbnRzLlxyXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBjcmVhdGVkIGVsZW1lbnQgaW5mZXJyZWQgZnJvbSB0aGUgYGBgZWxlbWVudGBgYCBwYXJhbS5cclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDEgLSA8ZGl2IGlkPVwidW5pcXVlLWlkXCIgY2xhc3M9XCJ0ZXh0LWNsYXNzXCI+IFNvbWUgY2FsbCB0byBhY3Rpb24gdGV4dCEgPC9kaXY+XHJcbiAgICAgKiBsZXQgbmV3RWxlbWVudCA9IERPTS5jcmVhdGUoXCJkaXZcIiwgeyBpZDogXCJ1bmlxdWUtaWRcIiwgY2xhc3M6IFwidGV4dC1jbGFzc1wiLCB0ZXh0OiBcIlNvbWUgY2FsbCB0byBhY3Rpb24gdGV4dCFcIn0pO1xyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIFdoZW4gY2xpY2tlZCBpdCBwcmludHMgb3V0IFwiQ2xpY2tlZCFcIiB0byB0aGUgY29uc29sZS5cclxuICAgICAqIC8vIDxidXR0b24gaWQ9XCJ1bmlxdWUtaWQtMlwiIGNsYXNzPVwiYnV0dG9uLWNsYXNzXCI+XHJcbiAgICAgKiAvLyAgPGRpdiBpZD1cInVuaXF1ZS1pZFwiIGNsYXNzPVwidGV4dC1jbGFzc1wiPiBTb21lIGNhbGwgdG8gYWN0aW9uIHRleHQhIDwvZGl2PlxyXG4gICAgICogLy8gPC9idXR0b24+XHJcbiAgICAgKiBET00uY3JlYXRlKFwiYnV0dG9uXCIsIHsgaWQ6IFwidW5pcXVlLWlkLTJcIiwgY2xhc3M6IFwiYnV0dG9uLWNsYXNzXCIsIHRleHQ6IG5ld0VsZW1lbnR9LCB7IGNsaWNrOiAoKSA9PiBjb25zb2xlLmxvZygnQ2xpY2tlZCEnKSB9KTtcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoZWxlbWVudCwgYXR0cmlidXRlcyA9IG51bGwsIGV2ZW50cyA9IG51bGwpIHtcclxuICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVOYW1lID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXS50cmltKCkuc3BsaXQoL1xccysvKSkuZm9yRWFjaChhdHRyQ2xhc3MgPT4geyBlbGVtLmNsYXNzTGlzdC5hZGQoYXR0ckNsYXNzKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGVuZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hcHBlbmQoLi4uYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFwcGVuZChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaHRtbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRhc2V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pLmZvckVhY2goKFtkYXRhS2V5LCBkYXRhVmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmRhdGFzZXRbZGF0YUtleV0gPSBkYXRhVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBlbGVtLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50TGlzdCA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XHJcbiAgICAgICAgICAgIGV2ZW50TGlzdC5mb3JFYWNoKGV2ZW50ID0+IGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRzW2V2ZW50XSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRoYW5kIGZvciB0aGUgcXVlcnkgc2VsZWN0b3JcclxuICAgICAqIEBwYXJhbSBxdWVyeSAtIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nLCBFeGFtcGxlOiBgYGBcIi5jbGFzc1wiYGBgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIChPcHRpb25hbCkgRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBUaGUgZmlyc3Qgb3Igb25seSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZWxlY3QocXVlcnksIHBhcmVudCA9IGRvY3VtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRoYW5kIGZvciB0aGUgcXVlcnkgc2VsZWN0b3IgYWxsIHdpdGggdGhlIGFkZGVkIGJvbnVzIG9mIHJldHVybmluZyBhbiBhcnJheS5cclxuICAgICAqIEBwYXJhbSBxdWVyeSAtIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nLCBFeGFtcGxlOiBgYGBcIi5jbGFzc1wiYGBgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIChPcHRpb25hbCkgRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBBbiBhcnJheSBvZiBlbGVtZW50c1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2VsZWN0QWxsKHF1ZXJ5LCBwYXJlbnQgPSBkb2N1bWVudCkge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2ggYW5kIHJldHVybiBhbiBFbGVtZW50IGZyb20gdGhlIERPTVxyXG4gICAgICogQHBhcmFtIHJlZmVyZW5jZSBBIHF1ZXJ5IHNlbGVjdG9yIHN0cmluZyBvciBlbGVtIHJlZmVyZW5jZSAoRWxlbWVudCwgZWN0Li4uKVxyXG4gICAgICogQHJldHVybiBUaGUgZGV0YWNoZWQgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGV0YWNoKHJlZmVyZW5jZSkge1xyXG4gICAgICAgIGxldCBlbGVtID0gdHlwZW9mIHJlZmVyZW5jZSA9PT0gXCJzdHJpbmdcIiA/IHRoaXMuc2VsZWN0KHJlZmVyZW5jZSkgOiByZWZlcmVuY2U7XHJcbiAgICAgICAgcmV0dXJuIGVsZW0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVHdvLXdheSBkYXRhIGJpbmRpbmcgYmV0d2VlbiBhbiBvYmplY3QncyBwcm9wZXJ0eSBhbmQgYW4gRWxlbWVudCdzIGF0dHJpYnV0ZS5cclxuICAgICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgcGFyZW50IG9iamVjdCB3aGVyZSB0aGUgcHJvcGVydHkgd2lsbCBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSBvYmplY3RQcm9wZXJ0eSAtIENyZWF0ZSBhIHByb3BlcnR5IHRoYXQgYmluZHMgd2l0aCBhbiBhdHRyaWJ1dGUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIFRoZSBlbGVtZW50IG9yIHF1ZXJ5IHNlbGVjdG9yIG9mIHRoZSBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRBdHRyaWJ1dGUgLSBUaGUgYXR0cmlidXRlIHRvIGJpbmQgdG8gdGhlIG9iamVjdCdzIHByb3BlcnR5LlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgLSBCaW5kcyBPYmplY3QgUHJvcGVydHkgXCJuYW1lXCIgKGRhdGFPYmplY3QubmFtZSkgdG8gYW4gZWxlbWVudCdzIGF0dHJpYnV0ZSB2YWx1ZS5cclxuICAgICAqIGxldCBkYXRhT2JqZWN0ID0ge307XHJcbiAgICAgKiBET00uYmluZEF0dHJpYnV0ZShkYXRhT2JqZWN0LCBcIm5hbWVcIiwgXCIjdW5pcXVlLWlkXCIsICd2YWx1ZScpO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRBdHRyaWJ1dGUob2JqZWN0LCBvYmplY3RQcm9wZXJ0eSwgZWxlbWVudCwgZWxlbWVudEF0dHJpYnV0ZSkge1xyXG4gICAgICAgIGxldCBlbGVtID0gdHlwZW9mIGVsZW1lbnQgPT09IFwic3RyaW5nXCIgPyB0aGlzLnNlbGVjdChlbGVtZW50KSA6IGVsZW1lbnQ7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgb2JqZWN0UHJvcGVydHksIHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKGVsZW1lbnRBdHRyaWJ1dGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGVsZW1lbnRBdHRyaWJ1dGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSByb3V0ZSBiYXNlZCBvbiBjdXJyZW50IGxvY2F0aW9uIHBhdGggbmFtZS5cclxuICAgICAqIEBwYXJhbSBpc0FycmF5IC0gKE9wdGlvbmFsKSBUaGlzIHdpbGwgcmV0dXJuIHRoZSBwYXRoIGFzIGFuIGFycmF5IGBgYFsnc29tZScsICdwYXRoJywgJ2RlZmluZWQnXWBgYFxyXG4gICAgICogb3RoZXJ3aXNlIGl0IHdpbGwgZGVmYXVsdCB0byBhIHN0cmluZyBgYGAnL3NvbWUvcGF0aC9kZWZpbmVkJ2BgYC5cclxuICAgICAqIEByZXR1cm4gLSBBIHN0cmluZyBvciBhcnJheSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgZG9jdW1lbnQubG9jYXRpb24ucGF0aE5hbWVcclxuICAgICAqXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKlxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gR2V0IHBhdGggYC9zb21lL3BhdGgvZGVmaW5lZGBcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUoKTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBHZXQgcGF0aCBhcyBhcnJheSBbJ3NvbWUnLCAncGF0aCcsICdkZWZpbmVkJ11cclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUodHJ1ZSk7XHJcbiAgICAgKlxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRSb3V0ZShpc0FycmF5ID0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gaXNBcnJheSA/IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIobiA9PiBuKSA6IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHJvdXRlcyBxdWVyeSBzdHJpbmcgYXMgYSBzdHJpbmcgb3IgYW4gb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gaXNPYmplY3QgLSAoT3B0aW9uYWwpIERlZmF1bHRzIHRvIHRydWUgYW5kIHdpbGwgcmV0dXJuIGFuIG9iamVjdCBieSBkZWZhdWx0LlxyXG4gICAgICogQHJldHVybiAtIEEgc3RyaW5nIG9yIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoXHJcbiAgICAgKlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIEdldCBxdWVyeSBzdHJpbmcgYXMgb2JqZWN0IGBgYHsgdGVzdCA6IDEgfWBgYFxyXG4gICAgICogbGV0IGN1cnJlbnRSb3V0ZSA9IERPTS5nZXRSb3V0ZURhdGEoKTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBHZXQgcXVlcnkgc3RyaW5nIGFzIHN0cmluZyBgYGBcIj90ZXN0PTFcImBgYFxyXG4gICAgICogbGV0IGN1cnJlbnRSb3V0ZSA9IERPTS5nZXRSb3V0ZURhdGEoZmFsc2UpO1xyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0Um91dGVEYXRhKGlzT2JqZWN0ID0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBpc09iamVjdCA/IE9iamVjdC5mcm9tRW50cmllcyhuZXcgVVJMU2VhcmNoUGFyYW1zKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCkpIDogZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGJyb3dzZXIgdXJsIGFuZCB1cGRhdGUgYnJvd3NlciBoaXN0b3J5IHdpdGhvdXQgdHJpZ2dlcmluZyBhIGZ1bGwgcGFnZSByZWZyZXNoLlxyXG4gICAgICogQHBhcmFtIHJvdXRlIC0gVGhlIHBhdGggbG9jYXRpb24gd2l0aCBhbiBvcHRpb25hbCBxdWVyeSBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKlxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gU2V0IHVybCBsb2NhbGhvc3Q6NDIwMC9zb21lL3BhdGgvZGVmaW5lZFxyXG4gICAgICogRE9NLnNldFJvdXRlKCcvc29tZS9wYXRoL2RlZmluZWQnKTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBHZXRzIGN1cnJlbnQgcm91dGUgYXMgYXJyYXkgWydzb21lJywgJ3BhdGgnLCAnZGVmaW5lZCddXHJcbiAgICAgKiAvLyAgICAgICAgICAgICBTZXRzIG5ldyByb3V0ZSBsb2NhbGhvc3Q6NDIwMC9zb21lL3BhdGgvbmV3XHJcbiAgICAgKiBsZXQgY3VycmVudFJvdXRlID0gRE9NLmdldFJvdXRlKHRydWUpO1xyXG4gICAgICogRE9NLnNldFJvdXRlKGAvJHtjdXJyZW50Um91dGVbMF19LyR7Y3VycmVudFJvdXRlWzFdfS9uZXdgKTtcclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldFJvdXRlKHJvdXRlKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCByb3V0ZSk7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJET01cIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgfVxuXG4gIHZhciBnO1xuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgZyA9IHRoaXMgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBzZWxmIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIGdsb2JhbCByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnO1xufSgpOyIsImltcG9ydCB7IERPTSB9IGZyb20gXCJkb21pbmF0aW9uLWpzXCI7XHJcblxyXG5sZXQgYmFja0J1dHRvbiA9IERPTS5jcmVhdGUoJ2J1dHRvbicsIHsgY2xhc3M6IFwiaGVhZGVyXCIsIHRleHQ6IFwiQmFjayB0byBpbmRleFwiIH0sIFxyXG57XHJcbiAgICBjbGljayA6ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmxvY2F0aW9uID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvXCI7XHJcbiAgICB9XHJcbn0pOyBcclxubGV0IGhlYWRlciA9IERPTS5jcmVhdGUoJ2RpdicsIHsgY2xhc3M6IFwiaGVhZGVyXCIsIHN0eWxlOiBcInBhZGRpbmc6MjBweDt3aWR0aDoxMDAlO2JhY2tncm91bmQ6I2NGRlwiLCB0ZXh0OiBiYWNrQnV0dG9uIH0pO1xyXG5cclxuLyoqXHJcbiAqIEJhY2tpbmcgYnVpbGRpbmcgYW5kIHRyaWdnZXJpbmcgZXZlbnRzXHJcbiAqIFxyXG4gKi9cclxubGV0IG5ld0VsZW1lbnQgPSBET00uY3JlYXRlKCdoMScsIHsgY2xhc3M6IFwidGl0bGVcIiwgdGV4dDogXCJUeXBlU2NyaXB0IEV2ZW50IFNhbXBsZVwiIH0pO1xyXG5sZXQgbmV3RGVzYyA9IERPTS5jcmVhdGUoXCJwXCIsIHsgdGV4dDogXCJIZWxsbywgY2xpY2sgdGhlIGJ1dHRvbiB0byBzZWUgaG93IGV2ZW50cyB3b3JrLlwiIH0pO1xyXG5sZXQgbmV3QnV0dG9uID0gRE9NLmNyZWF0ZShcImJ1dHRvblwiLCB7IGNsYXNzOiBcImNsYXNzLTEgY2xhc3MtMlwiLCBpZDondW5pcXVlLWd1aWQnLCB0ZXh0OiAnQ2xpY2sgYnV0dG9uIHRvIHRlc3QnIH0sIHsgXHJcbiAgICBjbGljayA6ICgpID0+IHtcclxuICAgICAgICBldmVudFNlY3Rpb25Db250YWluZXIuYXBwZW5kKERPTS5jcmVhdGUoXCJwXCIsIHsgdGV4dDogXCJCdXR0b24gQ2xpY2tlZCFcIiwgc3R5bGU6IFwicGFkZGluZzo1cHggMjBweDtcIiB9KSk7XHJcbiAgICB9IH0pO1xyXG5sZXQgZXZlbnRTZWN0aW9uQ29udGFpbmVyID0gRE9NLmNyZWF0ZSgnZGl2JywgeyBzdHlsZTogXCJwYWRkaW5nOjIwcHg7XCIsIGFwcGVuZDogW25ld0VsZW1lbnQsIG5ld0Rlc2MsIG5ld0J1dHRvbl0gfSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJvdXRpbmcgcGF0dGVyblxyXG4gKiBcclxuICovXHJcblxyXG4vLyBSb3V0aW5nIC0gRG9tIEJ1aWxkXHJcbmxldCByb3V0ZXJUaXRsZSA9IERPTS5jcmVhdGUoJ2gxJywgeyBjbGFzczogXCJ0aXRsZVwiLCB0ZXh0OiBcIkJhc2ljIFJvdXRpbmcgU2FtcGxlXCIgfSk7XHJcbmxldCByb3V0ZXJCdXR0b24xID0gRE9NLmNyZWF0ZShcImJ1dHRvblwiLCB7IHJvdXRlTGluazogXCIvdHlwZXNjcmlwdC9pbmRleC5odG1sXCIsIHRleHQ6IFwiR290byBSb3V0ZSAvdHlwZXNjcmlwdC9pbmRleC5odG1sXCIsIHN0eWxlOiBcIm1hcmdpbi1sZWZ0OjEwcHhcIiB9KTtcclxubGV0IHJvdXRlckJ1dHRvbjIgPSBET00uY3JlYXRlKFwiYnV0dG9uXCIsIHsgcm91dGVMaW5rOiBcIi9zb21lL3BhdGhcIiwgdGV4dDogXCJHb3RvIFJvdXRlIC9zb21lL3BhdGhcIiwgc3R5bGU6IFwibWFyZ2luLWxlZnQ6MTBweFwiIH0pO1xyXG5sZXQgcm91dGVDb250YWluZXIxID0gRE9NLmNyZWF0ZSgnZGl2JywgeyBzdHlsZTogXCJwYWRkaW5nOjIwcHg7YmFja2dyb3VuZDojZjBlOGNhO21hcmdpbi10b3A6MTBweFwiLCByb3V0ZVNob3c6IFwiL3NvbWUvcGF0aFwiLCB0ZXh0OiBgU2hvdyB3aGVuIG9uIFwiL3NvbWUvcGF0aFwiIHJvdXRlYCB9KTtcclxubGV0IHJvdXRlQ29udGFpbmVyMiA9IERPTS5jcmVhdGUoJ2RpdicsIHsgc3R5bGU6IFwicGFkZGluZzoyMHB4O2JhY2tncm91bmQ6I2NhZTNmMDttYXJnaW4tdG9wOjEwcHhcIiwgcm91dGVTaG93OiBcIi90eXBlc2NyaXB0L2luZGV4Lmh0bWxcIiwgdGV4dDogYFNob3cgd2hlbiBvbiBcIi90eXBlc2NyaXB0L2luZGV4Lmh0bWxcIiByb3V0ZWAgfSk7XHJcbmxldCByb3V0ZXJTZWN0aW9uQ29udGFpbmVyID0gRE9NLmNyZWF0ZSgnZGl2JywgeyBzdHlsZTogXCJwYWRkaW5nOjIwcHg7XCIsIGFwcGVuZDogW3JvdXRlclRpdGxlLCByb3V0ZXJCdXR0b24xLCByb3V0ZXJCdXR0b24yLCByb3V0ZUNvbnRhaW5lcjEsIHJvdXRlQ29udGFpbmVyMl0gfSk7XHJcblxyXG4vLyBEZWxlZ2F0ZSBTUEEgbGlua3NcclxuRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgJ1tyb3V0ZUxpbmtdJywgKGU6IFBvaW50ZXJFdmVudCkgPT4ge1xyXG4gICAgbGV0IGVsZW1lbnQgOiBIVE1MRWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgRE9NLnNldFJvdXRlKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb3V0ZUxpbmsnKSk7XHJcbiAgICByZW5kZXIoKTsgLy8gUmVyZW5kZXIgdmlldyBFbGVtZW50c1xyXG59KTtcclxuXHJcbi8vIERlbGVnYXRlIFNQQSBSb3V0ZXNcclxuZnVuY3Rpb24gcmVuZGVyUm91dGVWaWV3cygpe1xyXG4gICAgbGV0IGN1cnJlbnRSb3V0ZSA9IERPTS5nZXRSb3V0ZSgpO1xyXG4gICAgLy8gQWRkaW5nIHRoZSByb3V0ZVNob3cgYXR0cmlidXRlIG9uIGFuIGh0bWwgZWxlbWVudCB3aWxsIHNob3cgaXQgb24gYSBtYXRjaGluZyByb3V0ZVxyXG4gICAgbGV0IHJvdXRlVmlld3MgPSBET00uc2VsZWN0QWxsKCdbcm91dGVTaG93XScpO1xyXG4gICAgcm91dGVWaWV3cy5mb3JFYWNoKChlbGVtZW50OkhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gY3VycmVudFJvdXRlLmluY2x1ZGVzKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb3V0ZVNob3cnKSkgPyAnZmxleCcgOiAnbm9uZSc7XHJcbiAgICB9KTtcclxuICAgIC8vIEFkZGluZyB0aGUgcm91dGVIaWRlIGF0dHJpYnV0ZSBvbiBhbiBodG1sIGVsZW1lbnQgd2lsbCBoaWRlIGl0IG9uIGEgbWF0Y2hpbmcgcm91dGVcclxuICAgIHJvdXRlVmlld3MgPSBET00uc2VsZWN0QWxsKCdbcm91dGVIaWRlXScpO1xyXG4gICAgcm91dGVWaWV3cy5mb3JFYWNoKChlbGVtZW50OkhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gY3VycmVudFJvdXRlLmluY2x1ZGVzKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb3V0ZUhpZGUnKSkgPyAnbm9uZScgOiAnZmxleCc7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiAgUmVuZGVyIFBpcGVsaW5lIHRoaXMgd2lsbCBiZSB0cmlnZ2VyZWQgaW4gdGhlIGZvbGxvd2luZyB3YXlzXHJcbiAqICAtIE9uY2Ugb24gZXZlcnkgZmlyc3QgbG9hZFxyXG4gKiAgLSBPbmNlIG9uIGV2ZXJ5IGludGVybmFsIHBhZ2Ugcm91dGUgZXZlbnQgYnkgY2xpY2sgb24gYSBbcm91dGVMaW5rXSBcclxuICovXHJcbmZ1bmN0aW9uIHJlbmRlcigpe1xyXG4gICAgcmVuZGVyUm91dGVWaWV3cygpO1xyXG59XHJcblxyXG4vLyBBZGQgY29uc3RydWN0ZWQgZWxlbWVudHMgdG8gdGhlIHBhZ2VcclxuZG9jdW1lbnQuYm9keS5hcHBlbmQoXHJcbiAgICBoZWFkZXIsIFxyXG4gICAgZXZlbnRTZWN0aW9uQ29udGFpbmVyLFxyXG4gICAgcm91dGVyU2VjdGlvbkNvbnRhaW5lclxyXG4gICAgKTtcclxuZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gPSBcIjBcIjtcclxucmVuZGVyKCk7IC8vIEZpcmUgaXQgb25jZSB0byByZW5kZXIgaW50aWFsIHZpZXciLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgtZXhwb3NlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==