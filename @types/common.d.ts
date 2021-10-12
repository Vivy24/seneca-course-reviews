declare module '@common' {
  import { AxiosError } from 'axios';
  import { UseControllerProps } from 'react-hook-form';

  type HasMessage = { message: string };

  type HasCode = { code: string };
  type TResultError = {
    type: 'error';
    error: HasMessage | Error;
    timestamp: string;
    data: null;
  };

  type TResultSuccess<Data = unknown> = {
    type: 'success';
    data: Data;
    timestamp: string;
    error: null;
  };

  type TResult<Data = unknown> = TResultSuccess<Data> | TResultError;

  type ApiError = AxiosError<TResultError>;

  type Order = 'asc' | 'desc';

  type ValidateQuery<T extends ApiQuery> = (query: ApiQuery) => TResult<T>;

  type Controllers<T> = Record<keyof T, UseControllerProps<T>>;
}
