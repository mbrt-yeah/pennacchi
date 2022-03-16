import { IGenerateCSSParameters } from "../interfaces/i-generate-css-parameters";

export type CSSGeneratorFN<T extends IGenerateCSSParameters> = (parameters: T | T[]) => string;