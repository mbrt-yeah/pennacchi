import { ContentObjectToolbarClassName } from "@pennacchi/core/dist/statics";
import { customElement } from "lit/decorators.js";
import { Editor } from "../editor/editor";
import { EditorToolbar } from "../editor-toolbar/editor-toolbar";
import { getObjectProperty } from "@pennacchi/core/dist/utilities/getObjectProperty";
import { html, TemplateResult } from "lit";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IEditorToolbarInlineFormatting } from "./i-editor-toolbar-inline-formatting";
import { IEditorToolbarInlineFormattingOptions } from "./i-editor-toolbar-inline-formatting-options";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUiChoiceValue } from "@pennacchi/core/dist/tool/i-tool-ui-choice-value";
import { msg } from "@lit/localize";

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
        if (!this.hasContentObjectFocused() 
            || !this.__toolsFinal
            || this.__toolsFinal.length === 0
        ) 
            return undefined;

        this.DOMApi.addClass(ContentObjectToolbarClassName);

        return html`<menu>
            ${
                this.__toolsFinal.map((tool: ITool) =>
                    html`<li>${this.renderTool(tool)}</li>`
                )
            }
        </menu>`;
    }

    private renderTool(tool: ITool): TemplateResult {
        if (tool.ui.type === "button")
            return this.renderToolAsButton(tool);

        if (tool.ui.type === "dropdown")
            return this.renderToolAsDropdown(tool);

        const error = new Error("[EditorToolbarInlineFormatting#renderTool] An error occured");
        error.message = `Cannot render unknown tool type >${tool.ui.type}<.`;
        throw error;
    }

    private renderToolAsButton(tool: ITool): TemplateResult {
        return html`<pnncch-button>
            ${ this.renderToolIcon(tool) }
            <span slot="label">${ msg(tool.ui.label) }</span>
        </pnncch-button>`;
    }

    private renderToolAsDropdown(tool: ITool): TemplateResult {
        if (!tool.ui.values || tool.ui.values.length <= 0) {
            const error = new Error("[EditorToolbarInlineFormatting#renderToolAsDropdown] An error occured");
            error.message = `No dropdown values defined`;
            throw error;
        }

        return html`
            <select>
                <option selected disabled>${tool.ui.label}</option>
                ${tool.ui.values.map((value: IToolUiChoiceValue) => 
                    html`<option value="${value.label}">${msg(value.label)}</option>`
                )}
            </select>
        `;
    }

    private renderToolIcon(tool: ITool): TemplateResult {
        if ( !tool.ui.icon || !tool.ui.icon.id )
            return html``;

        return html`<pnncch-icon-svg 
            iconid="${tool.ui.icon.id}"
            size="s"
            slot="prefix"
        ></pnncch-icon-svg>`;
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
