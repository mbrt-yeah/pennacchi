import { IJsonSerialization } from "./i-json-serialization";

export interface IDocument {
    contents: IJsonSerialization[],
    id: string;
    name: string;
};
