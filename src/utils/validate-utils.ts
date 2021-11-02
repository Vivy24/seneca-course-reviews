import { HasCode, HasMessage } from '@common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasMessage(obj: any): obj is HasMessage {
  return typeof obj?.message === 'string';
}

export function isNullOrUndefined(obj: unknown): obj is null | undefined {
  return obj === null || obj === undefined;
}

export function isEmptyString(str: string | null | undefined): boolean {
  return isNullOrUndefined(str) || str.trim().length === 0;
}

export const isBrowser = () =>
  ![typeof window, typeof document].includes('undefined');

export const hasCode = (obj: unknown): obj is HasCode =>
  typeof obj === 'object' && obj !== null && 'code' in obj;
