import { IContentObjectJsonSerialization } from "@pennacchi/core-content-object/dist/i-content-object-json-serialization";

export interface IBlockquoteJsonSerialization extends IContentObjectJsonSerialization {
    footer: IContentObjectJsonSerialization;
};
