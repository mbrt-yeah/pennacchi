import { Blockquote } from "@pennacchi/content-object-blockquote/dist/blockquote";
import { ContentObjectSubtypeMap } from "@pennacchi/core-content-object/dist/content-object-subtype-map";
import { ContentObjectToolReplace } from "@pennacchi/content-object-tool-replace/dist/content-object-tool-replace";
import { EditorToolChangeMode } from "@pennacchi/editor-tool-change-mode/dist/editor-tool-change-mode";
import { EditorToolSave } from "@pennacchi/editor-tool-save/dist/editor-tool-save";
import { Heading1 } from "@pennacchi/content-object-heading-1/dist/heading-1";
import { Heading2 } from "@pennacchi/content-object-heading-2/dist/heading-2";
import { IconSet } from "@pennacchi/icon-set/dist/icon-set";
import { IEditorOptions } from "@pennacchi/core-editor/dist/editor/i-editor-options";
import { Paragraph } from "@pennacchi/content-object-paragraph/dist/paragraph";
import { PersistenceAdapterConsole } from "@pennacchi/persistence-adapter-console/dist/persistence-adapter-console"
import { ToolsContentObjectDefault } from "./tools-content-object-default";

export const EditorSimpleOptions: IEditorOptions = {
    allowedContentObjects: [
        {
            cstr: Blockquote,
            subtype: Blockquote.SUBTYPE,
            type: "block",
            options: {
                formattingSymbol: "false",
                tools: [
                    new ContentObjectToolReplace([
                        {
                            id: ContentObjectSubtypeMap.heading1,
                            label: ContentObjectSubtypeMap.heading1
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading2, 
                            label: ContentObjectSubtypeMap.heading2
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading3, 
                            label: ContentObjectSubtypeMap.heading3
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading4,
                            label: ContentObjectSubtypeMap.heading4 
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading5,
                            label: ContentObjectSubtypeMap.heading5 
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading6,
                            label: ContentObjectSubtypeMap.heading6 
                        },
                        { 
                            id: ContentObjectSubtypeMap.paragraph,
                            label: ContentObjectSubtypeMap.paragraph 
                        },
                    ]),
                ],
            },
            occurrence: { min: 0 },
        },
        {
            cstr: Heading1,
            subtype: Heading1.SUBTYPE,
            type: "block",
            options: {
                tools: [
                    new ContentObjectToolReplace([
                        {
                            id: ContentObjectSubtypeMap.blockquote,
                            label: ContentObjectSubtypeMap.blockquote
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading2, 
                            label: ContentObjectSubtypeMap.heading2
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading3, 
                            label: ContentObjectSubtypeMap.heading3
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading4,
                            label: ContentObjectSubtypeMap.heading4 
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading5,
                            label: ContentObjectSubtypeMap.heading5 
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading6,
                            label: ContentObjectSubtypeMap.heading6 
                        },
                        { 
                            id: ContentObjectSubtypeMap.paragraph,
                            label: ContentObjectSubtypeMap.paragraph 
                        },
                    ]),
                ]
            },
            occurrence: { min: 0 },
        },
        {
            cstr: Heading2,
            subtype: Heading2.SUBTYPE,
            type: "block",
            options: {
                tools: [
                    new ContentObjectToolReplace([
                        {
                            id: ContentObjectSubtypeMap.blockquote,
                            label: ContentObjectSubtypeMap.blockquote
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading1, 
                            label: ContentObjectSubtypeMap.heading1
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading3, 
                            label: ContentObjectSubtypeMap.heading3
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading4,
                            label: ContentObjectSubtypeMap.heading4 
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading5,
                            label: ContentObjectSubtypeMap.heading5 
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading6,
                            label: ContentObjectSubtypeMap.heading6 
                        },
                        { 
                            id: ContentObjectSubtypeMap.paragraph,
                            label: ContentObjectSubtypeMap.paragraph 
                        },
                    ]),
                ]
            },
            occurrence: { min: 0 },
        },
        {
            cstr: Paragraph,
            subtype: Paragraph.SUBTYPE,
            type: "block",
            options: {
                tools: [
                    new ContentObjectToolReplace([
                        {
                            id: ContentObjectSubtypeMap.blockquote,
                            label: ContentObjectSubtypeMap.blockquote
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading1, 
                            label: ContentObjectSubtypeMap.heading1
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading2, 
                            label: ContentObjectSubtypeMap.heading2
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading3, 
                            label: ContentObjectSubtypeMap.heading3
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading4,
                            label: ContentObjectSubtypeMap.heading4 
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading5,
                            label: ContentObjectSubtypeMap.heading5 
                        },
                        { 
                            id: ContentObjectSubtypeMap.heading6,
                            label: ContentObjectSubtypeMap.heading6 
                        },
                    ]),
                ]
            },
            occurrence: { min: 0 },
        },
    ],
    layoutType: "ordered",
    persistenceAdapters: [
        new PersistenceAdapterConsole()
    ],
    tools: [
        new EditorToolSave(),
        new EditorToolChangeMode()
    ],
    toolsContentObject: ToolsContentObjectDefault,
    toolsInlineFormatting: [],
    ui: {
        iconSet: IconSet,
        showFormattingSymbols: true
    }
};
