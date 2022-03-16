import { IContentObject } from "./i-content-object";
import { IContentObjectDefinition } from "./i-content-object-definition";
import { IContentObjectFactory } from "./i-content-object-factory";

export class ContentObjectFactory implements IContentObjectFactory {

    /* -------------------------------------------------------------------------- */
    /*                                   STATICS                                  */
    /* -------------------------------------------------------------------------- */

    private static _instance: ContentObjectFactory;

    public static createOrGetInstance(contentObjectDefinitions?: IContentObjectDefinition[]): ContentObjectFactory {
        if (ContentObjectFactory._instance)
            return ContentObjectFactory._instance;

        if (!contentObjectDefinitions || contentObjectDefinitions.length === 0) {
            const error = new Error("[ContentObjectFactory#createOrGetInstance] An error occurred");
            error.message = "Zero content object definitions found.";
            throw error;
        }

        return ContentObjectFactory._instance = new ContentObjectFactory(contentObjectDefinitions);
    }


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __contentObjectDefinitions: IContentObjectDefinition[];


    /* -------------------------------------------------------------------------- */
    /*                                 CONSTRUCTOR                                */
    /* -------------------------------------------------------------------------- */

    private constructor(contentObjectDefinititions?: IContentObjectDefinition[]) {
        this.__contentObjectDefinitions = contentObjectDefinititions || [];
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public createFromDOMElement(DOMElement: HTMLElement, contents: string = ""): IContentObject | undefined {
        const DOMElementName = DOMElement.nodeName.toLowerCase();
        return this.createBySubtype(DOMElementName, contents);
    }

    public createBySubtype(subtype: string, contents: string = ""): IContentObject | undefined {
        if (!this.__contentObjectDefinitions)
            return undefined;

        let definitionFound: IContentObjectDefinition = undefined;

        for (const definition of this.__contentObjectDefinitions) {
            if (definition.subtype === subtype) {
                definitionFound = definition;
                break;
            }
        };

        if (definitionFound === undefined) {
            const error = new Error("[ContentObjectFactory#createBySubtype] An error occurred");
            error.message = `No content object definition found for content object with id ${subtype}`;
            throw error;
        }

        let contentObjectOptionsFinal = definitionFound.options;
        contentObjectOptionsFinal.contents = contents;

        return new definitionFound.cstr(contentObjectOptionsFinal);
    }

    public get contentObjectDefinitions(): IContentObjectDefinition[] {
        return this.__contentObjectDefinitions;
    }

    public set contentObjectDefinitions(contentObjectDefinitions: IContentObjectDefinition[]) {
        this.__contentObjectDefinitions = contentObjectDefinitions;
    }
};
