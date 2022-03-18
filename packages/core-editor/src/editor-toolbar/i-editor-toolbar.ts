import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IEditor } from "../editor/i-editor";
import { IGUIElement } from "@pennacchi/core/dist/gui-element/i-gui-element";
import { Placement } from "@pennacchi/core/dist/types/placement";

export interface IEditorToolbar extends IGUIElement {
    get contentObjectFocused(): IContentObject
    get editor(): IEditor | undefined;
    get placement(): Placement | undefined;

    hasContentObjectFocused(): boolean;
};
