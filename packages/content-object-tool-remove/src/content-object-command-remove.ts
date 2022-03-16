import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";

export class ContentObjectCommandRemove extends AncoraCommand {
    private __childToRemove: IContentObject;
    private __parent: IContentObject | HTMLElement;
    public addToHistory: boolean;

    public constructor(childToRemove: IContentObject) {
        super();
        this.__childToRemove = childToRemove;
        this.__parent = childToRemove.parentElement;
        this.addToHistory = true;
    }

    public do(): void {
        this.__parent.removeChild(this.__childToRemove);
        return;
    }

    public undo(): void {
        throw new Error("Method not implemented");
    }
};

