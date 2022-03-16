export type SimpleMap<K extends string | number | symbol, V> = {
    [id in K]: V;
};
