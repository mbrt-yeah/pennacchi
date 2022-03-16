import { IXYCoordinates } from "./i-xy-coordinates";

export interface IPosition {
    bottomLeft: IXYCoordinates;
    bottomRight: IXYCoordinates;
    topLeft: IXYCoordinates;
    topRight: IXYCoordinates;
};
