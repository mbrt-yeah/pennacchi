import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { customElement } from "lit/decorators.js";
import { EditorMenu } from "../editor-menu/editor-menu";
import { EditorMenuPrimaryClassName } from "@pennacchi/core/dist/statics";
import { html, TemplateResult } from "lit";
import { IconNameMap } from "@pennacchi/core/dist/maps/icon-name-map";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { IEditor } from "../editor/i-editor";
import { IEditorMenuPrimary } from "./i-editor-menu-primary";
import { IEditorTool } from "../editor/i-editor-tool";
import { msg } from "@lit/localize";
import { renderTool } from "@pennacchi/component-library/dist/utilities/render-tool";

import "@pennacchi/component-library/dist/buttons/button";
import "@pennacchi/component-library/dist/buttons/button-group";
import "@pennacchi/component-library/dist/icons/icon-svg";

declare global {
    interface HTMLElementTagNameMap {
        "pnncch-editor-menu-primary": EditorMenuPrimary;
    }
}

@customElement("pnncch-editor-menu-primary")
export class EditorMenuPrimary extends EditorMenu implements IEditorMenuPrimary {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private readonly __editor: IEditor;

    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(editor: IEditor) {
        super(editor.options.ui.menuPrimary);
        this.__editor = editor;
    }


    /* -------------------------------------------------------------------------- */
    /*                                  RENDERING                                 */
    /* -------------------------------------------------------------------------- */

    public override render = (): TemplateResult => {
        this.DOMApi.addClass(EditorMenuPrimaryClassName);

        return html`
            ${this.renderMenuButtonOpen()}
            ${this.renderMenuButtonClose()}
            ${this.renderMenu()}
        `;
    }

    private renderMenu = (): TemplateResult => {
        if (!this.isMenuOpen || !this.__editor.hasTools())
            return html``;

        return html`
            <menu class="${EditorMenuPrimaryClassName}__menu">
                ${this.__editor.options.tools.map((tool: IEditorTool) =>
                    html`<li>${renderTool(tool, this.onToolClick)}</li>`
                )}
            </menu>
        `;
    }

    private renderMenuButtonOpen = (): TemplateResult => {
        if (this.isMenuOpen)
            return html``;

        return html`<pnncch-button
            @click="${() => this.openMenu()}"
            class="${EditorMenuPrimaryClassName}__button-open"
            direction="ltr"
            size="l"
        >
            <pnncch-icon-svg iconid="${IconNameMap.menu}" size="l" slot="prefix"></pnncch-icon-svg>
            <span class="sr-only" slot="label">${msg("Open Menu")}</span>
        </pnncch-button>`;
    }

    private renderMenuButtonClose = (): TemplateResult => {
        if (!this.isMenuOpen)
            return html``;

        return html`<pnncch-button
            @click="${() => this.closeMenu()}"
            class="${EditorMenuPrimaryClassName}__button-close"
            direction="ltr"
            size="l"
        >
            <pnncch-icon-svg iconid="${IconNameMap.x}" size="l" slot="prefix"></pnncch-icon-svg>
            <span class="sr-only" slot="label">${msg("Close Menu")}</span>
        </pnncch-button>`;
    }


    /* -------------------------------------------------------------------------- */
    /*                          USER INTERACTION HANDLING                         */
    /* -------------------------------------------------------------------------- */

    private onToolClick = (command: IConstructor<AncoraCommand>, value?: string): void => {
        return this.executeCommand( new command(this.__editor, value) );
    }
};
