import { HasMessage, TResultError, TResultSuccess } from '@common';
import { AxiosError } from 'axios';

export function ResultError(message: string): TResultError {
  return {
    type: 'error',
    error: { message },
    timestamp: new Date().toISOString(),
  };
}

export function ResultSuccess<Data = unknown>(
  data: Data
): TResultSuccess<Data> {
  return {
    type: 'success',
    data,
    timestamp: new Date().toISOString(),
  };
}

export function ResultOk(): TResultSuccess<HasMessage> {
  return ResultSuccess({ message: 'Ok' });
}

export function ResultNotFound(): TResultError {
  return ResultError('Not found');
}

export function Result500(): TResultError {
  return ResultError('Something went wrong');
}

export function getAxiosError(error: AxiosError<TResultError>): string | null {
  if (error.response) return error.response.data.error.message;

  if (error.request) return 'Network problem';

  return null;
}
