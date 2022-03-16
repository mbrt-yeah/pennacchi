import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { ContentObjectCommandRemove } from "./content-object-command-remove";
import { IconNameMap } from "@pennacchi/core/dist/maps/icon-name-map";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUI } from "@pennacchi/core/dist/tool/i-tool-ui";
import { ToolId } from "@pennacchi/core/dist/tool/tool-id";
import { ToolIdMap } from "@pennacchi/core/dist/tool/tool-id-map";

export class ContentObjectToolRemove implements ITool {
    public id: ToolId;
    public command: IConstructor<AncoraCommand>;
    public ui: IToolUI;

    public constructor() {
        this.id = ToolIdMap.remove;
        this.command = ContentObjectCommandRemove;
        this.ui = {
            description: "Removes this content object",
            icon: { id: IconNameMap.trashBin, },
            label: "Remove",
            type: "button",
        };
    }
};
