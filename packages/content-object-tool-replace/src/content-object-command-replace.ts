import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { ContentObjectFactory } from "@pennacchi/core-content-object/dist/content-object-factory"

export class ContentObjectCommandReplace extends AncoraCommand {
    private __childToReplace: IContentObject;
    private __replacementSubtype: string;
    private __replacement: IContentObject;

    public addToHistory: boolean;

    public constructor(childToReplace: IContentObject, replacementSubtype: string) {
        super();
        this.__childToReplace = childToReplace;
        this.__replacementSubtype = replacementSubtype;
        this.addToHistory = false;

        const contentObjectFactory = ContentObjectFactory.createOrGetInstance();

        this.__replacement = contentObjectFactory.createBySubtype(this.__replacementSubtype, this.__childToReplace.contents);
    }

    public do(): void {
        this.__childToReplace.replaceWith(this.__replacement);
        return;
    }

    public undo(): void {
        throw new Error("Method not implemented.");
    }
};

