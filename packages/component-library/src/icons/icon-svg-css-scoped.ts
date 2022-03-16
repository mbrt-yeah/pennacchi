import { generateCSSRulesForVariant } from "@pennacchi/css-rules-generator/dist/generators/css-rules-for-variant/generate-css-rules-for-variant";
import { css, CSSResult, unsafeCSS } from "lit";

const propertyValueVarPrefix = "pnncch-icon";

const sizeVariantCSSRules: string = generateCSSRulesForVariant({
    declarations: [
        { propertyValueVarPrefix, propertyName: "height", },
        { propertyValueVarPrefix, propertyName: "width", },
    ],
    declarationsMode: "create-css-variable",
    selectorType:     "scoped",
    variantName:      ".has-size",
    variantValues:    ["s", "m", "l"],
});

// ${unsafeCSS(sizeVariantCSSRules)}

export const IconSVGCSSScoped: CSSResult = css`
    :host { display: flex; }
    ${unsafeCSS(sizeVariantCSSRules)}
`;
