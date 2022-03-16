import { TextSelection } from "./text-selection";

declare global {
    interface Window { 
        TEXT_SELECTION: TextSelection,
    }
};

const element = document.getElementById("element");
window.TEXT_SELECTION = new TextSelection(element);

export * from "./text-selection";