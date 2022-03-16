import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { ContentObjectCommandMoveDown } from "./content-object-command-move-down";
import { IconNameMap } from "@pennacchi/core/dist/maps/icon-name-map";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUI } from "@pennacchi/core/dist/tool/i-tool-ui";
import { ToolId } from "@pennacchi/core/dist/tool/tool-id";
import { ToolIdMap } from "@pennacchi/core/dist/tool/tool-id-map";

export class ContentObjectToolMoveDown implements ITool {
    public id: ToolId;
    public command: IConstructor<AncoraCommand>;
    public ui: IToolUI;

    public constructor() {
        this.id = ToolIdMap.movedown;
        this.command = ContentObjectCommandMoveDown;
        this.ui = {
            description: "Moves this content object down",
            icon: { id: IconNameMap.arrowDown, },
            label: "Move Down",
            type: "button",
        };
    }
};
