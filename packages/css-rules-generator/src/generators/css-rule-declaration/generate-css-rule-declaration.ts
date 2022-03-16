import { arrayfy } from "@pennacchi/core/dist/utilities/arrayfy";
import { CSSGeneratorFN } from "../../types/css-generator-fn";
import { IGenerateCSSRuleDeclarationParameters } from "./i-generate-css-rule-declaration-parameters";

export const generateCSSRuleDeclartion: CSSGeneratorFN<IGenerateCSSRuleDeclarationParameters> = (
    params: IGenerateCSSRuleDeclarationParameters | IGenerateCSSRuleDeclarationParameters[]
): string => {
    const paramsFinal  = arrayfy(params);

    let result = "";

    for (const paramFinal of paramsFinal)
        result += `${paramFinal.propertyName}: ${paramFinal.propertyValue}; `;

    return result;
};
