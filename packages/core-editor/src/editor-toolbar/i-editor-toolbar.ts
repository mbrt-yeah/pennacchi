import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IEditor } from "../editor/i-editor";
import { IGUIElement } from "@pennacchi/core/dist/gui-element/i-gui-element";
import { Placement } from "@pennacchi/core/dist/types/placement";
import { PlacementRelativeTo } from "@pennacchi/core/dist/types/placement-relative-to";

export interface IEditorToolbar extends IGUIElement {
    get contentObjectFocused(): IContentObject | undefined;
    get editor(): IEditor | undefined;
    get placement(): Placement;
    get placementRelativeTo(): PlacementRelativeTo;

    hasContentObjectFocused(): boolean;
};
