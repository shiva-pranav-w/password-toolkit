export type PasswordOptions = {
  length: number;
  includeLower: boolean;
  includeUpper: boolean;
  includeDigits: boolean;
  includeSymbols: boolean;
};

export type Strength = "Weak" | "Medium" | "Strong";

export type ScoreResult = {
  strength: Strength;
  score: number;
  suggestions: string[];
};
