import { IEditor } from "../editor/i-editor";
import { IEditorOptions } from "../editor/i-editor-options";

export interface IEditorApi {
    editorOptionsDefault: IEditorOptions;
    editorsMounted: IEditor[],
    init: (mountPointSelector: string, options?: IEditorOptions) => void,
};
