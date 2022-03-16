import { Ancora } from "@pennacchi/ancora/dist/ancora";
import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { ContentObjectFactory } from "@pennacchi/core-content-object/dist/content-object-factory";
import { GUIElement } from "@pennacchi/core/dist/gui-element/gui-element";
import { IContentObject } from "@pennacchi/core-content-object/dist/i-content-object";
import { IContentObjectFactory } from "@pennacchi/core-content-object/dist/i-content-object-factory";
import { IEditorOptions } from "./editor/i-editor-options";
import { IGUIElementOptions } from "@pennacchi/core/dist/gui-element/i-gui-element-options";
import { IEditorGUIElement } from "i-editor-gui-element";

export abstract class EditorGUIElement extends GUIElement implements IEditorGUIElement {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __ancora: Ancora;
    private __contentObjectFactory: IContentObjectFactory;
    private __editorOptions: IEditorOptions;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(options: IGUIElementOptions, editorOptions?: IEditorOptions) {
        super(options);
        this.__ancora = Ancora.createOrGetInstance();
        this.__editorOptions = editorOptions;

        this.__contentObjectFactory = 
            ContentObjectFactory.createOrGetInstance(this.__editorOptions?.allowedContentObjects);
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    protected createContentObject(subtype: string): IContentObject {
       return this.__contentObjectFactory.createBySubtype(subtype);
    }

    protected executeCommand(command: AncoraCommand): void {
        this.__ancora.execCommand(command);
    }

    public get cmdHistory(): Ancora {
        return this.__ancora;
    }
};
