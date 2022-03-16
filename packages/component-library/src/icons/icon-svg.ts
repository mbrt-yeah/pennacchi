import { ComponentBlock } from "../component-block";
import { CSSResult, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { htmlToDOMElement } from "@pennacchi/core/dist/utilities/html-to-dom-element";
import { IconSVGCSSScoped } from "./icon-svg-css-scoped";
import { SimpleMap } from "@pennacchi/core/dist/types/simple-map";

@customElement("pnncch-icon-svg")
export class IconSVG extends ComponentBlock {


    /* -------------------------------------------------------------------------- */
    /*                                     CSS                                    */
    /* -------------------------------------------------------------------------- */

    public static override styles: CSSResult = IconSVGCSSScoped;


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    @property({ attribute: "iconid", type: String, reflect: true })
    private __iconId: string;


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
        const iconFinal = this.getIconById(this.__iconId);

        if (!iconFinal) {
            const error = new Error("[IconSVG#render] Can't render icon");
            error.message = "No icon or valid icon map and icon id found.";
            throw error;
        }

        const svgIconElement = htmlToDOMElement(iconFinal);

        if (!svgIconElement.hasAttribute("viewBox"))
            svgIconElement.setAttribute("viewBox", "0 0 24 24");

        return svgIconElement;
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public override attributeChangedCallback(name: string, valueOld: string, valueNew: any): void {
        super.attributeChangedCallback(name, valueOld, valueNew);

        if (name === "iconid")
            this.__iconId = valueNew;
    }

    public get iconId(): string | undefined {
        return this.__iconId;
    }

    private getIconById(id: string): string | undefined {
        if (!id)
            return undefined;

        let icon: string;

        const iconMaps = this.getIconMaps()

        for ( const iconMap of iconMaps ) {
            if (iconMap[id]) {
                icon = iconMap[id];
                break;
            }
        }

        return icon;
    }

    private getIconMaps(): SimpleMap<string, string>[] {
        const iconMaps: SimpleMap<string, string>[] = [];

        if (this.configuration.iconSet && Object.keys(this.configuration.iconSet).length > 0)
            iconMaps.push(this.configuration.iconSet);

        return iconMaps;
    }
};
