import { BooleanString } from "../types/boolean-string";
import { Direction } from "../types/direction";
import { Domina } from "../domina";
import { DOMType } from "../types/dom-type";
import { HideMode } from "../types/hide-mode";
import { SizeName } from "../types/size-name";
import { Visibility } from "../types/visibility";
import { LitElement } from "lit";

export interface IGUIElement extends LitElement {
    get activated(): BooleanString;
    get direction(): Direction;
    get DOMApi(): Domina<HTMLElement>;
    get DOMType(): DOMType;
    get size(): SizeName;
    get visibility(): Visibility;
    set DOMType(DOMType: DOMType);
    set size(size: SizeName);
    set visibility(visibility: Visibility);

    hide(hideMode?: HideMode): IGUIElement;
    isVisible(): boolean;
    show(...params: any[]): IGUIElement;
    toggle(hideMode?: HideMode): IGUIElement;
};
