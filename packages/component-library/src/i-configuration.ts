import { SimpleMap } from "@pennacchi/core/dist/types/simple-map";
import { SizeName } from "@pennacchi/core/dist/types/size-name";
import { SizeRatios } from "@pennacchi/core/dist/types/size-ratios";

export interface IConfiguration {
    baseSize: {
        name: SizeName,
        value: number,
    },
    iconSet?: SimpleMap<string, string>,
    sizeRatios: SizeRatios,
};
