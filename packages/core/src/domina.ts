import { IDimension } from "./interfaces/i-dimension";
import { IPosition } from "./interfaces/i-position";
import { OccurenceResult } from "./types/occurence-result";
import { throwError } from "./utilities/throw-error";

export class Domina<T extends HTMLElement> {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __DOMElement: T;
    private __nodeNameLowercase: string;


    /* -------------------------------------------------------------------------- */
    /*                                 CONSTRUCTOR                                */
    /* -------------------------------------------------------------------------- */

    public constructor(DOMElement: T) {
        this.__DOMElement = DOMElement;
        this.__nodeNameLowercase = DOMElement.nodeName.toLowerCase();
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get DOMElement(): T {
        return this.__DOMElement;
    }

    public get nodeNameLowercase(): string {
        return this.__nodeNameLowercase;
    }

    public set DOMElement(DOMElement: T) {
        this.DOMElement = DOMElement;
    }

    public addEventListener(eventName: string, listener: (event: Event) => void): void {
        return this.__DOMElement.addEventListener(eventName, listener);
    }

    public addClass(classValue: string): T {
        if ( this.hasClass(classValue) )
            return this.__DOMElement;

        this.__DOMElement.classList.add(classValue);
        return this.__DOMElement;
    }

    public appendChild(child: T, focus: boolean = false): T {
        if (!child)
            return this.__DOMElement;

        this.DOMElement.append(child);

        if (!focus)
            return this.__DOMElement;

        child.focus();
        return child;
    }

    public dispatchCustomEvent<P>(eventName: string, detail?: P ): T {
        const event = new CustomEvent<P>(eventName, {
            bubbles: true,
            cancelable: true,
            detail
        });

        if ( this.DOMElement.dispatchEvent(event) === false )
            throwError({class: this.constructor.name, caller: "dispatchCustomEvent", name: "An error occurred", msg: `Custom event >${eventName}< not dispatched.` });

        return this.__DOMElement;
    }

    public existsSiblingNext(): boolean {
        return this.getSiblingNext() !== undefined;
    }

    public existsSiblingPrevious(): boolean {
        return this.getSiblingPrevious() !== undefined;
    }

    public existsTwinNext(): boolean {
        const siblingNext = this.getSiblingNext();
        return siblingNext && siblingNext.nodeName === this.__DOMElement.nodeName;
    }

    public existsTwinPrevious(): boolean {
        const siblingPrevious = this.getSiblingPrevious();
        return siblingPrevious && siblingPrevious.nodeName === this.__DOMElement.nodeName;
    }

    public focus(): T {
        this.__DOMElement.focus();
        return this.__DOMElement;
    }

    public focusSiblingNext(): T {
        const siblingNext = this.getSiblingNext();

        if (!siblingNext)
            return this.__DOMElement;

        siblingNext.focus();

        return siblingNext;
    }

    public focusSiblingPrevious(): T {
        const siblingPrevious = this.getSiblingPrevious();

        if (!siblingPrevious)
            return this.__DOMElement;

        siblingPrevious.focus();
        return siblingPrevious;
    }

    public getChildNodes(): T[] {
        const childNodes: T[] = [];

        this.__DOMElement.childNodes.forEach((childNode: ChildNode) => {
            childNodes.push(childNode as T);
        });

        return childNodes;
    }

    public getChildNodeOccurrence(childNodeName: string): number {
        return this.getChildNodesOccurences()[childNodeName.toLowerCase()] || 0;
    }

    public getChildNodesOccurences(): OccurenceResult {
        const childNodesOccurences: OccurenceResult = {};

        this.__DOMElement.childNodes.forEach((childNode: ChildNode) => {
            const childNodeName = childNode.nodeName.toLowerCase();

            if (!childNodesOccurences[childNodeName])
                childNodesOccurences[childNodeName] = 1;
            else 
                childNodesOccurences[childNodeName] += 1;
        });

        return childNodesOccurences;
    }

    public getDimensions(): IDimension {
        return {
            height: this.__DOMElement.offsetHeight,
            width: this.__DOMElement.offsetWidth,
        }
    }

    public getPositionAbsolute(): IPosition {
        const DOMRect = this.__DOMElement.getBoundingClientRect();

        return {
            bottomLeft:  { x: DOMRect.x,     y: DOMRect.bottom },
            bottomRight: { x: DOMRect.right, y: DOMRect.bottom },
            topLeft:     { x: DOMRect.x,     y: DOMRect.y },
            topRight:    { x: DOMRect.right, y: DOMRect.y },
        };
    }

    public getPositionOnPage(): IPosition {
        const offsetTop = this.DOMElement.offsetTop;
        const offsetLeft = this.DOMElement.offsetLeft;
        const dimensions = this.getDimensions();

        return {
            topLeft:     { x: offsetLeft, y: offsetTop },
            topRight:    { x: offsetLeft + dimensions.width, y: offsetTop },
            bottomLeft:  { x: offsetLeft, y: offsetTop + dimensions.height },
            bottomRight: { x: offsetLeft + dimensions.width, y: offsetTop + dimensions.height },
        }
    }

    public getSiblingNext(): T | undefined {
        const siblingNext = this.__DOMElement.nextSibling;

        if (!siblingNext)
            return undefined;

        return siblingNext as T;
    }

    public getSiblingPrevious(): T | undefined {
        const siblingPrevious = this.__DOMElement.previousElementSibling;

        if (!siblingPrevious)
            return undefined;

        return siblingPrevious as T;
    }

    public hasChildNodes(): boolean {
        return this.__DOMElement.hasChildNodes();
    }

    public hasClass(classValue: string): boolean {
        return this.__DOMElement.classList.contains(classValue);
    }

    public insertSiblingAfter(sibling: T, focus?: boolean): T {
        if (!sibling)
            return this.__DOMElement;

        const parent = this.parent();

        if (!parent)
            return this.__DOMElement;

        new Domina(parent).DOMElement.insertBefore(sibling, this.DOMElement.nextElementSibling);

        if (!focus)
            return this.__DOMElement;

        sibling.focus();
        return sibling;
    }

    public insertSiblingBefore(sibling: T, focus?: boolean): T {
        if (!sibling)
            return this.__DOMElement;

        const parent = this.parent();

        if (!parent)
            return this.__DOMElement;

        new Domina(parent).DOMElement.insertBefore(sibling, this.DOMElement);

        if (!focus)
            return this.__DOMElement;

        sibling.focus();
        return sibling;
    }

    public isContentEditable(): boolean {
        return this.__DOMElement.isContentEditable;
    }

    public isEmpty(): boolean {
        return this.__DOMElement.hasChildNodes();
    }

    public isInputElement(): boolean {
        return this.__nodeNameLowercase === "input";
    }

    public isMounted(): boolean {
        return this._isMountedRec(this.__DOMElement);
    }

    public isTextareaElement(): boolean {
        return this.__nodeNameLowercase === "textarea";
    }

    public move(): T {
        throw new Error("Method not implemented.");
    }

    public moveUp(): T {
        const siblingPrevious = this.getSiblingPrevious();

        if (!siblingPrevious)
            return this.__DOMElement;

        const parentElement = this.__DOMElement.parentElement;

        if (!parentElement)
            return this.__DOMElement;

        parentElement.insertBefore(this.__DOMElement, siblingPrevious);

        return this.__DOMElement;
    }

    public moveDown(): T {
        const siblingNext = this.getSiblingNext();

        if (!siblingNext)
            return this.__DOMElement;

        const parentElement = this.__DOMElement.parentElement;

        if (!parentElement)
            return this.__DOMElement;

        parentElement.insertBefore(this.__DOMElement, siblingNext.nextElementSibling);

        return this.__DOMElement;
    }

    public parent(): T | undefined {
        const parentElement = this.__DOMElement.parentElement;

        if (!parentElement)
            return undefined;

        return parentElement as T;
    }

    public parentHasClass(className: string): boolean {
        if (this.__DOMElement.classList.contains(className)) 
            return true;

        return this.__DOMElement.parentNode && this.parentHasClass(className);
    }

    public prependChild(child: T, focus: boolean = true): T {
        if (!child)
            return this.__DOMElement;

        this.__DOMElement.prepend(child);

        if (!focus)
            return this.__DOMElement;

        child.focus();
        return child;
    }

    public remove(): undefined {
        this.__DOMElement.remove();
        return undefined;
    }

    public removeClass(classValue: string): T {
        if (!this.hasClass(classValue))
            return this.__DOMElement;

        this.__DOMElement.classList.remove(classValue);
        return this.__DOMElement;
    }

    public removeEventListener(eventName: string, listener: (event: Event) => void): void {
        return this.__DOMElement.removeEventListener(eventName, listener);
    }

    public replace(replacement: T): T {
        if (!replacement)
            return this.__DOMElement;

        if ( !this.isMounted() ) {
            this.__DOMElement = replacement;
            return this.__DOMElement;
        }

        let parentNode: HTMLElement = this.__DOMElement.parentNode as T;

        if (!parentNode)
            return this.__DOMElement;

        parentNode.replaceChild(replacement, this.__DOMElement);
        this.__DOMElement = replacement;
        return this.__DOMElement;
    }

    public replaceClass(classValueOld: string, classValueNew: string): T {
        this.removeClass(classValueOld)
        this.addClass(classValueNew);
        return this.__DOMElement;
    }

    public sanitize(): T {
        throw new Error("Method not implemented.");
    }


    /* -------------------------------------------------------------------------- */
    /*                                   PRIVATE                                  */
    /* -------------------------------------------------------------------------- */

    private _isMountedRec(node: Node): boolean {
        if (!node || !node.parentNode)
            return false;

        if (node.nodeType === 9 || node.nodeName === "HTML") // 9 === Node.DOCUMENT_NODE
            return true;

        return this._isMountedRec(node.parentNode);
    }
};
