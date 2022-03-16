import { ButtonCSSScoped } from "./button-css-scoped";
import { ComponentBlock } from "../component-block";
import { CSSResult, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("pnncch-button")
export class Button extends ComponentBlock {

    /* -------------------------------------------------------------------------- */
    /*                                     CSS                                    */
    /* -------------------------------------------------------------------------- */

    public static override styles: CSSResult = ButtonCSSScoped;


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    
    /* -------------------------------------------------------------------------- */
    /*                                 CONSTRUCTOR                                */
    /* -------------------------------------------------------------------------- */

    public constructor() {
        super();
        this.DOMType = "shadow";
    }


    /* -------------------------------------------------------------------------- */
    /*                               RENDER METHODS                               */
    /* -------------------------------------------------------------------------- */

    public override render(): TemplateResult | HTMLElement {
        return html`
            <slot class="prefix" name="prefix"></slot>
            <slot class="label" name="label"></slot>
            <slot class="suffix" name="suffix"></slot>
            <slot></slot>
        `;
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

};
