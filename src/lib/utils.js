import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Reorders an array by moving an item at `index` one position 'up' (earlier) or 'down' (later).
 * Returns a new array copy without mutating the original.
 * @template T
 * @param {T[]} list
 * @param {number} index
 * @param {"up" | "down"} direction
 * @returns {T[]}
 */
export function reorderList(list, index, direction) {
  if (!Array.isArray(list)) return [];
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= list.length) return list;
  const copy = [...list];
  const temp = copy[index];
  copy[index] = copy[targetIndex];
  copy[targetIndex] = temp;
  return copy;
}

