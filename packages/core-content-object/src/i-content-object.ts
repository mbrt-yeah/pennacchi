import { BooleanString } from "@pennacchi/core/dist/types/boolean-string";
import { Caret } from "@pennacchi/caret/dist/caret";
import { ContentObjectSubtype } from "./content-object-subtype";
import { ContentObjectType } from "./content-object-type";
import { IContentObjectDefinition } from "./i-content-object-definition";
import { IContentObjectJsonSerialization } from "./i-content-object-json-serialization";
import { IGUIElement } from "@pennacchi/core/dist/gui-element/i-gui-element";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { LayoutType } from "@pennacchi/core/dist/types/layout-type";
import { TextSelection } from "@pennacchi/text-selection/dist/text-selection";

export interface IContentObject extends IGUIElement {
    get allowedContentObjects(): IContentObjectDefinition[];
    get caret(): Caret;
    get contents(): string;
    get formattingSymbol(): BooleanString;
    get layoutType(): LayoutType;
    get subtype(): ContentObjectSubtype;
    get textSelection(): TextSelection
    get toolbarActivated(): BooleanString;
    get toolbarInlineFormattingActivated(): BooleanString;
    get toolbarInlineFormattingTools(): ITool[];
    get toolbarTools(): ITool[];
    get type(): ContentObjectType;

    focus(): void;
    toJson(): IContentObjectJsonSerialization;
};
