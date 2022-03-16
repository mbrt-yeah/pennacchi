import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { ContentObjectClassName, ContentObjectContentWrapperClassName } from "@pennacchi/core/dist/statics";
import { ContentObjectSubtype } from "@pennacchi/core-content-object/dist/content-object-subtype";
import { ContentObjectSubtypeMap } from "@pennacchi/core-content-object/dist/content-object-subtype-map";
import { customElement } from "lit/decorators.js";
import { html, TemplateResult } from "lit";
import { IHeading1Options } from "./i-heading-1-options";

@customElement("pnncch-heading-1")
export class Heading1 extends ContentObject {
    public static readonly SUBTYPE: ContentObjectSubtype = ContentObjectSubtypeMap.heading1;

    public constructor(options: IHeading1Options) {
        super({
            options,
            subtype: Heading1.SUBTYPE,
            type: "block",
        });

        this.DOMApi.addClass(`${ContentObjectClassName}--${Heading1.SUBTYPE}`);
    }

    public override render(): TemplateResult | HTMLElement {
        return html`
            ${this.renderFormattingSymbol()}

            <div class="${ContentObjectContentWrapperClassName}"><h1 contenteditable="true"></h1></div>
        `;
    }
};

