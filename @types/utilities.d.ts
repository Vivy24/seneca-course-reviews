declare module '@utilities' {
  import { TResultError } from '@common';
  import { AxiosError } from 'axios';
  import React from 'react';
  import { UseMutationResult } from 'react-query';

  type MutationHandleSubmit = UseMutationResult<
    void,
    AxiosError<TResultError>,
    React.BaseSyntheticEvent<object, any, any> | undefined,
    unknown
  >;

  type PartiallyPartial<T, RequiredKeys extends keyof T> = Partial<
    Omit<T, RequiredKeys>
  > &
    Pick<T, RequiredKeys>;

  type Nullable<T> = T | undefined | null;
}
