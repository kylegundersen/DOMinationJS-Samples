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
     * @param attributes - Pass an object using this pattern. **{ attributeName : value }**.
     * - ```text``` You are able to pass a string as textContent or pass an Element/node to append.
     * - ```class``` You are able to pass multiple classes using a space as the delimiter.
     * @param events - Optionally pass an object using this pattern to add events. **{ eventType: callback }**. The eventType consists of standard javascript events.
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
                        if (typeof attributes[attributeName] === "string") {
                            elem.textContent = attributes[attributeName];
                        }
                        else {
                            elem.append(attributes[attributeName]);
                        }
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
     * @param element - Defaults to the document object
     * @return The first or only element
     */
    static select(query, parent = document) {
        return parent.querySelector(query);
    }
    /**
     * Shorthand for the query selector all with the added bonus of returning an array.
     * @param query - A query selector string, Example: ```".class"```
     * @param element - Defaults to the document object
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
     * Get a route based on current path. This is great for making a SPA with deep-linking.
     * @param isArray - This will return the path as an array ```['some', 'path', 'defined']```
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
     * Set a route based on path. This is great for making a SPA with deep-linking.
     * @param route - The path you want to navigate without refreshing the view.
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
let newElement = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('h1', { class: "title", text: "TypeScript Sample" });
let newDesc = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("p", { text: "Hello, click the button to see how events work." });
let newButton = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("button", { class: "class-1 class-2", id: 'unique-guid', text: 'Click button to test' }, {
    click: () => {
        container.append(domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("p", { text: "Button Clicked!", style: "padding:5px 20px;" }));
    }
});
let container = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('div', { style: "padding:20px;" });
container.append(newElement, newDesc, newButton);
document.body.append(header, container);
document.body.style.margin = "0";
/* Routing pattern */
let routerButton1 = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("button", { "goto-route": "/typescript/index.html", text: "Goto Route /typescript/index.html", style: "margin-left:10px" });
let routerButton2 = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create("button", { "goto-route": "/some/path", text: "Goto Route /some/path", style: "margin-left:10px" });
let routeContainer1 = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.create('div', { style: "padding:20px;background:#f0e8ca", route: "/some/path", text: `Show when on "/some/path" route` });
container.append(routerButton1, routerButton2, routeContainer1);
// Delegate SPA links
domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.addEventDelegate('click', '[goto-route]', (e) => {
    let element = e.target;
    domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.setRoute(element.getAttribute('goto-route'));
    render();
});
render();
function render() {
    let routeControlledViews = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.selectAll('[route]');
    let currentRoute = domination_js__WEBPACK_IMPORTED_MODULE_0__.DOM.getRoute();
    routeControlledViews.forEach((element) => {
        if (currentRoute.includes(element.getAttribute('route'))) {
            element.style.display = 'flex';
        }
        else {
            element.style.display = 'none';
        }
    });
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsc0JBQXNCO0FBQ2pGO0FBQ0E7QUFDQSxxREFBcUQsc0JBQXNCO0FBQzNFO0FBQ0E7QUFDQSx1REFBdUQsc0JBQXNCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsdUJBQXVCO0FBQ3pGO0FBQ0E7QUFDQSx1RkFBdUYscUJBQXFCO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHdFQUF3RTtBQUNwSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDJEQUEyRCxJQUFJLHNDQUFzQztBQUNuSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtGQUErRixnQ0FBZ0M7QUFDL0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCLEdBQUcsZ0JBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3JMQSxpQ0FBaUMsbUJBQU8sQ0FBQyx5R0FBaUQ7QUFDMUYsMENBQTBDLG1CQUFPLENBQUMsK0hBQTZEO0FBQy9HO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNOzs7QUFHTjtBQUNBO0FBQ0EsTUFBTTs7O0FBR04sZUFBZSxxQkFBTTtBQUNyQixhQUFhLHFCQUFNO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDaENtQztBQUVwQyxJQUFJLFVBQVUsR0FBRyxxREFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUNoRjtJQUNJLEtBQUssRUFBRyxHQUFHLEVBQUU7UUFDYixRQUFRLENBQUMsUUFBUSxHQUFHLHdCQUF3QixDQUFDO0lBQzdDLENBQUM7Q0FDSixDQUFDLENBQUM7QUFDSCxJQUFJLE1BQU0sR0FBRyxxREFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLHlDQUF5QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ3hILElBQUksVUFBVSxHQUFHLHFEQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0FBQ2pGLElBQUksT0FBTyxHQUFHLHFEQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlEQUFpRCxFQUFFLENBQUMsQ0FBQztBQUMzRixJQUFJLFNBQVMsR0FBRyxxREFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxFQUFFO0lBQy9HLEtBQUssRUFBRyxHQUFHLEVBQUU7UUFDVCxTQUFTLENBQUMsTUFBTSxDQUFDLHFEQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0NBQUUsQ0FBQyxDQUFDO0FBQ1QsSUFBSSxTQUFTLEdBQUcscURBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUM5RCxTQUFTLENBQUMsTUFBTSxDQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFFLENBQUM7QUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFFakMscUJBQXFCO0FBQ3JCLElBQUksYUFBYSxHQUFHLHFEQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFDLHdCQUF3QixFQUFFLElBQUksRUFBRSxtQ0FBbUMsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0FBQzFKLElBQUksYUFBYSxHQUFHLHFEQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztBQUNsSSxJQUFJLGVBQWUsR0FBRyxxREFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxpQ0FBaUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxDQUFDLENBQUM7QUFDcEosU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRWhFLHFCQUFxQjtBQUNyQiwrREFBb0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBZSxFQUFFLEVBQUU7SUFDOUQsSUFBSSxPQUFPLEdBQWlCLENBQUMsQ0FBQyxNQUFxQixDQUFDO0lBQ3BELHVEQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sRUFBRSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLEVBQUUsQ0FBQztBQUNULFNBQVMsTUFBTTtJQUNYLElBQUksb0JBQW9CLEdBQUcsd0RBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRCxJQUFJLFlBQVksR0FBRyx1REFBWSxFQUFFLENBQUM7SUFDbEMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBbUIsRUFBRSxFQUFFO1FBQ2xELElBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUM7WUFDcEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ2xDO2FBQU07WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDbkM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7Ozs7Ozs7VUM1Q0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzLy4uL25vZGVfbW9kdWxlcy9kb21pbmF0aW9uLWpzL2Rpc3QvZXNtL2luZGV4LmpzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvLi9zcmMvaW5kZXgtZXhwb3NlZC50cyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzLy4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsIi8qKlxyXG4gKiBEb2N1bWVudCBPYmplY3QgTW9kZWwgLSBoZWxwZXIgZnVuY3Rpb25zXHJcbiAqIEhlbHBzIHlvdSBpbnRlcmFjdCB3aXRoIHRoZSBET00gc2FmZWx5IGFuZCBlYXNpbHkuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRE9NIHtcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0aGF0IGZvbGxvd3MgdGhlIGV2ZW50IGRlbGVnYXRpb24gcGF0dGVybi4gVGhlIGFkdmFudGFnZSBpcyB0aGF0IHlvdSBjYW4gYWRkXHJcbiAgICAgKiBlbGVtZW50cyBhdCBhbnkgZGVwdGggaW5zaWRlIHRoZSBwYXJlbnQgY29udGFpbmVyIHdpdGhvdXQgaGF2aW5nIHRvIHdvcnJ5IGFib3V0IHRoZSBldmVudCBiZWluZ1xyXG4gICAgICogYXBwbGllZC4gVGhpcyBzb2x2ZXMgaGF2aW5nIHRvIGFkZCwgcmVtb3ZlLCBhbmQgbWFuYWdlIGV2ZW50cyBwZXIgZWxlbWVudC5cclxuICAgICAqIEBwYXJhbSB0eXBlIC0gRXZlbnQgdHlwZSwgZXhhbXBsZTogY2xpY2ssIGRibGNsaWNrLCBtb3VzZW92ZXIsIGVjdC4uXHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3IgLSBTYW1lIGFzIHF1ZXJ5IHNlbGVjdG9yLiBFbGVtZW50IGNsYXNzIGRlbm90ZWQgd2l0aCBwZXJpb2QsIGlkIGRlbm90ZWQgd2l0aCAjLCBvciBlbGVtZW50IG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHBlcmZvcm0gd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICogQHBhcmFtIHVzZUNhcHR1cmUgLSBPcHRpb25hbGx5IHVzZSBjYXB0dXJlIGluc3RlYWQgb2YgZXZlbnQgYnViYmxpbmcuXHJcbiAgICAgKiBAcGFyYW0gcGFyZW50IC0gT3B0aW9uYWxseSB3aGVyZSB0byBhZGQgdGhlIGxpc3RlbmVyLiBEZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIEFkZHMgY2xpY2sgdG8gSUQgdW5pcXVlLWlkIGluc2lkZSBvZiBkb2N1bWVudC5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiI3VuaXF1ZS1pZFwiLCAoKSA9PiB7IGNvbnNvbGUubG9nKFwiRklSRSFcIikgfSk7XHJcbiAgICAgKlxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gQWRkcyBjbGljayB0byBjbGFzcyAuYnRuIGluc2lkZSBvZiBkb2N1bWVudC5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiLmJ0blwiLCAoKSA9PiB7IGNvbnNvbGUubG9nKFwiRklSRSFcIikgfSk7XHJcbiAgICAgKlxyXG4gICAgICogLy8gRXhhbXBsZSAzIC0gQWRkcyBjbGljayB0byBidXR0b24gZWxlbWVudHMgaW5zaWRlIHdpbmRvdyB2aWEgY2FwdHVyZS5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiYnV0dG9uXCIsICgpID0+IHsgY29uc29sZS5sb2coXCJGSVJFIVwiKSB9LCB0cnVlLCB3aW5kb3cpO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFkZEV2ZW50RGVsZWdhdGUodHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrLCB1c2VDYXB0dXJlID0gZmFsc2UsIHBhcmVudCA9IGRvY3VtZW50KSB7XHJcbiAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoc2VsZWN0b3IpKVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZSk7XHJcbiAgICAgICAgfSwgdXNlQ2FwdHVyZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGNvbXBsZXggRE9NIGVsZW1lbnQgd2l0aCBhIHNpbmdsZSBmdW5jaXRvbi5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gU3RhbmRhcmQgSFRNTCBlbGVtZW50LiBFeGFtcGxlOiBkaXYsIHNwYW4sIGlucHV0LCBidXR0b24sIGVjdC4uLlxyXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZXMgLSBQYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4uICoqeyBhdHRyaWJ1dGVOYW1lIDogdmFsdWUgfSoqLlxyXG4gICAgICogLSBgYGB0ZXh0YGBgIFlvdSBhcmUgYWJsZSB0byBwYXNzIGEgc3RyaW5nIGFzIHRleHRDb250ZW50IG9yIHBhc3MgYW4gRWxlbWVudC9ub2RlIHRvIGFwcGVuZC5cclxuICAgICAqIC0gYGBgY2xhc3NgYGAgWW91IGFyZSBhYmxlIHRvIHBhc3MgbXVsdGlwbGUgY2xhc3NlcyB1c2luZyBhIHNwYWNlIGFzIHRoZSBkZWxpbWl0ZXIuXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRzIC0gT3B0aW9uYWxseSBwYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4gdG8gYWRkIGV2ZW50cy4gKip7IGV2ZW50VHlwZTogY2FsbGJhY2sgfSoqLiBUaGUgZXZlbnRUeXBlIGNvbnNpc3RzIG9mIHN0YW5kYXJkIGphdmFzY3JpcHQgZXZlbnRzLlxyXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBjcmVhdGVkIGVsZW1lbnQgaW5mZXJyZWQgZnJvbSB0aGUgYGBgZWxlbWVudGBgYCBwYXJhbS5cclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDEgLSA8ZGl2IGlkPVwidW5pcXVlLWlkXCIgY2xhc3M9XCJ0ZXh0LWNsYXNzXCI+IFNvbWUgY2FsbCB0byBhY3Rpb24gdGV4dCEgPC9kaXY+XHJcbiAgICAgKiBsZXQgbmV3RWxlbWVudCA9IERPTS5jcmVhdGUoXCJkaXZcIiwgeyBpZDogXCJ1bmlxdWUtaWRcIiwgY2xhc3M6IFwidGV4dC1jbGFzc1wiLCB0ZXh0OiBcIlNvbWUgY2FsbCB0byBhY3Rpb24gdGV4dCFcIn0pO1xyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIFdoZW4gY2xpY2tlZCBpdCBwcmludHMgb3V0IFwiQ2xpY2tlZCFcIiB0byB0aGUgY29uc29sZS5cclxuICAgICAqIC8vIDxidXR0b24gaWQ9XCJ1bmlxdWUtaWQtMlwiIGNsYXNzPVwiYnV0dG9uLWNsYXNzXCI+XHJcbiAgICAgKiAvLyAgPGRpdiBpZD1cInVuaXF1ZS1pZFwiIGNsYXNzPVwidGV4dC1jbGFzc1wiPiBTb21lIGNhbGwgdG8gYWN0aW9uIHRleHQhIDwvZGl2PlxyXG4gICAgICogLy8gPC9idXR0b24+XHJcbiAgICAgKiBET00uY3JlYXRlKFwiYnV0dG9uXCIsIHsgaWQ6IFwidW5pcXVlLWlkLTJcIiwgY2xhc3M6IFwiYnV0dG9uLWNsYXNzXCIsIHRleHQ6IG5ld0VsZW1lbnR9LCB7IGNsaWNrOiAoKSA9PiBjb25zb2xlLmxvZygnQ2xpY2tlZCEnKSB9KTtcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoZWxlbWVudCwgYXR0cmlidXRlcyA9IG51bGwsIGV2ZW50cyA9IG51bGwpIHtcclxuICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVOYW1lID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXS50cmltKCkuc3BsaXQoL1xccysvKSkuZm9yRWFjaChhdHRyQ2xhc3MgPT4geyBlbGVtLmNsYXNzTGlzdC5hZGQoYXR0ckNsYXNzKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFwcGVuZChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YXNldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKS5mb3JFYWNoKChbZGF0YUtleSwgZGF0YVZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5kYXRhc2V0W2RhdGFLZXldID0gZGF0YVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogZWxlbS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBldmVudExpc3QgPSBPYmplY3Qua2V5cyhldmVudHMpO1xyXG4gICAgICAgICAgICBldmVudExpc3QuZm9yRWFjaChldmVudCA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50c1tldmVudF0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNob3J0aGFuZCBmb3IgdGhlIHF1ZXJ5IHNlbGVjdG9yXHJcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBBIHF1ZXJ5IHNlbGVjdG9yIHN0cmluZywgRXhhbXBsZTogYGBgXCIuY2xhc3NcImBgYFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLSBEZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIFRoZSBmaXJzdCBvciBvbmx5IGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNlbGVjdChxdWVyeSwgcGFyZW50ID0gZG9jdW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG9ydGhhbmQgZm9yIHRoZSBxdWVyeSBzZWxlY3RvciBhbGwgd2l0aCB0aGUgYWRkZWQgYm9udXMgb2YgcmV0dXJuaW5nIGFuIGFycmF5LlxyXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcsIEV4YW1wbGU6IGBgYFwiLmNsYXNzXCJgYGBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBBbiBhcnJheSBvZiBlbGVtZW50c1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2VsZWN0QWxsKHF1ZXJ5LCBwYXJlbnQgPSBkb2N1bWVudCkge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2ggYW5kIHJldHVybiBhbiBFbGVtZW50IGZyb20gdGhlIERPTVxyXG4gICAgICogQHBhcmFtIHJlZmVyZW5jZSBBIHF1ZXJ5IHNlbGVjdG9yIHN0cmluZyBvciBlbGVtIHJlZmVyZW5jZSAoRWxlbWVudCwgZWN0Li4uKVxyXG4gICAgICogQHJldHVybiBUaGUgZGV0YWNoZWQgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGV0YWNoKHJlZmVyZW5jZSkge1xyXG4gICAgICAgIGxldCBlbGVtID0gdHlwZW9mIHJlZmVyZW5jZSA9PT0gXCJzdHJpbmdcIiA/IHRoaXMuc2VsZWN0KHJlZmVyZW5jZSkgOiByZWZlcmVuY2U7XHJcbiAgICAgICAgcmV0dXJuIGVsZW0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVHdvLXdheSBkYXRhIGJpbmRpbmcgYmV0d2VlbiBhbiBvYmplY3QncyBwcm9wZXJ0eSBhbmQgYW4gRWxlbWVudCdzIGF0dHJpYnV0ZS5cclxuICAgICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgcGFyZW50IG9iamVjdCB3aGVyZSB0aGUgcHJvcGVydHkgd2lsbCBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSBvYmplY3RQcm9wZXJ0eSAtIENyZWF0ZSBhIHByb3BlcnR5IHRoYXQgYmluZHMgd2l0aCBhbiBhdHRyaWJ1dGUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIFRoZSBlbGVtZW50IG9yIHF1ZXJ5IHNlbGVjdG9yIG9mIHRoZSBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRBdHRyaWJ1dGUgLSBUaGUgYXR0cmlidXRlIHRvIGJpbmQgdG8gdGhlIG9iamVjdCdzIHByb3BlcnR5LlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgLSBCaW5kcyBPYmplY3QgUHJvcGVydHkgXCJuYW1lXCIgKGRhdGFPYmplY3QubmFtZSkgdG8gYW4gZWxlbWVudCdzIGF0dHJpYnV0ZSB2YWx1ZS5cclxuICAgICAqIGxldCBkYXRhT2JqZWN0ID0ge307XHJcbiAgICAgKiBET00uYmluZEF0dHJpYnV0ZShkYXRhT2JqZWN0LCBcIm5hbWVcIiwgXCIjdW5pcXVlLWlkXCIsICd2YWx1ZScpO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRBdHRyaWJ1dGUob2JqZWN0LCBvYmplY3RQcm9wZXJ0eSwgZWxlbWVudCwgZWxlbWVudEF0dHJpYnV0ZSkge1xyXG4gICAgICAgIGxldCBlbGVtID0gdHlwZW9mIGVsZW1lbnQgPT09IFwic3RyaW5nXCIgPyB0aGlzLnNlbGVjdChlbGVtZW50KSA6IGVsZW1lbnQ7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgb2JqZWN0UHJvcGVydHksIHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKGVsZW1lbnRBdHRyaWJ1dGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGVsZW1lbnRBdHRyaWJ1dGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSByb3V0ZSBiYXNlZCBvbiBjdXJyZW50IHBhdGguIFRoaXMgaXMgZ3JlYXQgZm9yIG1ha2luZyBhIFNQQSB3aXRoIGRlZXAtbGlua2luZy5cclxuICAgICAqIEBwYXJhbSBpc0FycmF5IC0gVGhpcyB3aWxsIHJldHVybiB0aGUgcGF0aCBhcyBhbiBhcnJheSBgYGBbJ3NvbWUnLCAncGF0aCcsICdkZWZpbmVkJ11gYGBcclxuICAgICAqIG90aGVyd2lzZSBpdCB3aWxsIGRlZmF1bHQgdG8gYSBzdHJpbmcgYGBgJy9zb21lL3BhdGgvZGVmaW5lZCdgYGAuXHJcbiAgICAgKiBAcmV0dXJuIC0gQSBzdHJpbmcgb3IgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhOYW1lXHJcbiAgICAgKlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIEdldCBwYXRoIGAvc29tZS9wYXRoL2RlZmluZWRgXHJcbiAgICAgKiBsZXQgY3VycmVudFJvdXRlID0gRE9NLmdldFJvdXRlKCk7XHJcbiAgICAgKlxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gR2V0IHBhdGggYXMgYXJyYXkgWydzb21lJywgJ3BhdGgnLCAnZGVmaW5lZCddXHJcbiAgICAgKiBsZXQgY3VycmVudFJvdXRlID0gRE9NLmdldFJvdXRlKHRydWUpO1xyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0Um91dGUoaXNBcnJheSA9IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkgPyBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIikuZmlsdGVyKG4gPT4gbikgOiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgcm91dGUgYmFzZWQgb24gcGF0aC4gVGhpcyBpcyBncmVhdCBmb3IgbWFraW5nIGEgU1BBIHdpdGggZGVlcC1saW5raW5nLlxyXG4gICAgICogQHBhcmFtIHJvdXRlIC0gVGhlIHBhdGggeW91IHdhbnQgdG8gbmF2aWdhdGUgd2l0aG91dCByZWZyZXNoaW5nIHRoZSB2aWV3LlxyXG4gICAgICpcclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDEgLSBTZXQgdXJsIGxvY2FsaG9zdDo0MjAwL3NvbWUvcGF0aC9kZWZpbmVkXHJcbiAgICAgKiBET00uc2V0Um91dGUoJy9zb21lL3BhdGgvZGVmaW5lZCcpO1xyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIEdldHMgY3VycmVudCByb3V0ZSBhcyBhcnJheSBbJ3NvbWUnLCAncGF0aCcsICdkZWZpbmVkJ11cclxuICAgICAqIC8vICAgICAgICAgICAgIFNldHMgbmV3IHJvdXRlIGxvY2FsaG9zdDo0MjAwL3NvbWUvcGF0aC9uZXdcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUodHJ1ZSk7XHJcbiAgICAgKiBET00uc2V0Um91dGUoYC8ke2N1cnJlbnRSb3V0ZVswXX0vJHtjdXJyZW50Um91dGVbMV19L25ld2ApO1xyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0Um91dGUocm91dGUpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIHJvdXRlKTtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXgudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkRPTVwiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzO1xuICB9XG5cbiAgdmFyIGc7XG5cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICBnID0gdGhpcyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIHNlbGYgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgZ2xvYmFsIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBnbG9iYWw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGc7XG59KCk7IiwiaW1wb3J0IHsgRE9NIH0gZnJvbSBcImRvbWluYXRpb24tanNcIjtcclxuXHJcbmxldCBiYWNrQnV0dG9uID0gRE9NLmNyZWF0ZSgnYnV0dG9uJywgeyBjbGFzczogXCJoZWFkZXJcIiwgdGV4dDogXCJCYWNrIHRvIGluZGV4XCIgfSwgXHJcbntcclxuICAgIGNsaWNrIDogKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQubG9jYXRpb24gPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIjtcclxuICAgIH1cclxufSk7IFxyXG5sZXQgaGVhZGVyID0gRE9NLmNyZWF0ZSgnZGl2JywgeyBjbGFzczogXCJoZWFkZXJcIiwgc3R5bGU6IFwicGFkZGluZzoyMHB4O3dpZHRoOjEwMCU7YmFja2dyb3VuZDojY0ZGXCIsIHRleHQ6IGJhY2tCdXR0b24gfSk7XHJcbmxldCBuZXdFbGVtZW50ID0gRE9NLmNyZWF0ZSgnaDEnLCB7IGNsYXNzOiBcInRpdGxlXCIsIHRleHQ6IFwiVHlwZVNjcmlwdCBTYW1wbGVcIiB9KTtcclxubGV0IG5ld0Rlc2MgPSBET00uY3JlYXRlKFwicFwiLCB7IHRleHQ6IFwiSGVsbG8sIGNsaWNrIHRoZSBidXR0b24gdG8gc2VlIGhvdyBldmVudHMgd29yay5cIiB9KTtcclxubGV0IG5ld0J1dHRvbiA9IERPTS5jcmVhdGUoXCJidXR0b25cIiwgeyBjbGFzczogXCJjbGFzcy0xIGNsYXNzLTJcIiwgaWQ6J3VuaXF1ZS1ndWlkJywgdGV4dDogJ0NsaWNrIGJ1dHRvbiB0byB0ZXN0JyB9LCB7IFxyXG4gICAgY2xpY2sgOiAoKSA9PiB7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChET00uY3JlYXRlKFwicFwiLCB7IHRleHQ6IFwiQnV0dG9uIENsaWNrZWQhXCIsIHN0eWxlOiBcInBhZGRpbmc6NXB4IDIwcHg7XCIgfSkpO1xyXG4gICAgfSB9KTtcclxubGV0IGNvbnRhaW5lciA9IERPTS5jcmVhdGUoJ2RpdicsIHsgc3R5bGU6IFwicGFkZGluZzoyMHB4O1wiIH0pO1xyXG5jb250YWluZXIuYXBwZW5kKCBuZXdFbGVtZW50LCBuZXdEZXNjLCBuZXdCdXR0b24gKTtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmQoaGVhZGVyLCBjb250YWluZXIpO1xyXG5kb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9IFwiMFwiO1xyXG5cclxuLyogUm91dGluZyBwYXR0ZXJuICovXHJcbmxldCByb3V0ZXJCdXR0b24xID0gRE9NLmNyZWF0ZShcImJ1dHRvblwiLCB7IFwiZ290by1yb3V0ZVwiOlwiL3R5cGVzY3JpcHQvaW5kZXguaHRtbFwiLCB0ZXh0OiBcIkdvdG8gUm91dGUgL3R5cGVzY3JpcHQvaW5kZXguaHRtbFwiLCBzdHlsZTogXCJtYXJnaW4tbGVmdDoxMHB4XCIgfSk7XHJcbmxldCByb3V0ZXJCdXR0b24yID0gRE9NLmNyZWF0ZShcImJ1dHRvblwiLCB7IFwiZ290by1yb3V0ZVwiOlwiL3NvbWUvcGF0aFwiLCB0ZXh0OiBcIkdvdG8gUm91dGUgL3NvbWUvcGF0aFwiLCBzdHlsZTogXCJtYXJnaW4tbGVmdDoxMHB4XCIgfSk7XHJcbmxldCByb3V0ZUNvbnRhaW5lcjEgPSBET00uY3JlYXRlKCdkaXYnLCB7IHN0eWxlOiBcInBhZGRpbmc6MjBweDtiYWNrZ3JvdW5kOiNmMGU4Y2FcIiwgcm91dGU6IFwiL3NvbWUvcGF0aFwiLCB0ZXh0OiBgU2hvdyB3aGVuIG9uIFwiL3NvbWUvcGF0aFwiIHJvdXRlYCB9KTtcclxuY29udGFpbmVyLmFwcGVuZChyb3V0ZXJCdXR0b24xLCByb3V0ZXJCdXR0b24yLCByb3V0ZUNvbnRhaW5lcjEpO1xyXG5cclxuLy8gRGVsZWdhdGUgU1BBIGxpbmtzXHJcbkRPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsICdbZ290by1yb3V0ZV0nLCAoZTogUG9pbnRlckV2ZW50KSA9PiB7XHJcbiAgICBsZXQgZWxlbWVudCA6IEhUTUxFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBET00uc2V0Um91dGUoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2dvdG8tcm91dGUnKSk7XHJcbiAgICByZW5kZXIoKTtcclxufSk7XHJcblxyXG5yZW5kZXIoKTtcclxuZnVuY3Rpb24gcmVuZGVyKCl7XHJcbiAgICBsZXQgcm91dGVDb250cm9sbGVkVmlld3MgPSBET00uc2VsZWN0QWxsKCdbcm91dGVdJyk7XHJcbiAgICBsZXQgY3VycmVudFJvdXRlID0gRE9NLmdldFJvdXRlKCk7XHJcbiAgICByb3V0ZUNvbnRyb2xsZWRWaWV3cy5mb3JFYWNoKChlbGVtZW50OkhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICBpZihjdXJyZW50Um91dGUuaW5jbHVkZXMoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvdXRlJykpKXsgXHJcbiAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgtZXhwb3NlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==