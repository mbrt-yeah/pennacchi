export class Caret {

    /* -------------------------------------------------------------------------- */
    /*                             PROPERTIES PRIVATE                             */
    /* -------------------------------------------------------------------------- */

    private readonly _DOMElement: HTMLElement;

    private _state: {
        positionStart: number;
        positionEnd: number;
        textLength: number | undefined;
    };


    /* -------------------------------------------------------------------------- */
    /*                                 CONSTRUCTOR                                */
    /* -------------------------------------------------------------------------- */

    public constructor(DOMElement: HTMLElement) {
        this._DOMElement = DOMElement;

        this._state = {
            positionStart: this._getNodeOffsetLeft(this._DOMElement),
            positionEnd: 0,
            textLength: this._getNodeTextLength(this._DOMElement),
        };

        this._registerEventListener();
    }


    /* -------------------------------------------------------------------------- */
    /*                               METHODS PUBLIC                               */
    /* -------------------------------------------------------------------------- */

    public get DOMElement(): HTMLElement {
        return this._DOMElement;
    }

    public get isAtEnd(): boolean {
        return this.position === this._state.textLength;
    }

    public get isAtStart(): boolean {
        return this.position === 0;
    }

    public get isInMiddle(): boolean {
        return !this.isAtStart && !this.isInMiddle;
    }

    public get position(): number {
        // TODO reactivate once _state.positionEnd has been implemented
        // if (this._state.positionStart !== this._state.positionEnd)
            // throw new Error("[Caret#position] Position cannot be determined exactly due to active text selection.");

        return this._state.positionStart;
    }

    public setPosition(position: number): void {
        throw new Error("Method not implemented");
        //this._state.positionStart = position;
        //this._state.positionEnd = position;
        //return;
    }

    public setToEnd(): void {
        if (!window.getSelection || !document.createRange)
            return;

        this._DOMElement.focus();

        const range = document.createRange();
        range.selectNodeContents(this._DOMElement);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        return;
    }

    public setToStart(): void {
        if (!window.getSelection || !document.createRange)
            return;

        this._DOMElement.focus();
        
        const range = document.createRange();
        range.setStart(this._DOMElement, 0);
        range.collapse(true);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        return;
    }

    public get state(): { [id: string]: any } {
        return this._state;
    }

    public get textLength(): number {
        return this._state.textLength;
    }

    public get textSelection(): { positionStart: number, positionEnd: number } | undefined {
        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0)
            return undefined;

        const range = selection.getRangeAt(0);

        const result = {
            positionStart: this._getOffsetLeft(range.startContainer, range.startOffset),
            positionEnd: 0,
        };

        return result;
    }


    /* -------------------------------------------------------------------------- */
    /*                               METHODS PRIVATE                              */
    /* -------------------------------------------------------------------------- */

    private _getNodeOffsetLeft(node: Node): number {
        if (!node)
            return -1;
        
        return 1 + this._getNodeOffsetLeft(node.previousSibling);
    }

    private _getNodeTextLength(node: Node): number {
        if (!node || [1, 3].indexOf(node.nodeType) === -1)
            return 0;

        if (node.nodeType === 1)
            return this._getElementNodeTextLength(node);

        return this._getTextNodeTextLength(node);
    }

    private _getElementNodeTextLength(node: Node): number {
        const nodeName = node.nodeName.toLowerCase();

        if (nodeName === "br")
            return 1;

        if (!node.childNodes || node.childNodes.length === 0)
            return 0;

        let elementNodeTextLength = 0;

        for (let i = 0; i < node.childNodes.length; i++)
            elementNodeTextLength += this._getNodeTextLength(node.childNodes[i]);

        return elementNodeTextLength;
    }

    private _getTextNodeTextLength(node: Node): number {
        return node.nodeValue.length;
    }

    private _getOffsetLeft(node: Node, offset: number): number {
        let offsetLeft = 0;

        if (!node)
            return offsetLeft;

        if (node.nodeType === 3)
            offsetLeft += offset;
        else for (let i = 0; i < offset; i++)
            offsetLeft += this._getNodeTextLength(node.childNodes[i]);

        if (this._DOMElement !== node)
            offsetLeft += this._getOffsetLeft(node.parentNode, this._getNodeOffsetLeft(node));

        return offsetLeft;
    }

    private _handleKeyUpEvent(event: KeyboardEvent): void {
        if ( ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].indexOf(event.key) !== -1 )
            return this._setPositionInState();

        return this._handleOtherEvent();
    }

    private _handleOtherEvent(): void {
        this._state.textLength = this._getNodeTextLength(this._DOMElement);
        return this._setPositionInState();
    }

    private _registerEventListener(): void {
        ["blur", "click", "cut", "keyup", "mouseup"].forEach((eventName: string) => {
            this._DOMElement.addEventListener(eventName, (event: Event): void => {
                if (event.type === "keyup")
                    return this._handleKeyUpEvent(event as KeyboardEvent);

                return this._handleOtherEvent();
            });
        });
    }

    private _setPositionInState(): void {
        const selection = this.textSelection;

        if (!selection)
            return;

        this._state.positionStart = selection.positionStart;
        this._state.positionEnd = selection.positionEnd;
        return;
    }
}
