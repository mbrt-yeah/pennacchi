import { IGenerateCSSRuleSelectorParameters } from "./i-generate-css-rule-selector-parameters";

export const generateCSSRuleSelector = (
    parameters: IGenerateCSSRuleSelectorParameters
): string => {
    if (parameters.type === "global")
        return `${parameters.name}`;

    return `:host(${parameters.name})`;
};
