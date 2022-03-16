import { EditorGUIElement } from "../editor-gui-element";
import { IEditorMenu } from "./i-editor-menu";
import { IEditorMenuOptions } from "./i-editor-menu-options";
import { state } from "lit/decorators.js";

export abstract class EditorMenu extends EditorGUIElement implements IEditorMenu {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    @state()
    private __isMenuOpen: boolean;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(options: IEditorMenuOptions) {
        super(options);
        this.__isMenuOpen = false;
        this.DOMApi.addClass("menu-closed");
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get isMenuOpen(): boolean {
        return this.__isMenuOpen;
    }

    public openMenu(): void {
        this.DOMApi.removeClass("menu-closed");
        this.DOMApi.addClass("menu-open");
        this.__isMenuOpen = true;
    }

    public closeMenu(): void {
        this.DOMApi.removeClass("menu-open");
        this.DOMApi.addClass("menu-closed");
        this.__isMenuOpen = false;
    }
};
