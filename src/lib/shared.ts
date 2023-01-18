export function coercePixelValue(value: string | number): string {
  if (typeof value === "number" || !isNaN(Number(value))) {
    return `${value}px`;
  }
  return value;
}
