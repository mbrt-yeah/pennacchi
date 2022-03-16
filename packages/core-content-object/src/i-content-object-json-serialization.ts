export interface IContentObjectJsonSerialization {
    contents: string | IContentObjectJsonSerialization | IContentObjectJsonSerialization[];
    id: string;
    subtype: string;
    type: string;
};
