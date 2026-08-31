import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Compose conditionals first, then resolve conflicting Tailwind utilities.
export function cx(...values: ClassValue[]): string {
  return twMerge(clsx(values));
}
