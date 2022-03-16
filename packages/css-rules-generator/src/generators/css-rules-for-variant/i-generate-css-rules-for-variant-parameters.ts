import { CSSSelectorType } from "../../types/css-selector-type";
import { DeclarationsMode } from "../../types/declarations-mode";
import { ICSSDeclaration } from "../../interfaces/i-css-declaration";
import { IGenerateCSSParameters } from "../../interfaces/i-generate-css-parameters";

export interface IGenerateCSSRulesForVariantParameters extends IGenerateCSSParameters {
    declarations: ICSSDeclaration | ICSSDeclaration[];
    declarationsMode: DeclarationsMode;
    selectorType: CSSSelectorType;
    variantName: string;
    variantValues: string | string[];
};
