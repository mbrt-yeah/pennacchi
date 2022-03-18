import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { ContentObjectSubtypeMap } from "@pennacchi/core-content-object/dist/content-object-subtype-map";
import { EventMapCore } from "@pennacchi/core/dist/maps/event-map-core";
import { IEditor } from "../editor/i-editor";
import { KeyboardEventPayload } from "@pennacchi/core-content-object/dist/event-payloads/keyboard-event-payload";
import { SimpleMap } from "@pennacchi/core/dist/types/simple-map";

export class EditorEventHandlingStrategy {
    private static eventHandlers: SimpleMap<string, (...params: any[]) => void> = {
        [ EventMapCore["pnncch::keyup"] ]: (event: CustomEvent<KeyboardEventPayload>, editor: IEditor): void => {
            if (!event.target || !event.detail || event.detail.key !== "Enter")
                return;

            editor.insertContentObjectAfter(
                    event.target as ContentObject, 
                    ContentObjectSubtypeMap.paragraph
            );

            return;
        }
    }

    public static execute(event: Event, editor: IEditor): void {
        const type = event.type;

        if (!type)
            return;

        const eventHandler = EditorEventHandlingStrategy.eventHandlers[type];

        if (!eventHandler || typeof eventHandler !== "function")
            return;

        return eventHandler(event, editor);
    }
};
