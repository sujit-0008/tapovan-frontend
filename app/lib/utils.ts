import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn = clsx + tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
