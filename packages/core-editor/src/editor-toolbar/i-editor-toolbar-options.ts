import { IGUIElementOptions } from "@pennacchi/core/dist/gui-element/i-gui-element-options";
import { PositionName } from "@pennacchi/core/dist/types/position-name";

export interface IEditorToolbarOptions extends IGUIElementOptions {
    position?: PositionName;
};
