export function coercePixelValue(
  value: string | number | null | undefined
): string | undefined {
  if (typeof value === "number" || !isNaN(Number(value))) {
    return `${value}px`;
  }
  return value ?? undefined;
}
