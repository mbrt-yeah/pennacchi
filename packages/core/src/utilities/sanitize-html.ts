import { sanitize } from "dompurify";

export const sanitizeHtml = (html: string): string => {
    return sanitize(html);
};
