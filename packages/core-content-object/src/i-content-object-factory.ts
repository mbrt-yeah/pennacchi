import { IContentObject } from "./i-content-object";
import { IContentObjectDefinition } from "./i-content-object-definition";

export interface IContentObjectFactory {
    get contentObjectDefinitions(): IContentObjectDefinition[];
    set contentObjectDefinitions(contentObjectDefinitions: IContentObjectDefinition[]);

    createBySubtype(subtype: string, contents?: string): IContentObject | undefined;
    createFromDOMElement(DOMElement: HTMLElement, contents?: string): IContentObject | undefined;
};
