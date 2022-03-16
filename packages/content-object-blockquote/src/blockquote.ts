import { BlockquoteFooter } from "./blockquote-footer";
import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { ContentObjectClassName, ContentObjectContentWrapperClassName, ContentObjectToolbarClassName } from "@pennacchi/core/dist/statics";
import { ContentObjectSubtype } from "@pennacchi/core-content-object/dist/content-object-subtype";
import { ContentObjectSubtypeMap } from "@pennacchi/core-content-object/dist/content-object-subtype-map";
import { customElement, query, state } from "lit/decorators.js";
import { EventMapCore } from "@pennacchi/core/dist/maps/event-map-core";
import { html, TemplateResult } from "lit";
import { IBlockquoteJsonSerialization } from "./i-blockquote-json-serialization";
import { IBlockquoteOptions } from "./i-blockquote-options";
import { msg } from "@lit/localize";
import { Paragraph } from "@pennacchi/content-object-paragraph/dist/paragraph";

@customElement("pnncch-blockquote")
export class Blockquote extends ContentObject {


    /* -------------------------------------------------------------------------- */
    /*                              STATIC PROPERTIES                             */
    /* -------------------------------------------------------------------------- */

    public static readonly SUBTYPE: ContentObjectSubtype = ContentObjectSubtypeMap.blockquote;


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    @query("pnncch-paragraph", false)
    private __paragraph: Paragraph;

    @query("pnncch-blockquote-footer", false)
    private __footer: BlockquoteFooter;

    @state()
    private __footerAdded: boolean;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(options: IBlockquoteOptions) {
        super({
            options,
            subtype: Blockquote.SUBTYPE,
            type: "block",
        });

        this.DOMApi.addClass(`${ContentObjectClassName}--${Blockquote.SUBTYPE}`);
        this.__footerAdded = false;
    }

    public override onContentObjectReady(): void {
        return;
    }


    /* -------------------------------------------------------------------------- */
    /*                                  RENDERING                                 */
    /* -------------------------------------------------------------------------- */

    public override render(): TemplateResult | HTMLElement {
        return html`
            ${super.renderFormattingSymbol()}

            <div class="${ContentObjectContentWrapperClassName}"><blockquote toolbar="false"><pnncch-paragraph></pnncch-paragraph>${this.renderBlockquoteFooter()}</blockquote></div>

            <div class="${ContentObjectToolbarClassName}">
                ${this.renderBlockquoteToolbar()}
            </div>
        `;
    }

    private renderBlockquoteFooter(): TemplateResult {
        if (!this.__footerAdded)
            return html``;

        return html`<pnncch-blockquote-footer toolbar="false"></pnncch-blockquote-footer>`;
    }

    private renderBlockquoteToolbar(): TemplateResult {
        if (this.__footerAdded) {
            return html`<pnncch-button
                @click="${(e: MouseEvent) => this.onRemoveFooterClick(e)}"
                direction="ltr"
                size="m"
            >
                <pnncch-icon-svg iconid="trashBin" size="m" slot="prefix"></pnncch-icon-svg>
                <span slot="label">${msg("Remove Footer")}</span>
            </pnncch-button>`
        }

        return html`<pnncch-button
            @click="${(e: MouseEvent) => this.onAddFooterClick(e)}"
            direction="ltr"
            size="m"
        >
            <pnncch-icon-svg iconid="plus" size="m" slot="prefix"></pnncch-icon-svg>
            <span slot="label">${msg("Add Footer")}</span>
        </pnncch-button>`;
    }


    /* -------------------------------------------------------------------------- */
    /*                          USER INTERACTION HANDLING                         */
    /* -------------------------------------------------------------------------- */

    private async onAddFooterClick(event: MouseEvent): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        this.__footerAdded = true;

        await this.updateComplete;

        this.__footer.focus();
        this.DOMApi.dispatchCustomEvent(EventMapCore["pnncch::resize"]);
    }

    private async onRemoveFooterClick(event: MouseEvent): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        this.__footerAdded = false;

        await this.updateComplete

        this.__paragraph.focus();
        this.DOMApi.dispatchCustomEvent(EventMapCore["pnncch::resize"]);
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public override toJson(): IBlockquoteJsonSerialization {
        return {
            contents: this.__paragraph?.toJson(),
            footer: this.__footer?.toJson(),
            id: this.id,
            subtype: Blockquote.SUBTYPE,
            type: "block",
        };
    }
};
