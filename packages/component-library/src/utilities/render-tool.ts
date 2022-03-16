import { AncoraCommand } from "@pennacchi/ancora/dist/blueprints/ancora-command";
import { html, TemplateResult } from "lit";
import { IConstructor } from "@pennacchi/core/src/interfaces/i-constructor";
import { ITool } from "@pennacchi/core/src/tool/i-tool";
import { IToolUiChoiceValue } from "@pennacchi/core/src/tool/i-tool-ui-choice-value";
import { msg } from "@lit/localize";
import { renderIconSVG } from "./render-icon-svg";

import "../buttons/button";
import "../buttons/button-group";
import "../icons/icon-svg";


/**
 * 
 * @param command 
 * @param value 
 * @param callbackFn 
 * @returns 
 */
const renderButtonGroupButton = (
    command: IConstructor<AncoraCommand>,
    value: IToolUiChoiceValue,
    callbackFn?: (...params: any[]) => any
): TemplateResult => {
    const contents = html`${renderIconSVG(value.icon)}<span slot="label">${ msg(value.label) }</span>`;

    if (!callbackFn || typeof callbackFn !== "function")
        return html`<pnncch-button>${contents}</pnncch-button>`;

    return html`<pnncch-button @click="${() => callbackFn(command, value.id)}">${contents}<pnncch-button>`
}

/**
 * 
 * @param tool 
 * @param callbackFn 
 * @returns 
 */
export const renderToolAsButton = (tool: ITool, callbackFn?: (...params: any[]) => any): TemplateResult => {
    const contents = html`${renderIconSVG(tool.ui.icon)}<span slot="label">${ msg(tool.ui.label) }</span>`;

    if (!callbackFn || typeof callbackFn !== "function")
        return html`<pnncch-button>${contents}</pnncch-button>`;

    return html`<pnncch-button @click="${() => callbackFn(tool.command)}">${contents}</pnncch-button>`;
}

/**
 * 
 * @param tool 
 * @param callbackFn 
 * @returns 
 */
export const renderToolAsButtonGroup = (tool: ITool, callbackFn?: (...params: any[]) => any): TemplateResult => {
    if (!tool.ui.values || tool.ui.values.length <= 0) {
        const error = new Error("[renderToolAsButtonGroup] An error occured");
        error.message = `No values defined for button group`;
        throw error;
    }

    return html`<pnncch-button-group>
        ${tool.ui.values.map((value: IToolUiChoiceValue) => 
            renderButtonGroupButton(tool.command, value, callbackFn)
        )}
    </pnncch-button-group>`;
}

/**
 * 
 * @param tool 
 * @param callbackFn 
 * @returns 
 */
export const renderToolAsDropdown = (tool: ITool, callbackFn?: (...params: any[]) => any): TemplateResult => {
    if (!tool.ui.values || tool.ui.values.length <= 0) {
        const error = new Error("[renderToolAsDropdown] An error occured");
        error.message = `No values defined for dropdown`;
        throw error;
    }

    return html`
        <select>
            <option selected disabled>${tool.ui.label}</option>
            ${tool.ui.values.map((value: IToolUiChoiceValue) => 
                html`<option value="${value.label}">${msg(value.label)}</option>`
            )}
        </select>
    `;
}

/**
 * 
 * @param tool 
 * @param callbackFn 
 * @returns 
 */
export const renderTool = (tool: ITool, callbackFn?: (...params: any[]) => any): TemplateResult => {
    if (tool.ui.type === "button")
        return renderToolAsButton(tool, callbackFn);

    if (tool.ui.type === "button-group")
        return renderToolAsButtonGroup(tool, callbackFn);

    if (tool.ui.type === "dropdown")
        return renderToolAsDropdown(tool, callbackFn);

    return html``;
};
