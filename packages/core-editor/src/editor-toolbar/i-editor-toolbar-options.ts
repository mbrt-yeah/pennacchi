import { IGUIElementOptions } from "@pennacchi/core/dist/gui-element/i-gui-element-options";
import { Placement } from "@pennacchi/core/dist/types/placement";

export interface IEditorToolbarOptions extends IGUIElementOptions {
    placement?: Placement;
    placementRelativeTo?: "text-selection" | "content-object";
};
