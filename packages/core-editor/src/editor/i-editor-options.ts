import { IContentObjectDefinition } from "@pennacchi/core-content-object/dist/i-content-object-definition";
import { IEditorTool } from "./i-editor-tool";
import { IEditorUIOptions } from "./i-editor-ui-options";
import { IGUIElementOptions } from "@pennacchi/core/dist/gui-element/i-gui-element-options";
import { IPersistenceAdapter } from "@pennacchi/core/dist/interfaces/i-persistence-adapter";
import { LayoutType } from "@pennacchi/core/dist/types/layout-type";
import { ITool } from "@pennacchi/core";

export interface IEditorOptions extends IGUIElementOptions {
    allowedContentObjects?: IContentObjectDefinition[],
    layoutType?: LayoutType,
    persistenceAdapters?: IPersistenceAdapter[],
    tools?: IEditorTool[];
    toolsContentObject: ITool[];
    toolsInlineFormatting: ITool[];
    ui?: IEditorUIOptions,
};
