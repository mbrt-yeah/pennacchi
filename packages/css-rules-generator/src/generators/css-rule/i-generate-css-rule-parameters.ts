import { IGenerateCSSParameters } from "../../interfaces/i-generate-css-parameters";
import { IGenerateCSSRuleDeclarationParameters } from "../css-rule-declaration/i-generate-css-rule-declaration-parameters";
import { IGenerateCSSRuleSelectorParameters } from "../css-selector/i-generate-css-rule-selector-parameters";

export interface IGenerateCSSRuleParameters extends IGenerateCSSParameters{
    selector: IGenerateCSSRuleSelectorParameters;
    declaration: IGenerateCSSRuleDeclarationParameters | IGenerateCSSRuleDeclarationParameters[];
};
