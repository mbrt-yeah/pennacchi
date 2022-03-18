import { BooleanString } from "@pennacchi/core/dist/types/boolean-string";
import { ContentObjectCommandInsertSiblingAfter } from "../content-object-commands/content-object-command-insert-sibling-after";
import { ContentObjectSubtype } from "@pennacchi/core-content-object/dist/content-object-subtype";
import { customElement } from "lit/decorators.js";
import { EditorCanvas } from "../editor-canvas/editor-canvas";
import { EditorClassName } from "@pennacchi/core/dist/statics";
import { EditorGUIElement } from "../editor-gui-element";
import { EditorMenuPrimary } from "../editor-menu-primary/editor-menu-primary";
import { EditorMenuSecondary } from "../editor-menu-secondary/editor-menu-secondary";
import { EditorToolbarContentObject } from "../editor-toolbar-content-object/editor-toolbar-content-object";
import { EditorToolbarContentToggleStrategy } from "../editor-toolbar-content-object/editor-toolbar-content-toggle-strategy";
import { EditorToolbarInlineFormatting } from "../editor-toolbar-inline-formatting/editor-toolbar-inline-formatting";
import { EditorToolbarInlineToggleStrategy } from "../editor-toolbar-inline-formatting/editor-toolbar-inline-toggle-strategy";
import { EventMapCore } from "@pennacchi/core/dist/maps/event-map-core";
import { getObjectProperty } from "@pennacchi/core/dist/utilities/getObjectProperty";
import { IEditor } from "./i-editor";
import { IEditorOptions } from "./i-editor-options";
import { IEditorToolbarContentObject } from "../editor-toolbar-content-object/i-editor-toolbar-content-object";
import { IEditorToolbarInlineFormatting } from "../editor-toolbar-inline-formatting/i-editor-toolbar-inline-formatting";

import "@pennacchi/component-library/dist/buttons/button";
import "@pennacchi/component-library/dist/icons/icon-svg";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { EditorEventHandlingStrategy } from "./editor-event-handling-strategy";

@customElement("pnncch-editor")
export class Editor extends EditorGUIElement implements IEditor {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private readonly __mountPointSelector: string;
    private readonly __options: IEditorOptions;

    private __canvas: EditorCanvas;
    private __menuPrimary?: EditorMenuPrimary;
    private __menuSecondary?: EditorMenuSecondary;
    private __mountPoint: HTMLElement;
    private __toolbarContentObject?: IEditorToolbarContentObject;
    private __toolbarInlineFormatting?: IEditorToolbarInlineFormatting;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(mountPointSelector: string, options: IEditorOptions) {
        super(options, options);

        this.__mountPointSelector = mountPointSelector;
        this.__options = options;
        this.mount();
    }

    private mount(): void {
        const mountPoint = document.querySelector<HTMLElement>(this.__mountPointSelector);

        if (!mountPoint){
            const error = new Error(`[Editor#mount] An error occured`);
            error.message = `No mount point for selector >${this.__mountPointSelector}< found.`;
            throw error;
        }

        this.__mountPoint = mountPoint;
        this.__mountPoint.appendChild(this);
    }

    public override connectedCallback() {
        super.connectedCallback();
        this.registerEventListener();
    }

    private registerEventListener(): Editor {
        [
            "click",
            "dblclick",
            "mouseup",
            EventMapCore["pnncch::click"],
            EventMapCore["pnncch::keydown"],
            EventMapCore["pnncch::keyup"],
            EventMapCore["pnncch::selectionchange"],
            EventMapCore["pnncch::selectstart"]
        ].forEach((eventName: string) => {
            document.addEventListener((eventName), (event: Event) => {
                event.preventDefault();
                event.stopPropagation();

                EditorToolbarContentToggleStrategy.execute(event, this);
                EditorToolbarInlineToggleStrategy.execute(event, this);
                EditorEventHandlingStrategy.execute(event, this);
            });
        });

        return this;
    }


    /* -------------------------------------------------------------------------- */
    /*                                  RENDERING                                 */
    /* -------------------------------------------------------------------------- */

    public override createRenderRoot(): Element | ShadowRoot {
        if (this.__options && this.__options.DOMType === "shadow")
            return super.createRenderRoot();

        return this;
    }

