import { IGenerateCSSParameters } from "../../interfaces/i-generate-css-parameters";

export interface IGenerateCSSRuleDeclarationParameters extends IGenerateCSSParameters {
    propertyName: string;
    propertyValue: string;
};
