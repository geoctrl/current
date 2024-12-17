// overload signatures
export function inlineSwitch<
  Expression extends string | number | symbol,
  Value,
>(
  expression: Expression,
  map: Partial<Record<Expression, Value>>,
  fallback?: undefined,
): Value | undefined;

export function inlineSwitch<
  Expression extends string | number | symbol,
  Value,
>(
  expression: Expression,
  map: Partial<Record<Expression, Value>>,
  fallback: Expression,
): Value;

// inlineSwitch
export function inlineSwitch<
  Expression extends string | number | symbol,
  Value,
>(
  expression: Expression,
  map: Partial<Record<Expression, Value>>,
  fallback?: Expression,
): Value | undefined {
  if (map[expression]) {
    return map[expression]!;
  }
  if (fallback !== undefined && map.hasOwnProperty(fallback)) {
    return map[fallback] as Value;
  }
  return fallback ? map[fallback] : undefined;
}
