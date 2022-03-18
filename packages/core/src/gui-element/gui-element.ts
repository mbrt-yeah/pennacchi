import { BooleanString } from "../types/boolean-string";
import { Direction } from "../types/direction";
import { Domina } from "../domina";
import { DOMType } from "../types/dom-type";
import { getObjectProperty } from "../utilities/getObjectProperty";
import { HideMode } from "../types/hide-mode";
import { IGUIElement } from "./i-gui-element";
import { IGUIElementOptions } from "./i-gui-element-options";
import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { SizeName } from "../types/size-name";
import { Visibility } from "../types/visibility";

export abstract class GUIElement extends LitElement implements IGUIElement {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    @property({ attribute: "activated", type: String, reflect: true })
    private __activated: BooleanString;

    @property({ attribute: "direction", type: String, reflect: true })
    private __direction: Direction;

    private __DOMApi: Domina<HTMLElement>;

    @property({ attribute: "domtype", type: String, reflect: true })
    private __DOMType: DOMType; 

    @property({ attribute: "size", type: String, reflect: true })
    private __size: SizeName;

    @property({ attribute: "visibility", type: String, reflect: true })
    private __visibility: Visibility;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(options: IGUIElementOptions) {
        super();
        this.__activated = getObjectProperty<BooleanString>(options, "activated", "true");
        this.__direction = getObjectProperty<Direction>(options, "direction", "ltr");
        this.__DOMApi = new Domina<HTMLElement>(this);
        this.__DOMType = getObjectProperty<DOMType>(options, "DOMType", "normal");
        this.__size = getObjectProperty<SizeName>(options, "size", "m");
        this.__visibility = getObjectProperty<Visibility>(options, "visibility", "visible");
    }


    /* -------------------------------------------------------------------------- */
    /*                               RENDER METHODS                               */
    /* -------------------------------------------------------------------------- */

    public override createRenderRoot(): Element | ShadowRoot {
        if (this.__DOMType === "shadow")
            return super.createRenderRoot();

        return this;
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get activated(): BooleanString {
        return this.__activated;
    }

    public get DOMApi(): Domina<HTMLElement> {
        return this.__DOMApi;
    }

    public get DOMType(): DOMType {
        return this.__DOMType;
    }

    public set DOMType(DOMType: DOMType) {
        this.__DOMType = DOMType;
    }

    public get direction(): Direction {
        return this.__direction;
    }

    public get size(): SizeName {
        return this.__size;
    }

    public set size(size: SizeName) {
        this.__size = size;
    }

    public get visibility(): Visibility {
        return this.__visibility;
    }

    public set visibility(visibility: Visibility) {
        this.__visibility = visibility;
    }

    public override attributeChangedCallback(name: string, valueOld: string, valueNew: string): void {
        super.attributeChangedCallback(name, valueOld, valueNew);

        const actions: { [id: string]: (valueOld: string, valueNew: string) => void } = {
            "direction": (valueOld: string, valueNew: string): void => {
                this.__DOMApi.replaceClass(`has-direction-${valueOld}`, `has-direction-${valueNew}`);
                return;
            },
            "size": (valueOld: string, valueNew: string): void => {
                this.__DOMApi.replaceClass(`has-size-${valueOld}`, `has-size-${valueNew}`);
                return;
            },
            "visibility": (valueOld: string, valueNew: string): void => {
                this.__DOMApi.replaceClass(`has-visibility-${valueOld}`, `has-visibility-${valueNew}`);
                return;
            },
        }

        const action = actions[name];

        if (!action || typeof action !== "function")
            return;

        return action(valueOld, valueNew);
    }

    public hide(hideMode: HideMode = "collapse"): IGUIElement {
        this.__visibility = hideMode;
        return this;
    }

    public show(): IGUIElement {
        this.__visibility = "visible";
        return this;
    }

    public toggle(hideMode: HideMode = "collapse"): IGUIElement {
        if (this.__visibility === "visible")
            return this.hide(hideMode);

        return this.show();
    }
};
