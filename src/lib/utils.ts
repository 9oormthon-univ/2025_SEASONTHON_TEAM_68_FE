import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TAG } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tagToColor(tag: TAG) {
  switch (tag) {
    case "DO":
      return {
        bg: "bg-[#D1E0D9]",
        text: "text-[#FFFFFF]",
        bullet: "bg-[#18A935]",
      };
    case "PLAN":
      return {
        bg: "bg-[#E2EADC]",
        text: "text-[#98B188]",
        bullet: "bg-[#FF9859]",
      };
    case "DELEGATE":
      return {
        bg: "bg-[#F3F3F2]",
        text: "text-[#9B9B9B]",
        bullet: "bg-[#9B9B9B]",
      };
  }
}
