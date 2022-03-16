import { removeCommentsFromHtml } from "./remove-comments-from-html";
import { sanitizeHtml } from "./sanitize-html";

export const sanitizeAndCleanHtml = (html: string): string => {
    return removeCommentsFromHtml( sanitizeHtml(html) );
};
