import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { EditorMode } from "@pennacchi/core-editor/dist/editor/editor-mode";
import { IEditor } from "@pennacchi/core-editor/dist/editor/i-editor";

export class EditorCommandChangeMode extends AncoraCommand {

    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __editor: IEditor;
    private __editorMode: EditorMode;
    public addToHistory: boolean;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(editor: IEditor, mode: EditorMode) {
        super();
        this.__editor = editor;
        this.__editorMode = mode;
    }

    public do(): void {
        console.log("[EditorCommandChangeMode#do]")
        console.log(this.__editorMode);
        return;
    }

    public undo(): void {
        const error = new Error("[EditorChangeMode#undo] An error occurred");
        error.message = "Method not implemented.";
        throw error;
    }
};
