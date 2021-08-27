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
}
