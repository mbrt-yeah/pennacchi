import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { ContentObjectToolbarClassName } from "@pennacchi/core/dist/statics";
import { customElement } from "lit/decorators.js";
import { EditorToolbar } from "../editor-toolbar/editor-toolbar";
import { getObjectProperty } from "@pennacchi/core/dist/utilities/getObjectProperty";
import { html, TemplateResult } from "lit";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IEditor } from "../editor/i-editor";
import { IEditorToolbarContentObject } from "./i-editor-toolbar-content-object";
import { IEditorToolbarContentObjectOptions } from "./i-editor-toolbar-content-object-options";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { IToolUiChoiceValue } from "@pennacchi/core/dist/tool/i-tool-ui-choice-value";
import { msg } from "@lit/localize";

declare global {
    interface HTMLElementTagNameMap {
        "pnncch-editor-toolbar-content-object": EditorToolbarContentObject;
    }
}

@customElement("pnncch-editor-toolbar-content-object")
export class EditorToolbarContentObject extends EditorToolbar implements IEditorToolbarContentObject {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __toolsGlobal: ITool[];
    private __toolsFinal: ITool[];


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(editor: IEditor, options: IEditorToolbarContentObjectOptions) {
        super(editor, options);
        this.__toolsGlobal = getObjectProperty<ITool[]>(editor, "options.toolsContentObject", []);
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

        const error = new Error("[EditorToolbarContentObject#renderTool] An error occured");
        error.message = `Cannot render unknown tool type >${tool.ui.type}<.`;
        throw error;
    }

    private renderToolAsButton(tool: ITool): TemplateResult {
        return html`<pnncch-button
            @click="${ (e: MouseEvent) => this.onClick(e, tool.command) }"
        >
            ${ this.renderToolIcon(tool) }
            <span slot="label">${ msg(tool.ui.label) }</span>
        </pnncch-button>`;
    }

    private renderToolAsDropdown(tool: ITool): TemplateResult {
        if (!tool.ui.values || tool.ui.values.length <= 0) {
            const error = new Error("[EditorToolbarContentObject#renderToolAsDropdown] An error occured");
            error.message = `No dropdown values defined`;
            throw error;
        }

        return html`
            <select @change="${(e: InputEvent) => this.onChange(e, tool.command) }">
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
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public override show(contentObjectFocused: IContentObject): IEditorToolbarContentObject {
        this.__toolsFinal = [...this.__toolsGlobal, ...contentObjectFocused.toolbarTools];
        super.show(contentObjectFocused);
        return this;
    }


    /* -------------------------------------------------------------------------- */
    /*                          USER INTERACTION HANDLING                         */
    /* -------------------------------------------------------------------------- */

    private onClick(event: MouseEvent, command: IConstructor<AncoraCommand>): void {
        event.preventDefault();
        event.stopPropagation();

        if (!this.hasContentObjectFocused()) {
            const error = new Error("[ContentObjectToolbar#onClick] An error occurred");
            error.message = "No focused content object found.";
            throw error;
        }

        this.executeCommand( new command(this.contentObjectFocused) );
        this.hide();

        return;
    }

    private onChange(event: InputEvent, command: IConstructor<AncoraCommand>): void {
        event.preventDefault();
        event.stopPropagation();

        if (!this.hasContentObjectFocused()) {
            const error = new Error("[ContentObjectToolbar#onChange] An error occurred");
            error.message = "No focused content object found.";
            throw error;
        }

        this.executeCommand( new command(this.contentObjectFocused, event.target.value) );
        this.hide();

        return;
    }
};
