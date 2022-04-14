import { DOM } from "../node_modules/domination-js/dist/esm/index.js";

let backButton = DOM.create('button', { class: "header", text: "Back to index" }, 
{
    click : () => {
    document.location = "http://localhost:3000/";
    }
}); 
let header = DOM.create('div', { class: "header", style: "padding:20px;width:100%;background:#cFF", text: backButton });
let newElement = DOM.create('h1', { class: "title", text: "Vanilla JS Sample" });
let newDesc = DOM.create("p", { text: "Hello, click the button to see how events work." });
let newButton = DOM.create("button", { class: "class-1 class-2", id:'unique-guid', text: 'Click button to test' }, { 
    click : () => {
        document.body.append(DOM.create("p", { text: "Button Clicked!", style: "padding:5px 20px;" }));
    } });
let container = DOM.create('div', { style: "padding:20px;" });
container.append( newElement, newDesc, newButton );
document.body.append(header, container);
document.body.style.margin = 0;