import { EditorGUIElement } from "../editor-gui-element";
import { EventMapCore } from "@pennacchi/core/dist/maps/event-map-core";
import { getObjectProperty } from "@pennacchi/core/dist/utilities/getObjectProperty";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IEditor } from "../editor/i-editor";
import { IEditorToolbar } from "./i-editor-toolbar";
import { IEditorToolbarOptions } from "./i-editor-toolbar-options";
import { PositionName } from "@pennacchi/core/dist/types/position-name";
import { property } from "lit/decorators.js";

export abstract class EditorToolbar extends EditorGUIElement implements IEditorToolbar {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    @property({attribute: "position", type: String, reflect: true })
    private __position: PositionName;

    private __contentObjectFocused?: IContentObject;
    private readonly __editor: IEditor;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(editor: IEditor, options: IEditorToolbarOptions) {
        super(options);
        this.__editor = editor;
        this.__position = getObjectProperty<PositionName>(options, "position", "bottom-left");
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get contentObjectFocused(): IContentObject {
        return this.__contentObjectFocused;
    }

    public get editor(): IEditor {
        return this.__editor;
    }

    public get position(): PositionName {
        return this.__position;
    }

    public hasContentObjectFocused(): boolean {
        return !!this.__contentObjectFocused;
    }

    public override attributeChangedCallback(name: string, valueOld: string, valueNew: string): void {
        super.attributeChangedCallback(name, valueOld, valueNew);

        if (name === "position") {
            this.DOMApi.replaceClass(valueOld, valueNew);
            return;
        }
    }

    public calculatePosition(): IEditorToolbar {
        if (!this.hasContentObjectFocused())
            return this;

        const coPosOnPage = this.contentObjectFocused.DOMApi.getPositionOnPage();

        let positionCSS = "position: absolute; ";

        switch(this.position) {
            case "bottom-left": {
                positionCSS += `left: ${coPosOnPage.bottomLeft.x}px; top: ${coPosOnPage.bottomLeft.y}px;`;
                break;
            }

            case "bottom-right": {
                positionCSS += `right: ${coPosOnPage.bottomRight.x}px; top: ${coPosOnPage.bottomRight.y}px;`;
                break;
            }

            case "top-left": {
                positionCSS += `left: ${coPosOnPage.topLeft.x}px; top: ${coPosOnPage.topLeft.y}px;`;
                break;
            }

            case "top-right": {
                positionCSS += `right: ${coPosOnPage.topRight.x}px; top: ${coPosOnPage.topRight.y}px;`;
                break;
            }

            default: {
                positionCSS += `left: ${coPosOnPage.bottomLeft.x}px; top: ${coPosOnPage.bottomLeft.y}px;`;
            }
        }

        this.style.cssText = positionCSS;

        return this;
    }

    public override hide(): IEditorToolbar | undefined {
        this.removeEventListeners().resetState();
        super.hide();
        return this;
    }

    public override show(contentObjectFocused: IContentObject): IEditorToolbar | undefined {
        if (!contentObjectFocused)
            return undefined;

        if (this.__contentObjectFocused)
            this.__contentObjectFocused.DOMApi.removeClass("pnncch-co--toolbar-attached");

        this.__contentObjectFocused = contentObjectFocused;
        this.__contentObjectFocused.DOMApi.addClass("pnncch-co--toolbar-attached");
        this.registerEventListeners();
        super.show();
        return this.calculatePosition();
    }


    /* -------------------------------------------------------------------------- */
    /*                               PRIVATE METHODS                              */
    /* -------------------------------------------------------------------------- */

    private registerEventListeners(): EditorToolbar {
        if (!this.__contentObjectFocused)
            return this;

        this.__contentObjectFocused.DOMApi.addEventListener(
            EventMapCore["pnncch::resize"],
            (event: Event): void => {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        );

        return this;
    }

    private removeEventListeners(): EditorToolbar {
        if (!this.__contentObjectFocused)
            return this;

        this.__contentObjectFocused.DOMApi.removeEventListener(
            EventMapCore["pnncch::resize"],
            (event: Event): void => {}
        );

        return this;
    }

    private resetState(): EditorToolbar {
        if (!this.__contentObjectFocused)
            return this;

        this.__contentObjectFocused.DOMApi.removeClass("pnncch-co--toolbar-attached");
        this.__contentObjectFocused = undefined;
        this.style.cssText = "";
        return this;
    }
};
