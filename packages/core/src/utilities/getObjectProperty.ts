import { getProperty } from "dot-prop";

export const getObjectProperty = <T>(obj: any, path: string, defaultValue: T): T => {
    return getProperty(obj, path, defaultValue) as T;
};
