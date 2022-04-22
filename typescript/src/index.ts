import { DOM } from "domination-js";

let backButton = DOM.create('button', { class: "header", text: "Back to index" }, 
{
    click : () => {
    document.location = "http://localhost:3000/";
    }
}); 
let header = DOM.create('div', { class: "header", style: "padding:20px;width:100%;background:#cFF", text: backButton });

/**
 * Backing building and triggering events
 * 
 */
let newElement = DOM.create('h1', { class: "title", text: "TypeScript Event Sample" });
let newDesc = DOM.create("p", { text: "Hello, click the button to see how events work." });
let newButton = DOM.create("button", { class: "class-1 class-2", id:'unique-guid', text: 'Click button to test' }, { 
    click : () => {
        eventSectionContainer.append(DOM.create("p", { text: "Button Clicked!", style: "padding:5px 20px;" }));
    } });
let eventSectionContainer = DOM.create('div', { style: "padding:20px;", append: [newElement, newDesc, newButton] });


/**
 * Routing pattern
 * 
 */

// Routing - Dom Build
let routerTitle = DOM.create('h1', { class: "title", text: "Basic Routing Sample" });
let routerButton1 = DOM.create("button", { routeLink: "/typescript/index.html", text: "Goto Route /typescript/index.html", style: "margin-left:10px" });
let routerButton2 = DOM.create("button", { routeLink: "/some/path", text: "Goto Route /some/path", style: "margin-left:10px" });
let routeContainer1 = DOM.create('div', { style: "padding:20px;background:#f0e8ca;margin-top:10px", routeShow: "/some/path", text: `Show when on "/some/path" route` });
let routeContainer2 = DOM.create('div', { style: "padding:20px;background:#cae3f0;margin-top:10px", routeShow: "/typescript/index.html", text: `Show when on "/typescript/index.html" route` });
let routerSectionContainer = DOM.create('div', { style: "padding:20px;", append: [routerTitle, routerButton1, routerButton2, routeContainer1, routeContainer2] });

// Delegate SPA links
DOM.addEventDelegate('click', '[routeLink]', (e: PointerEvent) => {
    let element : HTMLElement = e.target as HTMLElement;
    DOM.setRoute(element.getAttribute('routeLink'));
    render(); // Rerender view Elements
});

// Delegate SPA Routes
function renderRouteViews(){
    let currentRoute = DOM.getRoute();
    // Adding the routeShow attribute on an html element will show it on a matching route
    let routeViews = DOM.selectAll('[routeShow]');
    routeViews.forEach((element:HTMLElement) => {
        element.style.display = currentRoute.includes(element.getAttribute('routeShow')) ? 'flex' : 'none';
    });
    // Adding the routeHide attribute on an html element will hide it on a matching route
    routeViews = DOM.selectAll('[routeHide]');
    routeViews.forEach((element:HTMLElement) => {
        element.style.display = currentRoute.includes(element.getAttribute('routeHide')) ? 'none' : 'flex';
    });
}


/**
 *  Render Pipeline this will be triggered in the following ways
 *  - Once on every first load
 *  - Once on every internal page route event by click on a [routeLink] 
 */
function render(){
    renderRouteViews();
}

// Add constructed elements to the page
document.body.append(
    header, 
    eventSectionContainer,
    routerSectionContainer
    );
document.body.style.margin = "0";
render(); // Fire it once to render intial view