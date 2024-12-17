// tailwind size 4x multiplier
export const formSizes = {
  sm: 8,
  md: 10,
  lg: 12,
} as const;

export type FormSize = keyof typeof formSizes;
