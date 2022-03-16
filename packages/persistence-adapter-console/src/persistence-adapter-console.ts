import { IDocument } from "@pennacchi/core/dist/interfaces/i-document";
import { IPersistenceAdapter } from "@pennacchi/core/dist/interfaces/i-persistence-adapter";

export class PersistenceAdapterConsole implements IPersistenceAdapter {

    
    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor() {}


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public create(document: IDocument): IDocument {
        return this.upsert(document);
    }

    public read(documentId: string): IDocument {
        throw new Error("Method not implemented.");
    }

    public update(document: IDocument): IDocument {
        return this.upsert(document);
    }

    public upsert(document: IDocument): IDocument {
        console.log(document);
        return document;
    }

    public delete(documentId: string): IDocument {
        throw new Error("Method not implemented.");
    }
};
