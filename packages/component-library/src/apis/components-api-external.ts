import { IConfiguration } from "../i-configuration";
import { ConfigurationDefault } from "../configuration-default";
import { IComponentsApiExternal } from "./i-components-api-external";

export class ComponentsApiExternal implements IComponentsApiExternal {
    public configuration: IConfiguration;

    public constructor() {
        this.configuration = ConfigurationDefault;
    }
};
