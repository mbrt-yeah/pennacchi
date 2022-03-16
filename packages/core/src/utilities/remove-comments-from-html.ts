export const removeCommentsFromHtml = (html: string): string => {
    const regex = new RegExp("(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)", "g");
    return html.replace(regex, "");
};
