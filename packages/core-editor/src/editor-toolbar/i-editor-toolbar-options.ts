import { IGUIElementOptions } from "@pennacchi/core/dist/gui-element/i-gui-element-options";
import { Placement } from "@pennacchi/core/dist/types/placement";
import { PlacementRelativeTo } from "@pennacchi/core/dist/types/placement-relative-to";

export interface IEditorToolbarOptions extends IGUIElementOptions {
    placement?: Placement;
    placementRelativeTo?: PlacementRelativeTo;
};
