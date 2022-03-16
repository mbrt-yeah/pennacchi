import { AncoraCommand } from "@pennacchi/ancora/src/blueprints/ancora-command";
import { EditorCommandChangeMode } from "./editor-command-change-mode";
import { IconNameMap } from "@pennacchi/core/dist/maps/icon-name-map";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUI } from "@pennacchi/core/dist/tool/i-tool-ui";
import { ToolId } from "@pennacchi/core/dist/tool/tool-id";

export class EditorToolChangeMode implements ITool {
    public id: ToolId;
    public command: IConstructor<AncoraCommand>;
    public ui: IToolUI;

    public constructor() {
        this.id = "changemode";
        this.command = EditorCommandChangeMode;
        this.ui = {
            description: "Changes the editor mode",
            label: "Change Editor Mode",
            type: "button-group",
            values: [
                { id: "editmode", icon: { id: IconNameMap.pencil }, label: "Edit Mode", isDefault: true },
                { id: "readmode", icon: { id: IconNameMap.eye }, label: "Read Mode", },
            ]
        };
    }
};