    public override render() {
        this.DOMApi.addClass(EditorClassName);
        this.__menuPrimary = this.renderMenuPrimary(this);
        this.__canvas = this.renderCanvas(this);
        this.__menuSecondary = this.renderMenuSecondary(this);
        this.__toolbarContentObject = this.renderToolbarContentObject(this);
        this.__toolbarInlineFormatting = this.renderToolbarInlineFormatting(this);
        return this;
    }

    private renderCanvas(editorWrapper: HTMLElement): EditorCanvas {
        const editorCanvas = new EditorCanvas();
        editorWrapper.appendChild(editorCanvas);
        return editorCanvas;
    }

    private renderMenuPrimary(editorWrapper: HTMLElement): EditorMenuPrimary | undefined {
        if ( !this.isMenuPrimaryActivated() )
            return undefined;

        const editorMenuPrimary = new EditorMenuPrimary(this);

        editorWrapper.appendChild(editorMenuPrimary);

        return editorMenuPrimary;
    }

    private renderMenuSecondary(editorWrapper: HTMLElement): EditorMenuSecondary | undefined {
        if ( !this.isMenuSecondaryActivated() || !this.hasAllowedContentObjects() )
            return undefined;

        const editorMenuSecondary = new EditorMenuSecondary(this);

        editorWrapper.appendChild(editorMenuSecondary);

        return editorMenuSecondary;
    }

    private renderToolbarContentObject(editorWrapper: HTMLElement): IEditorToolbarContentObject | undefined {
        if ( !this.isToolbarContentObjectActived() )
            return undefined;

        const toolbarContentObject = new EditorToolbarContentObject(
            this,
            this.__options.ui.toolbarContentObject,
        );

        editorWrapper.appendChild(toolbarContentObject);
        return toolbarContentObject;
    }

    private renderToolbarInlineFormatting(editorWrapper: HTMLElement): IEditorToolbarInlineFormatting | undefined {
        if ( !this.isToolbarInlineFormattingActived() )
            return undefined;

        const toolbarInlineFormatting = new EditorToolbarInlineFormatting(
            this,
            this.__options.ui.toolbarInlineFormatting,
        );

        editorWrapper.appendChild(toolbarInlineFormatting);
        return toolbarInlineFormatting;
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get canvas(): EditorCanvas {
        return this.__canvas;
    }

    public get toolbarContentObject(): IEditorToolbarContentObject | undefined {
        return this.__toolbarContentObject;
    }

    public get toolbarInlineFormatting(): IEditorToolbarInlineFormatting | undefined {
        return this.__toolbarInlineFormatting;
    }

    public get menuPrimary(): EditorMenuPrimary | undefined {
        return this.__menuPrimary;
    };

    public get menuSecondary(): EditorMenuSecondary | undefined {
        return this.__menuSecondary;
    }

    public get mountPoint(): HTMLElement {
        return this.__mountPoint;
    }

    public get options(): IEditorOptions {
        return this.__options;
    }

    public hasAllowedContentObjects(): boolean {
        return this.__options && this.__options.allowedContentObjects && this.__options.allowedContentObjects.length > 0;
    }

    public hasPersistenceAdapters(): boolean {
        return this.__options && this.__options.persistenceAdapters && this.__options.persistenceAdapters.length > 0;
    }

    public hasTools(): boolean {
        return this.__options && this.__options.tools && this.__options.tools.length > 0;
    }

    public isMenuPrimaryActivated(): boolean {
        return getObjectProperty<BooleanString>(this.options, "ui.menuPrimary.activated", "true") === "true";
    }

    public isMenuSecondaryActivated(): boolean {
        return getObjectProperty<BooleanString>(this.options, "ui.menuSecondary.activated", "true") === "true";
    }

    public isToolbarContentObjectActived(): boolean {
        return getObjectProperty<BooleanString>(this.options, "ui.toolbarContentObject.activated", "true") === "true";
    }

    public isToolbarInlineFormattingActived(): boolean {
        return getObjectProperty<BooleanString>(this.options, "ui.toolbarInlineFormatting.activated", "true") === "true";
    }

    public insertContentObjectAfter(
        contentObjectBefore: IContentObject,
        contentObjectAfterType: ContentObjectSubtype
    ): void {
        const contentObjectAfter = this.createContentObject(contentObjectAfterType);

        if (!contentObjectAfter)
            return;

        return this.executeCommand(
            new ContentObjectCommandInsertSiblingAfter(
                contentObjectBefore, contentObjectAfter
            )
        );
    }
};
