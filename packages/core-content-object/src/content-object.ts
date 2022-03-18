import { BooleanString } from "@pennacchi/core/dist/types/boolean-string";
import { Caret } from "@pennacchi/caret/dist/caret";
import { ContentObjectClassName, ContentObjectContentWrapperClassName, ContentObjectFormattingSymbolClassName } from "@pennacchi/core/dist/statics";
import { ContentObjectSubtype } from "./content-object-subtype";
import { ContentObjectType } from "./content-object-type";
import { createUniqueId } from "@pennacchi/core/dist/utilities/create-unique-id";
import { EventMapCore } from "@pennacchi/core/dist/maps/event-map-core";
import { getObjectProperty } from "@pennacchi/core/dist/utilities/getObjectProperty";
import { GUIElement } from "@pennacchi/core/dist/gui-element/gui-element";
import { html, TemplateResult } from "lit";
import { IContentObject } from "./i-content-object";
import { IContentObjectDefinition } from "./i-content-object-definition";
import { IContentObjectJsonSerialization } from "./i-content-object-json-serialization";
import { IContentObjectParameters } from "./i-content-object-parameters";
import { ITool } from "@pennacchi/core/dist/tool/i-tool";
import { KeyboardEventPayload } from "./event-payloads/keyboard-event-payload";
import { LayoutType } from "@pennacchi/core/dist/types/layout-type";
import { property } from "lit/decorators.js";
import { sanitizeAndCleanHtml } from "@pennacchi/core/dist/utilities/sanitize-and-clean-html";
import { TextSelection } from "@pennacchi/text-selection/dist/text-selection";

export abstract class ContentObject extends GUIElement implements IContentObject {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    @property({ attribute: "formattingsymbol", type: String, reflect: true })
    private __formattingSymbol: BooleanString;

    @property({ attribute: "inlineformatting", type: String, reflect: true })
    private __inlineFormatting: BooleanString;

    @property({ attribute: "toolbar", type: String, reflect: true })
    private __toolbar: BooleanString;

    private __caret: Caret;
    private __allowedContentObjects: IContentObjectDefinition[];
    private __contents: string;
    private __id: string;
    private __layoutType: LayoutType;
    private __subtype: ContentObjectSubtype;
    private __textSelection: TextSelection;
    private __toolbarTools: ITool[];
    private __toolbarInlineFormattingTools: ITool[];
    private __type: ContentObjectType;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(params: IContentObjectParameters) {
        super(params.options);

        this.__allowedContentObjects = getObjectProperty<IContentObjectDefinition[]>(
            params, "options.allowedContentObjects", []);

        this.__contents = getObjectProperty<string>(params, "options.contents", "");
        this.__contents = sanitizeAndCleanHtml(this.__contents);

        this.__id = createUniqueId();

        this.__formattingSymbol = getObjectProperty<BooleanString>(
            params, "options.formattingSymbol", "true");

        this.__layoutType = getObjectProperty<LayoutType>(
            params, "options.layoutType", "unordered");

        this.__toolbar = getObjectProperty<BooleanString>(
            params, "options.toolbar", "true");

        this.__toolbarTools = getObjectProperty<ITool[]>(
            params, "options.tools", []
        )

        this.__inlineFormatting = getObjectProperty<BooleanString>(
                params, "options.inlineFormatting", "true");

        this.__toolbarInlineFormattingTools = getObjectProperty<ITool[]>(
            params, "options.toolsInlineFormatting", []
        )

        this.__type = params.type || "block";
        this.__subtype = params.subtype || "paragraph";

        this.setAttribute("id", this.__id);
        this.DOMApi.addClass(ContentObjectClassName);
        this.registerEventListener();
    }

