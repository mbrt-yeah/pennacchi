import { SimpleMap } from "../types/simple-map";
import { ToolId } from "./tool-id";

export const ToolIdMap: SimpleMap<ToolId, ToolId> = {
    "bold": "movedown",
    "changemode": "changemode",
    "italic": "movedown",
    "movedown": "movedown",
    "moveup": "moveup",
    "remove": "remove",
    "replace": "replace",
    "save": "save",
    "strikethrough": "movedown",
    "underline": "movedown"
};
