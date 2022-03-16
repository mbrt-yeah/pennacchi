import { customElement } from "lit/decorators.js";
import { EditorMenu } from "../editor-menu/editor-menu";
import { EditorMenuSecondaryClassName } from "@pennacchi/core/dist/statics";
import { html, TemplateResult } from "lit";
import { IContentObjectDefinition } from "@pennacchi/core-content-object/dist/i-content-object-definition";
import { IEditor } from "../editor/i-editor";
import { IEditorMenuSecondary } from "./i-editor-menu-secondary";
import { IEditorMenuSecondaryOptions } from "./i-editor-menu-secondary-options";
import { msg } from "@lit/localize";

import "@pennacchi/component-library/dist/buttons/button";
import "@pennacchi/component-library/dist/icons/icon-svg";

declare global {
    interface HTMLElementTagNameMap {
        "pnncch-editor-menu-secondary": EditorMenuSecondary;
    }
}

@customElement("pnncch-editor-menu-secondary")
export class EditorMenuSecondary extends EditorMenu implements IEditorMenuSecondary {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __editor: IEditor;


    /* -------------------------------------------------------------------------- */
    /*                                 CONSTRUCTOR                                */
    /* -------------------------------------------------------------------------- */

    public constructor(editor: IEditor) {
        super(editor.options?.ui?.menuSecondary);
        this.__editor = editor;
    }


    /* -------------------------------------------------------------------------- */
    /*                                  RENDERING                                 */
    /* -------------------------------------------------------------------------- */

    public override render(): TemplateResult {
        if (!this.__editor.hasAllowedContentObjects())
            return html``;

        this.DOMApi.addClass(EditorMenuSecondaryClassName);

        return html`
            ${this.renderMenuButtonOpen()}
            ${this.renderMenu()}
            ${this.renderMenuButtonClose()}
        `;
    }

    private renderMenuButtonOpen(): TemplateResult {
        if (this.isMenuOpen)
            return html``;

        return html`<pnncch-button
            @click="${() => this.openMenu()}"
            class="${EditorMenuSecondaryClassName}__button-open"
            direction="ltr"
            size="m"
        >
            <pnncch-icon-svg iconid="plus" size="m" slot="prefix"></pnncch-icon-svg>
            <span slot="label">${msg("Add New Block")}</span>
        </pnncch-button>`;
    }

    private renderMenuButtonClose(): TemplateResult {
        if (!this.isMenuOpen)
            return html``;

        return html`<pnncch-button
            @click="${() => super.closeMenu()}"
            class="${EditorMenuSecondaryClassName}__button-close"
            direction="ltr"
            size="m"
        >
            <pnncch-icon-svg iconid="x" size="m" slot="prefix"></pnncch-icon-svg>
            <span slot="label">${msg("Close Menu")}</span>
        </pnncch-button>`;
    }

    private renderMenu(): TemplateResult {
        if (!super.isMenuOpen)
            return html``;

        return html`<menu class="${EditorMenuSecondaryClassName}__menu">
            ${this.__editor.options.allowedContentObjects.map((entry: IContentObjectDefinition) =>
                this.renderMenuElement(entry)
            )}
        </menu>`;
    }

    private renderMenuElement(entry: IContentObjectDefinition): TemplateResult {
        return html`<li>
            <pnncch-button 
                @click="${
                    (e: MouseEvent) => this.onAddNewBlockClick(e, entry.subtype)
                }"
                direction="ttb"
                size="m"
            >
                <pnncch-icon-svg 
                    iconid="${entry.subtype}"
                    size="l" 
                    slot="prefix"
                ></pnncch-icon-svg>
                <span slot="label">${msg(entry.subtype)}</span>
            </pnncch-button>
        </li>`
    }


    /* -------------------------------------------------------------------------- */
    /*                          USER INTERACTION HANDLING                         */
    /* -------------------------------------------------------------------------- */

    private onAddNewBlockClick(event: MouseEvent, contentObjectSubtype: string): void {
        event.preventDefault();
        event.stopPropagation();
        this.__editor.canvas.appendContentObject(contentObjectSubtype);
        super.closeMenu();
        return;
    }
};
