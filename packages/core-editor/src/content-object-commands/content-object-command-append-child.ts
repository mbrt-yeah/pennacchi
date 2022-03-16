import { ContentObjectCommand } from "./content-object-command";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IGUIElement } from "@pennacchi/core/dist/gui-element/i-gui-element";

export class ContentObjectCommandAppendChild extends ContentObjectCommand {
    private __childToAppend: IContentObject;
    private __parent: IContentObject | IGUIElement;

    public constructor(parent: IContentObject | IGUIElement, childToAppend: IContentObject) {
        super();
        this.__childToAppend = childToAppend;
        this.__parent = parent;
    }

    public do(): void {
        this.__parent.DOMApi.appendChild(this.__childToAppend);
        this.__childToAppend.focus();
        return;
    }

    public undo(): void {
        this.__childToAppend.focus();
        this.__parent.removeChild(this.__childToAppend);
        return;
    }
};
