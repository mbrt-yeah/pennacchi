export interface IKeyboardShortcut {
    id: string;
    keyCombos: string | string[];
    action?: (...params: any[]) => any;
};
