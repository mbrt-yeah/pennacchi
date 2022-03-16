import { CSSResult, unsafeCSS } from "lit";
import { generateCSSRule } from "@pennacchi/css-rules-generator/dist/generators/css-rule/generate-css-rule";
import { CSSSelectorType } from "@pennacchi/css-rules-generator/dist/types/css-selector-type";

export const createSROnly = (selectorType: CSSSelectorType): CSSResult => {
    return unsafeCSS(generateCSSRule({
        selector: { name: ".sr-only", type: selectorType},
        declaration: [
            { "propertyName": "border",   propertyValue: "0" },
            { "propertyName": "clip",     propertyValue: "rect(0,0,0,0)" },
            { "propertyName": "height",   propertyValue: "1px" },
            { "propertyName": "margin",   propertyValue: "-1px" },
            { "propertyName": "overflow", propertyValue: "hidden" },
            { "propertyName": "padding",  propertyValue: "0" },
            { "propertyName": "position", propertyValue: "absolute" },
            { "propertyName": "width",    propertyValue: "absolute" },
        ]
    })); 
};
