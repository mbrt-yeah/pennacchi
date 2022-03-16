import { ContentObjectCommand } from "./content-object-command";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";

export class ContentObjectCommandInsertSiblingAfter extends ContentObjectCommand {
    private __siblingBefore: IContentObject;
    private __siblingToInsertAfter: IContentObject;

    public constructor(siblingBefore: IContentObject, siblingToInsertAfter: IContentObject) {
        super();
        this.__siblingBefore = siblingBefore;
        this.__siblingToInsertAfter = siblingToInsertAfter;
    }

    public do(): void {
        this.__siblingBefore.DOMApi.insertSiblingAfter(this.__siblingToInsertAfter);
        this.__siblingToInsertAfter.focus();
        return;
    }

    public undo(): void {
        this.__siblingToInsertAfter.focus();
        this.__siblingBefore.removeChild(this.__siblingToInsertAfter);
        return;
    }
};
