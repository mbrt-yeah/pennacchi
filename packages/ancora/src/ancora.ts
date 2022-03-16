import { AncoraCommand } from "./blueprints/ancora-command";
import { AncoraOptionsDefault } from "./ancora-options-default";
import { IAncora } from "./blueprints/i-ancora";
import { IAncoraOptions } from "./i-ancora-options";

export class Ancora implements IAncora {

    /* -------------------------------------------------------------------------- */
    /*                                   STATICS                                  */
    /* -------------------------------------------------------------------------- */

    private static instance: Ancora;

    public static createOrGetInstance(options: IAncoraOptions = {}): Ancora {
        if (Ancora.instance) {
            return Ancora.instance;
        }

        Ancora.instance = new Ancora(options);
        return Ancora.instance;
    }


    /* -------------------------------------------------------------------------- */
    /*                             PROPERTIES PRIVATE                             */
    /* -------------------------------------------------------------------------- */

    private _limit: number;
    private _history: AncoraCommand[];
    private _historyIdx: number;


    /* -------------------------------------------------------------------------- */
    /*                                 CONSTRUCTOR                                */
    /* -------------------------------------------------------------------------- */

    private constructor(options: IAncoraOptions = {}) {
        const optionsFinal = Object.assign({}, AncoraOptionsDefault, options);
        this._limit = optionsFinal.limit;
        this._history = [];
        this._historyIdx = -1;
    }


    /* -------------------------------------------------------------------------- */
    /*                         NON-ABSTRACT METHODS PUBLIC                        */
    /* -------------------------------------------------------------------------- */

    public get limit(): number {
        return this._limit;
    }

    public execCommand(command: AncoraCommand): any {
        this._history.push(command);

        if (!this._canRedo() && !this._canUndo())
            this._historyIdx += 1;

        return command.do();
    }

    public redoCommand(): any {
        if (this._isHistoryEmpty() && !this._canRedo())
            return undefined;

        const command = this._history[this._historyIdx];

        if (!command)
            return undefined;

        this._historyIdx += 1;

        return command.do();
    }

    public undoCommand(): any {
        if (this._isHistoryEmpty() && !this._canUndo())
            return undefined;

        const command = this._history[this._historyIdx];

        if (!command)
            return undefined;

        this._historyIdx -= 1;
        return command.undo();
    }


    /* -------------------------------------------------------------------------- */
    /*                        NON-ABSTRACT METHODS PRIVATE                        */
    /* -------------------------------------------------------------------------- */

    private _isHistoryEmpty(): boolean {
        return this._history.length === 0;
    }

    private _canRedo(): boolean {
        return this._historyIdx < this._history.length - 1;
    }

    private _canUndo(): boolean {
        return this._historyIdx > 0;
    }
};
