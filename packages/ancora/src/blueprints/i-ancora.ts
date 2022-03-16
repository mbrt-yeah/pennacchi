import { AncoraCommand } from "./ancora-command";

export interface IAncora {
    get limit(): number;
    execCommand(command: AncoraCommand): any;
    redoCommand(): any;
    undoCommand(): any;
};
