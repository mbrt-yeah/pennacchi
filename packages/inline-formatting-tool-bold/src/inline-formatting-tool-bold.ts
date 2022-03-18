import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { IconNameMap } from "@pennacchi/core/dist/maps/icon-name-map";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUI } from "@pennacchi/core/dist/tool/i-tool-ui";
import { ToolId } from "@pennacchi/core/dist/tool/tool-id";
import { ToolIdMap } from "@pennacchi/core/dist/tool/tool-id-map";

export class InlineFormattingToolBold implements ITool {
    public id: ToolId;
    public command: IConstructor<AncoraCommand>;
    public ui: IToolUI;

    public constructor() {
        this.id = ToolIdMap.bold;
        this.command = undefined;
        this.ui =  {
            description: "Formats a selected text in bold",
            icon: { id: IconNameMap.bold, },
            label: "Bold",
            type: "button",
        };
    }
};
