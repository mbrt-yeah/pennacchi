import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";

export abstract class ContentObjectCommand extends AncoraCommand {
    public addToHistory: boolean;

    public constructor() {
        super();
        this.addToHistory = true
    }

    public abstract override do(): void;
    public abstract override undo(): void;
};
