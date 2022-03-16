import { BooleanString } from "@pennacchi/core/dist/types/boolean-string";
import { IGUIElementOptions } from "@pennacchi/core/dist/gui-element/i-gui-element-options";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";

export interface IContentObjectOptions extends IGUIElementOptions {
    contents?: string;
    formattingSymbol?: BooleanString;
    inlineFormatting?: BooleanString;
    toolbar?: BooleanString;
    tools?: ITool[];
    toolsInlineFormatting?: ITool[];
};
