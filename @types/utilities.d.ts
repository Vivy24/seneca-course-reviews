declare module '@utilities' {
  import { TResult, TResultError } from '@common';
  import { AxiosError } from 'axios';
  import { UseMutationResult } from 'react-query';

  type AxiosMutation<TVariables = unknown> = UseMutationResult<
    void,
    AxiosError<TResultError>,
    TVariables,
    unknown
  >;

  type PartiallyPartial<T, RequiredKeys extends keyof T> = Partial<
    Omit<T, RequiredKeys>
  > &
    Pick<T, RequiredKeys>;

  type Nullable<T> = T | undefined | null;

  type Await<T> = T extends PromiseLike<infer U> ? Await<U> : T;

  type AwaitTResult<T> = TResult<Await<ReturnType<T>>>['data'];
}
