import { customAlphabet } from "nanoid";

export const createUniqueId = (): string => {
    const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);
    return nanoid();
};
