import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { ContentObjectClassName, ContentObjectContentWrapperClassName } from "@pennacchi/core/dist/statics";
import { ContentObjectSubtype } from "@pennacchi/core-content-object/dist/content-object-subtype";
import { ContentObjectSubtypeMap } from "@pennacchi/core-content-object/dist/content-object-subtype-map";
import { customElement, query } from "lit/decorators.js";
import { html, TemplateResult } from "lit";
import { IBlockquoteFooterOptions } from "./i-blockquote-footer-options";
import { IContentObjectJsonSerialization } from "@pennacchi/core-content-object/dist/i-content-object-json-serialization";

@customElement("pnncch-blockquote-footer")
export class BlockquoteFooter extends ContentObject {


    /* -------------------------------------------------------------------------- */
    /*                              STATIC PROPERTIES                             */
    /* -------------------------------------------------------------------------- */

    public static readonly SUBTYPE: ContentObjectSubtype = ContentObjectSubtypeMap["blockquote-footer"];


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    @query("figcaption", false)
    private __figcaption: HTMLElement;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(options: IBlockquoteFooterOptions) {
        super({
            options,
            subtype: BlockquoteFooter.SUBTYPE,
            type: "block"
        });

        this.DOMApi.addClass(`${ContentObjectClassName}--${BlockquoteFooter.SUBTYPE}`);
    }


    /* -------------------------------------------------------------------------- */
    /*                                  RENDERING                                 */
    /* -------------------------------------------------------------------------- */

    public override render(): TemplateResult | HTMLElement {
        return html`
            ${this.renderFormattingSymbol()}

            <footer>
                <figcaption
                    class="${ContentObjectContentWrapperClassName}"
                    contenteditable="true"
                ></figcaption>
            </footer>
        `;
    }

    public override toJson(): IContentObjectJsonSerialization {
        return {
            contents: this.__figcaption.innerHTML,
            id: this.id,
            subtype: BlockquoteFooter.SUBTYPE,
            type: "block",
        };
    }
};
