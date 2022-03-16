import { AncoraCommand } from "@pennacchi/ancora/src/blueprints/ancora-command";
import { EditorCommandSave } from "./editor-command-save";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { IconNameMap } from "@pennacchi/core/dist/maps/icon-name-map";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUI } from "@pennacchi/core/dist/tool/i-tool-ui";
import { ToolId } from "@pennacchi/core/dist/tool/tool-id";

export class EditorToolSave implements ITool {
    public id: ToolId;
    public command: IConstructor<AncoraCommand>;
    public ui: IToolUI;

    public constructor() {
        this.id = "save";
        this.command = EditorCommandSave;
        this.ui = {
            description: "Saves the document",
            icon: { id: IconNameMap.diskette },
            label: "Save",
            type: "button",
        };
    }
};
