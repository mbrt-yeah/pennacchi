import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { ContentObjectCommandReplace } from "./content-object-command-replace";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUI } from "@pennacchi/core/dist/tool/i-tool-ui";
import { IToolUiChoiceValue } from "@pennacchi/core/dist/tool/i-tool-ui-choice-value";
import { ToolId } from "@pennacchi/core/dist/tool/tool-id";
import { ToolIdMap } from "@pennacchi/core/dist/tool/tool-id-map";

export class ContentObjectToolReplace implements ITool {
    public id: ToolId;
    public command: IConstructor<AncoraCommand>;
    public ui: IToolUI;

    public constructor(values: IToolUiChoiceValue[] = []) {
        this.id = ToolIdMap.replace;
        this.command = ContentObjectCommandReplace;
        this.ui =  {
            type: "dropdown",
            description: "Replaces this content object",
            label: "Replace",
            values,
        };
    }
};
