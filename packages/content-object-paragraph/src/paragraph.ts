import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { ContentObjectClassName, ContentObjectContentWrapperClassName } from "@pennacchi/core/dist/statics";
import { ContentObjectSubtype } from "@pennacchi/core-content-object/dist/content-object-subtype";
import { ContentObjectSubtypeMap } from "@pennacchi/core-content-object/dist/content-object-subtype-map";
import { customElement } from "lit/decorators.js";
import { html, TemplateResult } from "lit";
import { IParagraphOptions } from "./i-paragraph-options-default";

@customElement("pnncch-paragraph")
export class Paragraph extends ContentObject {


    /* -------------------------------------------------------------------------- */
    /*                              STATIC PROPERTIES                             */
    /* -------------------------------------------------------------------------- */

    public static readonly SUBTYPE: ContentObjectSubtype = ContentObjectSubtypeMap.paragraph;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(options: IParagraphOptions) {
        super({
            options,
            subtype: Paragraph.SUBTYPE,
            type: "block",
        });

        this.DOMApi.addClass(`${ContentObjectClassName}--${Paragraph.SUBTYPE}`);
    }


    /* -------------------------------------------------------------------------- */
    /*                                  RENDERING                                 */
    /* -------------------------------------------------------------------------- */

    public override render(): TemplateResult | HTMLElement {
        return html`
            ${this.renderFormattingSymbol()}
            <div class="${ContentObjectContentWrapperClassName}"><p contenteditable="true"></p></div>
        `;
    }
};
