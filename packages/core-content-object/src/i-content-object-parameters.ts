import { ContentObjectSubtype } from "./content-object-subtype";
import { ContentObjectType } from "./content-object-type";
import { IContentObjectOptions } from "./i-content-object-options";

export interface IContentObjectParameters {
    options: IContentObjectOptions,
    subtype: ContentObjectSubtype;
    type: ContentObjectType;
};
