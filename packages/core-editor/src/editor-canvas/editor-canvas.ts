import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { ContentObjectCommandAppendChild } from "../content-object-commands/content-object-command-append-child";
import { ContentObjectSubtypeMap } from "@pennacchi/core-content-object/dist/content-object-subtype-map";
import { createUniqueId } from "@pennacchi/core/dist/utilities/create-unique-id";
import { customElement } from "lit/decorators.js";
import { EditorCanvasClassName } from "@pennacchi/core/dist/statics";
import { EditorGUIElement } from "../editor-gui-element";
import { html, TemplateResult} from "lit";
import { IContentObjectJsonSerialization } from "@pennacchi/core-content-object/dist/i-content-object-json-serialization";
import { IDocument } from "@pennacchi/core/dist/interfaces/i-document";
import { IEditorCanvas } from "./i-editor-canvas";
import { IEditorCanvasOptions } from "./i-editor-canvas-options";

import "@pennacchi/component-library/dist/buttons/button";
import "@pennacchi/component-library/dist/icons/icon-svg";

declare global {
    interface HTMLElementTagNameMap {
        "pnncch-editor-canvas": EditorCanvas;
    }
}

@customElement("pnncch-editor-canvas")
export class EditorCanvas extends EditorGUIElement implements IEditorCanvas {

    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(options?: IEditorCanvasOptions) {
        super(options);
    }


    /* -------------------------------------------------------------------------- */
    /*                                  RENDERING                                 */
    /* -------------------------------------------------------------------------- */

    public override render(): TemplateResult {
        this.DOMApi.addClass(EditorCanvasClassName);

        return html``;
    }

    public override connectedCallback() {

        this.executeCommand(
            new ContentObjectCommandAppendChild(this, this.createContentObject(ContentObjectSubtypeMap.paragraph))
        );

        super.connectedCallback();
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public appendContentObject(contentObjectSubtype: string): void {
        const childToAppend = this.createContentObject(contentObjectSubtype);

        if (!childToAppend)
            return;

        return this.executeCommand(new ContentObjectCommandAppendChild(this, childToAppend));
    }

    public toDocument(name?: string): IDocument {
        return {
            contents: this.toJson(),
            id: createUniqueId(),
            name: `${name || createUniqueId()}.json`,
        };
    }

    public toJson(): IContentObjectJsonSerialization[] {
        const contents: IContentObjectJsonSerialization[] = [];

        for (const childNode of this.childNodes) {
            const contentObject = childNode as ContentObject;

            if (!contentObject || typeof contentObject.toJson !== "function")
                continue;

            contents.push(contentObject.toJson());
        }

        return contents;
    }
};
