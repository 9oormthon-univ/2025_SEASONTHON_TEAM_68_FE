import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function columnToColor(column: string) {
  const base = column.split("-")[0];
  switch (base) {
    case "DO":
      return {
        bg: "bg-[#D1E0D9]",
        text: "text-[#FFFFFF]",
        bullet: "bg-[#18A935]",
        'chip-bg': "bg-[#62905B]",
        'chip-text': "text-[#FEFEFE]",
      };
    case "PLAN":
      return {
        bg: "bg-[#E2EADC]",
        text: "text-[#98B188]",
        bullet: "bg-[#FF9859]",
        'chip-bg': "bg-[#FAEDD3]",
        'chip-text': "text-[#FF9859]",
      };
    case "LATE":
      return {
        bg: "bg-[#FFEBEB]",
        text: "text-[#9B9B9B]",
        bullet: "bg-[#FF6565]",
        'chip-bg': "bg-[#FEFEFE]",
        'chip-text': "text-[#FF6565]",
      };
    default:
      return {
        bg: "bg-[#F3F3F2]",
        text: "text-[#9B9B9B]",
        bullet: "bg-[#9B9B9B]",
        'chip-bg': "bg-[#F3F3F2]",
        'chip-text': "text-[#9B9B9B]",
      };
  }
}