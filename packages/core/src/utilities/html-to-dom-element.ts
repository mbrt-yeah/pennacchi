export const htmlToDOMElement= <T extends HTMLElement> (html: string): T => {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstChild as T;
};
