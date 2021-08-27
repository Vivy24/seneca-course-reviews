declare module '@common' {
  type HasMessage = { message: string };
  type TResultError = {
    type: 'error';
    error: HasMessage | Error;
    timestamp: string;
  };

  type TResultSuccess<Data = unknown> = {
    type: 'success';
    data: Data;
    timestamp: string;
  };

  type TResult<Data = unknown> = TResultSuccess<Data> | TResultError;
}