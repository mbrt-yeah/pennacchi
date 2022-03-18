import { ContentObjectSubtype } from "@pennacchi/core-content-object/dist/content-object-subtype";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IEditorCanvas } from "../editor-canvas/i-editor-canvas";
import { IEditorMenuPrimary } from "../editor-menu-primary/i-editor-menu-primary";
import { IEditorMenuSecondary } from "../editor-menu-secondary/i-editor-menu-secondary";
import { IEditorOptions } from "./i-editor-options";
import { IEditorToolbarContentObject } from "../editor-toolbar-content-object/i-editor-toolbar-content-object";
import { IEditorToolbarInlineFormatting } from "../editor-toolbar-inline-formatting/i-editor-toolbar-inline-formatting";

export interface IEditor {
    get canvas(): IEditorCanvas | undefined;
    get menuPrimary(): IEditorMenuPrimary | undefined;
    get menuSecondary(): IEditorMenuSecondary | undefined;
    get mountPoint(): HTMLElement | undefined;
    get options(): IEditorOptions | undefined;
    get toolbarContentObject(): IEditorToolbarContentObject | undefined;
    get toolbarInlineFormatting(): IEditorToolbarInlineFormatting | undefined;

    hasAllowedContentObjects(): boolean;
    hasPersistenceAdapters(): boolean;
    hasTools(): boolean;
    isMenuPrimaryActivated(): boolean;
    isMenuSecondaryActivated(): boolean;
    isToolbarContentObjectActived(): boolean;
    isToolbarInlineFormattingActived(): boolean;
    insertContentObjectAfter(contentObjectBefore: IContentObject, contentObjectAfterType: ContentObjectSubtype): void;
};
