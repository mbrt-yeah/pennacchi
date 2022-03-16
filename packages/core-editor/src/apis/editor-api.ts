import { Editor } from "../editor/editor";
import { IEditorApi } from "./i-editor-api";
import { IEditorOptions } from "../editor/i-editor-options";

export class EditorApi implements IEditorApi {
    public editorsMounted: Editor[] = [];
    public editorOptionsDefault: IEditorOptions;

    public constructor(editorOptionsDefault: IEditorOptions) {
        this.editorsMounted = [];
        this.editorOptionsDefault = editorOptionsDefault;
    }

    public init(mountPointSelector: string, options?: IEditorOptions): void {
        if (!mountPointSelector) {
            const error = new Error("[EditorApiWindow#init] An error occured");
            error.message = "No mount point selector specified.";
        }

        const optionsFinal = options || this.editorOptionsDefault;

        if (optionsFinal?.ui?.iconSet)
            window.Pennacchi.Components.configuration.iconSet = optionsFinal.ui.iconSet;

        this.editorsMounted.push( new Editor(mountPointSelector, optionsFinal) );
    }
};
