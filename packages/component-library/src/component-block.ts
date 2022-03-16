import { GUIElement } from "@pennacchi/core/dist/gui-element/gui-element";
import { IConfiguration } from "./i-configuration";

export abstract class ComponentBlock extends GUIElement {

    /* -------------------------------------------------------------------------- */
    /*                                 PROPERTIES                                 */
    /* -------------------------------------------------------------------------- */

    private __configuration: IConfiguration;


    /* -------------------------------------------------------------------------- */
    /*                                 CONSTRUCTOR                                */
    /* -------------------------------------------------------------------------- */

    public constructor() {
        super();
        this.__configuration = window.Pennacchi.Components.configuration;
    }


    /* -------------------------------------------------------------------------- */
    /*                                     API                                    */
    /* -------------------------------------------------------------------------- */

    public get configuration(): IConfiguration {
        return this.__configuration;
    }
};
