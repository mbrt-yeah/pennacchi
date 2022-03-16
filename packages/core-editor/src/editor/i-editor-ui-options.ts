import { IEditorMenuPrimaryOptions } from "../editor-menu-primary/i-editor-menu-primary-options";
import { IEditorMenuSecondaryOptions } from "../editor-menu-secondary/i-editor-menu-secondary-options";
import { SimpleMap } from "@pennacchi/core/dist/types/simple-map";
import { IEditorToolbarContentObjectOptions } from "../editor-toolbar-content-object/i-editor-toolbar-content-object-options";
import { IEditorToolbarInlineFormattingOptions } from "../editor-toolbar-inline-formatting/i-editor-toolbar-inline-formatting-options";

export interface IEditorUIOptions {
    iconSet?: SimpleMap<string, string>;
    menuPrimary?: IEditorMenuPrimaryOptions,
    menuSecondary?: IEditorMenuSecondaryOptions,
    showFormattingSymbols?: boolean;
    toolbarContentObject?: IEditorToolbarContentObjectOptions;
    toolbarInlineFormatting?: IEditorToolbarInlineFormattingOptions;
};
