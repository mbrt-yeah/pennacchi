import { html, HTMLTemplateResult } from "lit"
import { IIcon } from "@pennacchi/core/dist/interfaces/i-icon";

import "../icons/icon-svg";

export const renderIconSVG = (icon?: IIcon): HTMLTemplateResult => {
    if (!icon || !icon.id) 
        return html``;

    return html`<pnncch-icon-svg 
        iconid="${icon.id}"
        size="${icon.size || "m"}"
        slot="${icon.slot || "prefix"}"
    ></pnncch-icon-svg>`;
};
