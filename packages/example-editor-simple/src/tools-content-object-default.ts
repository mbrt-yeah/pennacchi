import { ContentObjectToolMoveDown } from "@pennacchi/content-object-tool-move-down/dist/content-object-tool-move-down";
import { ContentObjectToolMoveUp } from "@pennacchi/content-object-tool-move-up/dist/content-object-tool-move-up";
import { ContentObjectToolRemove } from "@pennacchi/content-object-tool-remove/dist/content-object-tool-remove";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";

export const ToolsContentObjectDefault: ITool[] = [
    new ContentObjectToolMoveDown(),
    new ContentObjectToolMoveUp(),
    new ContentObjectToolRemove(),
];
