import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";

export class ContentObjectCommandMoveUp extends AncoraCommand {
    private __contentObject: IContentObject;
    public addToHistory: boolean;

    public constructor(contentObject: IContentObject) {
        super();
        this.__contentObject = contentObject;
        this.addToHistory = true;
    }

    public do(): void {
        this.__contentObject.DOMApi.moveUp();
        return;
    }

    public undo(): void {
        return;
    }
};
