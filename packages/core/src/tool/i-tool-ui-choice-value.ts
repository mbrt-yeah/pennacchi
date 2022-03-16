import { IIcon } from "../interfaces/i-icon";

export interface IToolUiChoiceValue {
    description?: string;
    icon?: IIcon;
    id: string;
    isDefault?: boolean;
    label: string;
};
