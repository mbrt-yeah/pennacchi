import { ContentObject } from "@pennacchi/core-content-object/dist/content-object";
import { ContentObjectClassName, ContentObjectToolbarClassName } from "@pennacchi/core/dist/statics";
import { EventMapCore } from "@pennacchi/core/dist/maps/event-map-core";
import { IEditor } from "../editor/i-editor";
import { KeyboardEventPayload } from "@pennacchi/core-content-object/dist/event-payloads/keyboard-event-payload";
import { SimpleMap } from "@pennacchi/core/dist/types/simple-map";

export class EditorToolbarInlineToggleStrategy {
    private static eventHandlers: SimpleMap<string, (...params: any[]) => void> = {
        "click": (event: MouseEvent, editor: IEditor): void => {
            const target = event.target as HTMLElement;

            if (!target 
                || !editor.toolbarInlineFormatting.isVisible() 
                || target.closest(`.${ContentObjectClassName}`) 
                || target.closest(`.${ContentObjectToolbarClassName}`)
            ) return;

            editor.toolbarInlineFormatting.hide();

            return;
        },

        [ EventMapCore["pnncch::keydown"] ]: (event: CustomEvent<KeyboardEventPayload>, editor: IEditor): void => {
            if (!editor.toolbarInlineFormatting.isVisible())
                return;

            editor.toolbarInlineFormatting.hide();
            return;
        },

        [ EventMapCore["pnncch::selectstart"] ]: (event: CustomEvent<ContentObject>, editor: IEditor): void => {
            if (!editor.toolbarContentObject.isVisible())
                return;

            editor.toolbarContentObject.hide();
            return;
        },

        [ EventMapCore["pnncch::selectionchange"] ]: (event: CustomEvent<ContentObject>, editor: IEditor): void => {
            const contentObject = event.detail;

            if (!contentObject || !contentObject.textSelection || contentObject.textSelection.isEmpty()) {
                editor.toolbarInlineFormatting.hide();
                return;
            }

            editor.toolbarInlineFormatting.show(contentObject);
            return;
        },
    }

    public static execute(event: Event, editor: IEditor): void {
        const type = event.type;

        if (!type)
            return;

        const eventHandler = EditorToolbarInlineToggleStrategy.eventHandlers[type];

        if (!eventHandler || typeof eventHandler !== "function")
            return;

        return eventHandler(event, editor);
    }
};
