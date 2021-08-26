import { parseNumber } from './parse-utils';

export type PaginateResult<T> = {
  items: T[];
  next_page: number | null;
  prev_page: number | null;
  total: number;
  next_page_total: number;
  current_page: number;
  perPage: number;
};
export function getPaginationResult<T>(
  items: T[],
  _perPage: number | string | undefined,
  _page: number | string | undefined
): PaginateResult<T> {
  const perPage = parseNumber(_perPage) ?? Number.MAX_SAFE_INTEGER;
  const page = parseNumber(_page) ?? 1;

  const total = items.length;
  const paginatedItems = paginate(items, perPage, page);

  const itemsLeft = total - page * perPage;
  const next_page_total = itemsLeft < 0 ? 0 : Math.min(itemsLeft, perPage);

  return {
    items: paginatedItems,
    total,
    current_page: page,
    next_page_total,
    next_page: next_page_total > 0 ? page + 1 : null,
    prev_page: page > 1 ? page - 1 : null,
    perPage,
  };
}
export function paginate<T>(items: T[], perPage: number, page: number): T[] {
  if (page < 0 || perPage < 0) return [];

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return items.slice(start, end);
}
