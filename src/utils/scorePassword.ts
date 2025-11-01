import type { ScoreResult, Strength } from "./types";

const COMMON_WORDS = /(password|qwerty|letmein|welcome|admin|iloveyou)/i;

export function scorePassword(pw: string): ScoreResult {
  if (!pw) return { strength: "Weak", score: 0, suggestions: ["Enter a password"] };

  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSymbol = /[^A-Za-z0-9]/.test(pw);
  const setsUsed = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;

  let score = 0;
  const suggestions: string[] = [];

  // Length scoring
  if (pw.length >= 20) score += 40;
  else if (pw.length >= 16) score += 30;
  else if (pw.length >= 12) {
    score += 20;
    suggestions.push("Increase length to at least 16 characters.");
  } else {
    score += 5;
    suggestions.push("Increase length significantly (min 12).");
  }

  // Character set scoring
  if (setsUsed >= 4) score += 30;
  else if (setsUsed === 3) {
    score += 20;
    suggestions.push("Add the missing character type (e.g., symbols).");
  } else {
    score += 10;
    suggestions.push("Use upper, lower, digits, and symbols for better strength.");
  }

  if (pw.length >= 16 && setsUsed === 4) score += 10;

  // Penalties
  if (/(.)\1\1/.test(pw)) {
    score -= 15;
    suggestions.push("Avoid repeating characters three times in a row.");
  }
  if (/(abcdefghijklmnopqrstuvwxyz|0123456789)/.test(pw.toLowerCase())) {
    score -= 15;
    suggestions.push("Avoid simple alphabetic or numeric sequences.");
  }
  if (COMMON_WORDS.test(pw)) {
    score -= 20;
    suggestions.push("Avoid common words and patterns.");
  }

  // Final strength label
  let strength: Strength = "Weak";
  if (score >= 70 && pw.length >= 12) strength = "Strong";
  else if (score >= 40) strength = "Medium";

  return {
    strength,
    score,
    suggestions: strength === "Strong" ? [] : suggestions,
  };
}
