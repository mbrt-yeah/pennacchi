import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { ContentObjectCommandMoveUp } from "./content-object-command-move-up";
import { IconNameMap } from "@pennacchi/core/dist/maps/icon-name-map";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUI } from "@pennacchi/core/dist/tool/i-tool-ui";
import { ToolId } from "@pennacchi/core/dist/tool/tool-id";
import { ToolIdMap } from "@pennacchi/core/dist/tool/tool-id-map";

export class ContentObjectToolMoveUp implements ITool {
    public id: ToolId;
    public command: IConstructor<AncoraCommand>;
    public ui: IToolUI;

    public constructor() {
        this.id = ToolIdMap.moveup;
        this.command = ContentObjectCommandMoveUp;
        this.ui = {
            description: "Moves this content object up",
            icon: { id: IconNameMap.arrowUp, },
            label: "Move Up",
            type: "button",
        };
    }
};
