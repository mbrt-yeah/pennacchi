import { ButtonGroupCSSScoped } from "./button-group-css-scoped";
import { ComponentBlock } from "../component-block";
import { CSSResult, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("pnncch-button-group")
export class ButtonGroup extends ComponentBlock {

    /* -------------------------------------------------------------------------- */
    /*                                     CSS                                    */
    /* -------------------------------------------------------------------------- */

    public static override styles: CSSResult = ButtonGroupCSSScoped;


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
        return html`<slot></slot>`;
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

};
