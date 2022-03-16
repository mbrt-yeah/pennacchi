import { IConfiguration } from "./i-configuration";

export const ConfigurationDefault: IConfiguration = {
    baseSize: {
        name: "m",
        value: 16,
    },

    sizeRatios: {
        "xxs": 0.25,
        "xs": 0.5,
        "s": 0.75,
        "m": 1.00,
        "l": 1.25,
        "xl": 1.50,
        "xxl": 2.00,
    },
};
