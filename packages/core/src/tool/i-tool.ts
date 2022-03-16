import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { IConstructor } from "../interfaces/i-constructor";
import { IToolUI } from "./i-tool-ui";
import { ToolId } from "./tool-id";

export interface ITool {
    id: ToolId;
    command: IConstructor<AncoraCommand>;
    ui: IToolUI;
};
