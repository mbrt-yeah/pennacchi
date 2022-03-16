import { ComponentsApiExternal } from "./apis/components-api-external";
import { IComponentsApiExternal } from "./apis/i-components-api-external";

declare global {
    interface Window { 
        Pennacchi: {
            Components: IComponentsApiExternal,
        },
    }
}

window.Pennacchi = {
    Components: new ComponentsApiExternal(),
};
