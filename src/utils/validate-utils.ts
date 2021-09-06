import { HasMessage } from '@common';

export function hasMessage(obj: unknown): obj is HasMessage {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}

export function isNullOrUndefined(obj: unknown): obj is null | undefined {
  return obj === null || obj === undefined;
}

export function isEmptyString(str: string | null | undefined): boolean {
  return isNullOrUndefined(str) || str.trim().length === 0;
}
