import { IPosition } from "@pennacchi/core/dist/interfaces/i-position";

export class TextSelection {


    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private readonly __DOMElement: HTMLElement;
    private __selectionRaw?: Selection;


    /* -------------------------------------------------------------------------- */
    /*                                INSTANTIATION                               */
    /* -------------------------------------------------------------------------- */

    public constructor(DOMElement: HTMLElement) {
        this.__DOMElement = DOMElement;
        this.registerEventListener();
    }

    private registerEventListener(): void {
        document.addEventListener("selectionchange", (event: Event) => {
            this.handleSelectionGesture(event);
        });
    }


    /* -------------------------------------------------------------------------- */
    /*                               EVENT HANDLING                               */
    /* -------------------------------------------------------------------------- */

    private handleSelectionGesture(event: Event): void {
        event.stopPropagation();
        this.__selectionRaw = document.getSelection();
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get DOMElement(): HTMLElement {
        return this.__DOMElement;
    }

    public get rangesTotal(): number {
        return (!this.__selectionRaw) ? 0 : this.__selectionRaw.rangeCount;
    }

    public get selectionRaw(): Selection | undefined {
        return this.__selectionRaw;
    }

    public getRangeAt(idx: number): Range | undefined {
        if (!this.__selectionRaw)
            return undefined;

        return this.__selectionRaw.getRangeAt(idx);
    }

    public getPosition(): IPosition | undefined {
        if (this.rangesTotal === 0)
            return undefined;

        const rangeAtZero = this.getRangeAt(0);

        if (!rangeAtZero)
            return undefined;

        const boundClientRect = rangeAtZero.getBoundingClientRect();

        if (!boundClientRect)
            return undefined;

        return {
            topLeft: {
                x: boundClientRect.x,
                y: boundClientRect.y,
            },
            topRight: {
                x: boundClientRect.x + boundClientRect.width,
                y: boundClientRect.y,
            },
            bottomRight: {
                x: boundClientRect.x + boundClientRect.width,
                y: boundClientRect.y + boundClientRect.height,
            },
            bottomLeft: {
                x: boundClientRect.x,
                y: boundClientRect.y + boundClientRect.height,
            },
        }
    }

    public isEmpty(): boolean {
        return !this.__selectionRaw || this.__selectionRaw.isCollapsed;
    }

    public isEqualTo(selectionRaw: Selection): boolean {
        return this.__selectionRaw 
            && this.__selectionRaw.toString() === selectionRaw.toString()
            && this.__selectionRaw.anchorOffset === selectionRaw.anchorOffset
            && this.__selectionRaw.focusOffset === selectionRaw.focusOffset
            && this.__selectionRaw.rangeCount === selectionRaw.rangeCount;
    }
};
