export abstract class AncoraCommand {
    public abstract addToHistory: boolean;
    public abstract do(...params: any[]): any;
    public abstract undo(...params: any[]): any;
};
