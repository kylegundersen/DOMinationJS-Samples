import { DOM } from "domination-js";

let backButton = DOM.create('button', { class: "header", text: "Back to index" }, 
{
    click : () => {
    document.location = "http://localhost:3000/";
    }
}); 
let header = DOM.create('div', { class: "header", style: "padding:20px;width:100%;background:#cFF", text: backButton });
let newElement = DOM.create('h1', { class: "title", text: "TypeScript Sample" });
let newDesc = DOM.create("p", { text: "Hello, click the button to see how events work." });
let newButton = DOM.create("button", { class: "class-1 class-2", id:'unique-guid', text: 'Click button to test' }, { 
    click : () => {
        container.append(DOM.create("p", { text: "Button Clicked!", style: "padding:5px 20px;" }));
    } });
let container = DOM.create('div', { style: "padding:20px;" });
container.append( newElement, newDesc, newButton );
document.body.append(header, container);
document.body.style.margin = "0";

/* Routing pattern */
let routerButton1 = DOM.create("button", { "goto-route":"/typescript/index.html", text: "Goto Route /typescript/index.html", style: "margin-left:10px" });
let routerButton2 = DOM.create("button", { "goto-route":"/some/path", text: "Goto Route /some/path", style: "margin-left:10px" });
let routeContainer1 = DOM.create('div', { style: "padding:20px;background:#f0e8ca", route: "/some/path", text: `Show when on "/some/path" route` });
container.append(routerButton1, routerButton2, routeContainer1);

// Delegate SPA links
DOM.addEventDelegate('click', '[goto-route]', (e: PointerEvent) => {
    let element : HTMLElement = e.target as HTMLElement;
    DOM.setRoute(element.getAttribute('goto-route'));
    render();
});

render();
function render(){
    let routeControlledViews = DOM.selectAll('[route]');
    let currentRoute = DOM.getRoute();
    routeControlledViews.forEach((element:HTMLElement) => {
       if(currentRoute.includes(element.getAttribute('route'))){ 
           element.style.display = 'flex';
       } else {
            element.style.display = 'none';
       }
    });
}