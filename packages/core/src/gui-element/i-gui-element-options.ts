import { Direction } from "../types/direction";
import { BooleanString } from "../types/boolean-string";
import { DOMType } from "../types/dom-type";
import { SizeName } from "../types/size-name";
import { Visibility } from "../types/visibility";

export interface IGUIElementOptions {
    activated?: BooleanString;
    direction?: Direction;
    DOMType?: DOMType;
    size?: SizeName;
    visibility?: Visibility;
};
