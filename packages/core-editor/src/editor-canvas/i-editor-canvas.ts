import { IContentObjectJsonSerialization } from "@pennacchi/core-content-object/dist/i-content-object-json-serialization";
import { IDocument } from "@pennacchi/core/dist/interfaces/i-document";

export interface IEditorCanvas {
    appendContentObject(contentObjectSubtype: string): void;
    toDocument(): IDocument;
    toJson(): IContentObjectJsonSerialization[];
};
