import { createSROnly } from "./sr-only";
import { CSSSelectorType } from "@pennacchi/css-rules-generator/dist/types/css-selector-type";
import { UtilityCSSRuleName } from "./utility-css-rule-name";
import { CSSResult } from "lit";

export const include = (name: UtilityCSSRuleName, selectorType: CSSSelectorType): CSSResult => {
    if (name === "sr-only")
        return createSROnly(selectorType);

    const error = new Error("[include] An error occurred");
    error.message = `No utility rule generator for rule with name ${name} found.`;
    throw error;
};
