export function parseNumber(num: unknown): number | null {
  if (typeof num === 'number' && !isNaN(num)) return num;
  if (typeof num === 'string' && !isNaN(+num)) return +num;

  return null;
}

export function tryParseNumber(pageNumber: string | number | undefined | null) {
  return parseNumber(pageNumber) ?? Number.MAX_SAFE_INTEGER;
}
