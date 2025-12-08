import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function applyCountableRemoval(
  name: string,
  pattern: RegExp,
  firstN: number = 0,
  lastN: number = 0,
): string {
  if (firstN === 0 && lastN === 0) {
    return name.replace(pattern, "");
  }

  // Find all matches and their indices
  const matches = [...name.matchAll(pattern)];
  const totalMatches = matches.length;
  const occurrencesToRemove = new Set<number>();

  // Mark the first N matches for removal
  for (let i = 0; i < firstN; i++) {
    if (i < totalMatches) occurrencesToRemove.add(i);
  }

  // Mark the last N matches for removal
  for (let i = 0; i < lastN; i++) {
    const targetIndex = totalMatches - 1 - i;
    if (targetIndex >= 0) occurrencesToRemove.add(targetIndex);
  }

  // Collect the start/end positions of the characters to cut
  // Sort them in reverse order to ensure slicing indices remain correct.
  const cuts = matches
    .filter((_, index) => occurrencesToRemove.has(index))
    .map((m) => ({ start: m.index!, end: m.index! + m[0].length }))
    .sort((a, b) => b.start - a.start);

  let result = name;
  for (const { start, end } of cuts) {
    result = result.slice(0, start) + result.slice(end);
  }

  return result;
};

export function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [1000, "m"], [900, "cm"], [500, "d"], [400, "cd"],
    [100, "c"], [90, "xc"], [50, "l"], [40, "xl"],
    [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"],
  ];

  let result = "";
  for (const [value, numeral] of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }

  return result;
}

export function toAlphabet(n: number): string {
  let str = "";
  while (n >= 0) {
    str = String.fromCharCode((n % 26) + 97) + str;
    n = Math.floor(n / 26) - 1;
  }
  return str;
}