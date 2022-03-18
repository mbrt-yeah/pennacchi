import { IconArrowDown } from "./icons/icon-arrow-down";
import { IconArrowUp } from "./icons/icon-arrow-up";
import { IconBold } from "./icons/icon-bold";
import { IconDiskette } from "./icons/icon-diskette";
import { IconDoublequote } from "./icons/icon-doublequote";
import { IconEye } from "./icons/icon-eye";
import { IconHeading1 } from "./icons/icon-heading-1";
import { IconHeading2 } from "./icons/icon-heading-2";
import { IconHeading3 } from "./icons/icon-heading-3";
import { IconHeading4 } from "./icons/icon-heading-4";
import { IconHeading5 } from "./icons/icon-heading-5";
import { IconHeading6 } from "./icons/icon-heading-6";
import { IconItalic } from "./icons/icon-italic";
import { IconMenu } from "icons/icon-menu";
import { IconName } from "@pennacchi/core/dist/types/icon-name";
import { IconParagraph } from "./icons/icon-paragraph";
import { IconPencil } from "icons/icon-pencil";
import { IconPlus } from "./icons/icon-plus";
import { IconStrikethrough } from "./icons/icon-strikethrough";
import { IconTrashBin } from "./icons/icon-trash-bin";
import { IconUnderline } from "./icons/icon-underline";
import { IconX } from "./icons/icon-x";

export const IconSet: { [key in IconName]: string } = {
    "arrowDown": IconArrowDown,
    "arrowUp": IconArrowUp,
    "blockquote": IconDoublequote,
    "bold": IconBold,
    "diskette": IconDiskette,
    "eye": IconEye,
    "heading1": IconHeading1,
    "heading2": IconHeading2,
    "heading3": IconHeading3,
    "heading4": IconHeading4,
    "heading5": IconHeading5,
    "heading6": IconHeading6,
    "italic": IconItalic,
    "menu": IconMenu,
    "paragraph": IconParagraph,
    "pencil": IconPencil,
    "plus": IconPlus,
    "strikethrough": IconStrikethrough,
    "trashBin": IconTrashBin,
    "underline": IconUnderline,
    "x": IconX
};
