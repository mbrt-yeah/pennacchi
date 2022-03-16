import { arrayfy } from "@pennacchi/core/dist/utilities/arrayfy";
import { CSSGeneratorFN } from "../../types/css-generator-fn";
import { generateCSSRuleDeclartion } from "../css-rule-declaration/generate-css-rule-declaration";
import { generateCSSRuleSelector } from "../css-selector/generate-css-selector";
import { ICSSDeclaration } from "../../interfaces/i-css-declaration";
import { IGenerateCSSRulesForVariantParameters } from "./i-generate-css-rules-for-variant-parameters";
import { IPropertyValue } from "../../interfaces/i-property-value";


const generatePropertyValueAsCSSVariable = (parameters: IPropertyValue ): string => {
    let result = "var(";

    if (parameters.valuePrefix)
        result += `--${parameters.valuePrefix}`;
        
    if (parameters.value)
        result += `-${parameters.value}`;

    if (parameters.valueSuffix)
        result += `-${parameters.valueSuffix}`;

    return result + ")";
};

export const generateCSSRulesForVariant: CSSGeneratorFN<IGenerateCSSRulesForVariantParameters> = (
    params: IGenerateCSSRulesForVariantParameters | IGenerateCSSRulesForVariantParameters[]
): string => {
    const paramsFinal = arrayfy<IGenerateCSSRulesForVariantParameters>(params);

    let result: string = "";

    for (const paramFinal of paramsFinal) {
        const declarationsFinal = arrayfy<ICSSDeclaration>(paramFinal.declarations);
        const variantValuesFinal = arrayfy<string>(paramFinal.variantValues);

        variantValuesFinal.forEach((variantValue: string, variantValueIdx: number) => {
            const selector = generateCSSRuleSelector({ 
                name: `${paramFinal.variantName}-${variantValue}`, 
                type: paramFinal.selectorType 
            });

            let declarations: string = "";

            declarationsFinal.forEach((declaration: ICSSDeclaration) => {
                let propertyValue: string;

                if (paramFinal.declarationsMode === "create-css-variable")
                {
                    const valuePrefix = (declaration.propertyValueVarPrefix) ?
                    `${declaration.propertyValueVarPrefix}-${variantValue}` : variantValue;

                    propertyValue = generatePropertyValueAsCSSVariable({
                        valuePrefix,
                        value: declaration.propertyName,
                        valueSuffix: declaration.propertyValueVarSuffix,
                    });
                } 
                else if (paramFinal.declarationsMode === "values-match-variant-values")
                {
                    declaration.propertyValues = arrayfy(declaration.propertyValues);
                    propertyValue = declaration.propertyValues[variantValueIdx];
                }
                else {
                    const error = new Error("[generateCSSRulesForVariant] An error occurred");
                    error.message = `Unknown declarationsMode specified: ${paramFinal.declarationsMode}`;
                    throw error;
                }

                declarations += generateCSSRuleDeclartion({
                    propertyName: declaration.propertyName,
                    propertyValue: propertyValue,
                });
            });

            result += `${selector} { ${declarations}} `;
        });
    }

    return result;
};
