import { computePosition } from "@floating-ui/dom";
import { EditorGUIElement } from "../editor-gui-element";
import { EventMapCore } from "@pennacchi/core/dist/maps/event-map-core";
import { getObjectProperty } from "@pennacchi/core/dist/utilities/getObjectProperty";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IEditor } from "../editor/i-editor";
import { IEditorToolbar } from "./i-editor-toolbar";
import { IEditorToolbarOptions } from "./i-editor-toolbar-options";
import { Placement } from "@pennacchi/core/dist/types/placement";
import { PlacementRelativeTo } from "@pennacchi/core/dist/types/placement-relative-to";
import { property } from "lit/decorators.js";

export abstract class EditorToolbar extends EditorGUIElement implements IEditorToolbar {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    @property({attribute: "placement", type: String, reflect: true })
    private __placement: Placement;

    private __contentObjectFocused?: IContentObject;
    private readonly __editor: IEditor;
    private readonly __placementRelativeTo: PlacementRelativeTo;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(editor: IEditor, options: IEditorToolbarOptions) {
        super(options);
        this.__editor = editor;
        this.__placement = getObjectProperty<Placement>(options, "placement", "bottom-start");
        this.__placementRelativeTo = getObjectProperty<PlacementRelativeTo>(options, "placementRelativeTo", "content-object");
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get contentObjectFocused(): IContentObject | undefined {
        return this.__contentObjectFocused;
    }

    public get editor(): IEditor | undefined {
        return this.__editor;
    }

    public get placement(): Placement {
        return this.__placement;
    }

    public get placementRelativeTo(): PlacementRelativeTo {
        return this.__placementRelativeTo;
    }

    public hasContentObjectFocused(): boolean {
        return !!this.__contentObjectFocused;
    }

    public override attributeChangedCallback(name: string, valueOld: string, valueNew: string): void {
        super.attributeChangedCallback(name, valueOld, valueNew);

        if (name === "placement") {
            this.DOMApi.replaceClass(valueOld, valueNew);
            return;
        }
    }

    public updatePlacement(): IEditorToolbar | undefined {
        if (!this.__contentObjectFocused)
            return undefined;

        let reference: HTMLElement;

        if (this.__placementRelativeTo === "content-object") {
            reference = this.__contentObjectFocused;
        } else {
            reference = this.__contentObjectFocused.textSelection.selectionRaw.anchorNode as HTMLElement;

            if (reference.nodeType !== 1)
                reference = reference.parentElement;
        }

        computePosition(reference, this, {
            placement: this.__placement,
        })
            .then((result) => {
                this.style.cssText = `position: absolute; left: ${result.x}px; top: ${result.y}px;`;
            })

        return this;
    }

    public override hide(): IEditorToolbar | undefined {
        this.removeEventListeners().resetState();
        super.hide("collapse");
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

        return this.updatePlacement();
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
