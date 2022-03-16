import { css, CSSResult, unsafeCSS } from "lit";
import { generateCSSRulesForVariant } from "@pennacchi/css-rules-generator/dist/generators/css-rules-for-variant/generate-css-rules-for-variant";

const propertyValueVarPrefix = "pnncch-button-group";
const propertyValueVarSuffixPx = "px";
const propertyValueVarSuffixRem = "rem";

const directionVariantCSSRules: string = generateCSSRulesForVariant({
    declarations: [ 
        { 
            propertyName: "flex-direction", 
            propertyValues: ["row", "row-reverse", "column", "column-reverse"]
        }, 
    ],
    declarationsMode: "values-match-variant-values",
    selectorType:     "scoped",
    variantName:      ".has-direction",
    variantValues:    ["ltr", "rtl", "ttb", "btt"],
});

const sizeVariantCSSRules: string = generateCSSRulesForVariant({
    declarations: [
        { propertyValueVarPrefix, propertyName: "font-size", propertyValueVarSuffix: propertyValueVarSuffixPx },
        { propertyValueVarPrefix, propertyName: "font-size", propertyValueVarSuffix: propertyValueVarSuffixRem },
        { propertyValueVarPrefix, propertyName: "margin", },
        { propertyValueVarPrefix, propertyName: "padding", },
    ],
    declarationsMode: "create-css-variable",
    selectorType:     "scoped",
    variantName:      ".has-size",
    variantValues:    ["s", "m", "l"],
});

export const ButtonGroupCSSScoped: CSSResult = css`
    :host { 
        align-items: center;
        display: flex;
    }

    ${unsafeCSS(directionVariantCSSRules)}
    ${unsafeCSS(sizeVariantCSSRules)}
`;
