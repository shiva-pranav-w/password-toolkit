import type { PasswordOptions } from "./types";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>/?";

function getSecureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

export function generatePassword(opts: PasswordOptions): string {
  const pools: string[] = [];
  const required: string[] = [];

  if (opts.includeLower) { pools.push(LOWER); required.push(LOWER[getSecureRandomInt(LOWER.length)]); }
  if (opts.includeUpper) { pools.push(UPPER); required.push(UPPER[getSecureRandomInt(UPPER.length)]); }
  if (opts.includeDigits) { pools.push(DIGITS); required.push(DIGITS[getSecureRandomInt(DIGITS.length)]); }
  if (opts.includeSymbols) { pools.push(SYMBOLS); required.push(SYMBOLS[getSecureRandomInt(SYMBOLS.length)]); }

  if (pools.length === 0) throw new Error("Select at least one character set.");

  const pool = pools.join("");
  const chars = [...required];

  while (chars.length < Math.max(opts.length, required.length)) {
    chars.push(pool[getSecureRandomInt(pool.length)]);
  }

  // Shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

export const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeLower: true,
  includeUpper: true,
  includeDigits: true,
  includeSymbols: true,
};
