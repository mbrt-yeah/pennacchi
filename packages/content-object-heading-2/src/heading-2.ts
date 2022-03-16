import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { ContentObjectClassName, ContentObjectContentWrapperClassName } from "@pennacchi/core/dist/statics";
import { ContentObjectSubtype } from "@pennacchi/core-content-object/dist/content-object-subtype";
import { ContentObjectSubtypeMap } from "@pennacchi/core-content-object/dist/content-object-subtype-map";
import { customElement } from "lit/decorators.js";
import { html, TemplateResult } from "lit";
import { IHeading2Options } from "./i-heading-2-options";

@customElement("pnncch-heading-2")
export class Heading2 extends ContentObject {
    public static readonly SUBTYPE: ContentObjectSubtype = ContentObjectSubtypeMap.heading2;

    public constructor(options: IHeading2Options) {
        super({
            options,
            subtype: Heading2.SUBTYPE,
            type: "block",
        });

        this.DOMApi.addClass(`${ContentObjectClassName}--${Heading2.SUBTYPE}`);
    }

    public override render(): TemplateResult | HTMLElement {
        return html`
            ${this.renderFormattingSymbol()}

            <div class="${ContentObjectContentWrapperClassName}"><h2 contenteditable="true"></h2></div>
        `;
    }
};