    private registerEventListener(): ContentObject {
        document.addEventListener("selectstart", (event: Event): void => {
            event.stopPropagation();

            this.DOMApi.dispatchCustomEvent<ContentObject>(
                EventMapCore["pnncch::selectstart"], 
                this
            );

            return;
        });

        document.addEventListener("selectionchange", (): void => {
            if ( !this.__textSelection.isInContextObject() || this.__textSelection.isEmpty() )
                return;

            this.DOMApi.dispatchCustomEvent<ContentObject>(
                EventMapCore["pnncch::selectionchange"], 
                this
            );

            return;
        });

        this.addEventListener("click", (): void => {
            this.DOMApi.dispatchCustomEvent<ContentObject>(EventMapCore["pnncch::click"], this);
            return;
        });

        this.addEventListener("focus", (): void => {
            this.DOMApi.dispatchCustomEvent<string>(EventMapCore["pnncch::focus"], this.id);
            return;
        });

        this.addEventListener("focusin", (): void => {
            this.DOMApi.dispatchCustomEvent<string>(EventMapCore["pnncch::focusin"], this.id);
            return;
        });

        this.addEventListener("focusout", (): void => {
            this.DOMApi.dispatchCustomEvent<string>(EventMapCore["pnncch::focusout"], this.id);
            return;
        });

        this.addEventListener("keydown", (event: KeyboardEvent): void => {
            this.DOMApi.dispatchCustomEvent<KeyboardEventPayload>(EventMapCore["pnncch::keydown"], {
                contentObject: this,
                key: event.key,
            });

            return;
        });

        this.addEventListener("keyup", (event: KeyboardEvent): void => {
            const target = event.target as HTMLElement;

            if ( target && target.closest(`.${ContentObjectContentWrapperClassName}`) )
                this.__contents = this.querySelector("[contenteditable=true")?.innerHTML;

            this.DOMApi.dispatchCustomEvent<KeyboardEventPayload>(EventMapCore["pnncch::keyup"], {
                contentObject: this,
                key: event.key,
            });

            return;
        });

        this.addEventListener(EventMapCore["pnncch::contentobjectready"], (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            this.onContentObjectReady();
        });

        return this;
    }

    protected override firstUpdated(): void {
        this.DOMApi.dispatchCustomEvent<void>(EventMapCore["pnncch::contentobjectready"]);
    }

    protected onContentObjectReady(): void {
        const contentEditableElements = this.querySelectorAll<HTMLElement>("[contenteditable=true]");

        if (contentEditableElements.length === 0) {
            const error = new Error("[ContentObject#firstUpdated] An error occurred");
            error.message = `No element with attribute contenteditable="true" found in content object with id ${this.id} of type ${this.subtype}.`;
            throw error;
        }

        if (contentEditableElements.length > 1) {
            const error = new Error("[ContentObject#firstUpdated] An error occurred");
            error.message = `More than one element with attribute contenteditable="true" found in content object with id ${this.id} of type ${this.subtype}.`;
            throw error;
        }

        const contentEditableElement = contentEditableElements.item(0);

        this.createCaret(contentEditableElement);
        this.createTextSelection(contentEditableElement);
        this.insertInitialContents(contentEditableElement);
    }

    protected createCaret(contentEditableElement: HTMLElement): void {
        this.__caret = new Caret(contentEditableElement);
        return;
    }

    protected createTextSelection(contentEditableElement: HTMLElement): void {
        this.__textSelection = new TextSelection(contentEditableElement);
        return;
    }

    protected insertInitialContents(contentEditableElement: HTMLElement): void {
        if (!this.__contents)
            return;

        contentEditableElement.innerHTML = this.__contents;
        return;
    }


    /* -------------------------------------------------------------------------- */
    /*                               RENDER METHODS                               */
    /* -------------------------------------------------------------------------- */

    protected renderFormattingSymbol(symbol: string = "¶"): TemplateResult {
        if (this.__formattingSymbol === "false")
            return html``;

        return html`
            <div class="${ContentObjectFormattingSymbolClassName}">
                ${symbol}
            </div>
        `;
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get allowedContentObjects(): IContentObjectDefinition[] {
        return this.__allowedContentObjects;
    }

    public get caret(): Caret {
        return this.__caret;
    }

    public get contents(): string {
        return this.__contents;
    }

    public get formattingSymbol(): BooleanString {
        return this.__formattingSymbol;
    }

    public get layoutType(): LayoutType {
        return this.__layoutType;
    }

    public get subtype(): ContentObjectSubtype {
        return this.__subtype;
    }

    public get textSelection(): TextSelection {
        return this.__textSelection;
    }

    public get toolbarActivated(): BooleanString {
        return this.__toolbar;
    }

    public get toolbarTools(): ITool[] {
        return this.__toolbarTools;
    }

    public get toolbarInlineFormattingActivated(): BooleanString {
        return this.__inlineFormatting;
    }

    public get toolbarInlineFormattingTools(): ITool[] {
        return this.__toolbarInlineFormattingTools;
    }

    public get type(): ContentObjectType {
        return this.__type;
    }

    public override focus(): void {
        const timeout: NodeJS.Timeout = setTimeout((): void => {
            const contentEditableChild: HTMLElement = this.querySelector(`[contenteditable]`);

            if (!contentEditableChild)
                return clearTimeout(timeout);

            contentEditableChild.focus();
            return clearTimeout(timeout);
        }, 1);
    }

    public toJson(): IContentObjectJsonSerialization {
        return { 
            contents: sanitizeAndCleanHtml(this.contents),
            id: this.id,
            subtype: this.__subtype,
            type: this.__type,
        };
    }
};
