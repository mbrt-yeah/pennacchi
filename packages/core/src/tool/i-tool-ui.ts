import { IIcon } from "../interfaces/i-icon";
import { IToolUiChoiceValue } from "./i-tool-ui-choice-value";
import { ToolUIType } from "./tool-ui-type";

export interface IToolUI {
    description?: string;
    icon?: IIcon;
    label: string;
    type: ToolUIType;
    values?: IToolUiChoiceValue[];
};
