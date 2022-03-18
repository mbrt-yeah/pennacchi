import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { EventMapCore } from "@pennacchi/core/dist/maps/event-map-core";
import { IEditor } from "../editor/i-editor";
import { KeyboardEventPayload } from "@pennacchi/core-content-object/dist/event-payloads/keyboard-event-payload";
import { SimpleMap } from "@pennacchi/core/dist/types/simple-map";
import { ContentObjectClassName, ContentObjectToolbarClassName } from "@pennacchi/core/dist/statics";

export class EditorToolbarContentToggleStrategy {
    private static eventHandlers: SimpleMap<string, (...params: any[]) => void> = {
        "click": (event: MouseEvent, editor: IEditor): void => {
            const target = event.target as HTMLElement;

            if (!target 
                || !editor.toolbarContentObject.isVisible() 
                || target.closest(`.${ContentObjectClassName}`) 
                || target.closest(`.${ContentObjectToolbarClassName}`)
            ) return;

            editor.toolbarContentObject.hide();

            return;
        },

        [ EventMapCore["pnncch::click"] ]: (event: CustomEvent<ContentObject>, editor: IEditor): void => {
            if (editor.toolbarContentObject.isVisible())
                return;

            editor.toolbarContentObject.show(event.detail);
            return;
        },

        [ EventMapCore["pnncch::keydown"] ]: (event: CustomEvent<KeyboardEventPayload>, editor: IEditor): void => {
            if (!editor.toolbarContentObject.isVisible())
                return;

            editor.toolbarContentObject.hide();
            return;
        },
    }

    public static execute(event: Event, editor: IEditor): void {
        const type = event.type;

        if (!type)
            return;

        const eventHandler = EditorToolbarContentToggleStrategy.eventHandlers[type];

        if (!eventHandler || typeof eventHandler !== "function")
            return;

        return eventHandler(event, editor);
    }
};
