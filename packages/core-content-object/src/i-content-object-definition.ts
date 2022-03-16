import { ContentObjectType } from "./content-object-type";
import { IConstructor } from "@pennacchi/core/dist/interfaces/i-constructor";
import { IContentObject } from "./i-content-object";
import { IContentObjectOptions } from "./i-content-object-options";
import { IOccurrence } from "@pennacchi/core/dist/interfaces/i-occurrence";
import { LayoutType } from "@pennacchi/core/dist/types/layout-type";

export interface IContentObjectDefinition {
    allowedContentObjects?: IContentObjectDefinition[];
    cstr: IConstructor<IContentObject>;
    layoutType?: LayoutType;
    occurrence: IOccurrence;
    options?: IContentObjectOptions;
    subtype: string;
    type: ContentObjectType;
};
