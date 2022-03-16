import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IEditor } from "../editor/i-editor";
import { IGUIElement } from "@pennacchi/core/dist/gui-element/i-gui-element";
import { PositionName } from "@pennacchi/core/dist/types/position-name";

export interface IEditorToolbar extends IGUIElement {
    get contentObjectFocused(): IContentObject
    get editor(): IEditor | undefined;
    get position(): PositionName | undefined;

    hasContentObjectFocused(): boolean;
};
