import { arrayfy } from "@pennacchi/core/dist/utilities/arrayfy";
import { CSSGeneratorFN } from "../../types/css-generator-fn";
import { generateCSSRuleDeclartion } from "../css-rule-declaration/generate-css-rule-declaration";
import { generateCSSRuleSelector } from "../css-selector/generate-css-selector";
import { IGenerateCSSRuleParameters } from "./i-generate-css-rule-parameters";

export const generateCSSRule: CSSGeneratorFN<IGenerateCSSRuleParameters> = (
    params: IGenerateCSSRuleParameters | IGenerateCSSRuleParameters[]
): string => {
    let paramsFinal = arrayfy(params);

    let result = "";

    for (const paramFinal of paramsFinal) {
        result += `${generateCSSRuleSelector(paramFinal.selector)} { 
            ${generateCSSRuleDeclartion(paramFinal.declaration)} 
        }`;
    }

    return result;
};
