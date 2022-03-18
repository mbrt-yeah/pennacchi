import { ContentObjectToolbarClassName } from "@pennacchi/core/dist/statics";
import { customElement } from "lit/decorators.js";
import { Editor } from "../editor/editor";
import { getObjectProperty } from "@pennacchi/core/dist/utilities/getObjectProperty";
import { html, TemplateResult } from "lit";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { EditorToolbar } from "../editor-toolbar/editor-toolbar";
import { IEditorToolbarInlineFormatting } from "./i-editor-toolbar-inline-formatting";
import { IEditorToolbarInlineFormattingOptions } from "./i-editor-toolbar-inline-formatting-options";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";

declare global {
    interface HTMLElementTagNameMap {
        "pnncch-editor-toolbar-inline-formatting": EditorToolbarInlineFormatting;
    }
}

@customElement("pnncch-editor-toolbar-inline-formatting")
export class EditorToolbarInlineFormatting extends EditorToolbar implements IEditorToolbarInlineFormatting {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __toolsGlobal: ITool[];
    private __toolsFinal: ITool[];

    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(editor: Editor, options: IEditorToolbarInlineFormattingOptions) {
        super(editor, options);
        this.__toolsGlobal = getObjectProperty<ITool[]>(editor, "options.toolsInlineFormatting", []);
    }


    /* -------------------------------------------------------------------------- */
    /*                                  RENDERING                                 */
    /* -------------------------------------------------------------------------- */

    public override render(): TemplateResult {
        if (!this.hasContentObjectFocused())
            return html``;

        this.DOMApi.addClass(ContentObjectToolbarClassName);

        return html`<menu><li>Toolbar Inline Formatting</li></menu>`;
    }


    /* -------------------------------------------------------------------------- */
    /*                          USER INTERACTION HANDLING                         */
    /* -------------------------------------------------------------------------- */


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public override show(contentObjectFocused: IContentObject): IEditorToolbarInlineFormatting {
        this.__toolsFinal = [...this.__toolsGlobal, ...contentObjectFocused.toolbarInlineFormattingTools];
        super.show(contentObjectFocused);
        return this;
    }
};
