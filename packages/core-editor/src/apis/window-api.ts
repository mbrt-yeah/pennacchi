import { ComponentsApiExternal } from "@pennacchi/component-library/dist/apis/components-api-external";
import { EditorApi } from "./editor-api";
import { IComponentsApiExternal } from "@pennacchi/component-library/dist/apis/i-components-api-external";
import { IEditorOptions } from "../editor/i-editor-options";

declare global {
    interface Window { 
        Pennacchi: {
            Components: IComponentsApiExternal,
            Editor: EditorApi,
        },
    }
};

export class WindowApi {
    public static init(editorOptionsDefault: IEditorOptions): void {
        window.Pennacchi = {
            Components: new ComponentsApiExternal(),
            Editor: new EditorApi(editorOptionsDefault),
        };
    }
};
