import { IDocument } from "./i-document";

export interface IPersistenceAdapter {
    create(document: IDocument): IDocument;
    read(documentId: string): IDocument;
    update(document: IDocument): IDocument;
    upsert(document: IDocument): IDocument;
    delete(documentId: string): IDocument;
};
