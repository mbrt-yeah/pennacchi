import { IGenerateCSSParameters } from "../../interfaces/i-generate-css-parameters";
import { CSSSelectorType } from "../../types/css-selector-type";

export interface IGenerateCSSRuleSelectorParameters extends IGenerateCSSParameters {
    name: string,
    type: CSSSelectorType,
};
