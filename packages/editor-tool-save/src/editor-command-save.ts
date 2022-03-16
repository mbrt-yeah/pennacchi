import { AncoraCommand } from "@pennacchi/ancora/src/blueprints/ancora-command";
import { IEditor } from "@pennacchi/core-editor/dist/editor/i-editor";

export class EditorCommandSave extends AncoraCommand {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __editor: IEditor;
    public addToHistory: boolean;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(editor: IEditor) {
        super();
        this.__editor = editor;
        this.addToHistory = false;
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public do(): void {
        const document = this.__editor.canvas.toDocument();

        if (!document) {
            const error = new Error("[EditorCommandSave#do] An error occurred");
            error.message = "No document to save has been generated.";
            throw error;
        }

        if (!this.__editor.hasPersistenceAdapters()) {
            const error = new Error("[EditorCommandSave#do] An error occurred");
            error.message = "No persistence adapters found.";
            throw error;
        }

        for (const adapter of this.__editor.options.persistenceAdapters) {
            adapter.upsert(document);
        }

        return;
    }

    public undo(): void {
        const error = new Error("[EditorCommandSave#undo] An error occurred");
        error.message = "Method not implemented.";
        throw error;
    }
};
