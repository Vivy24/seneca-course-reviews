import { HStack, Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { TResult } from '@common';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { ErrorScreen } from './ErrorScreen';

type Props<Data> = {
  result: TResult<Data>;
  children(data: Data): ReactNode;
};
export function WithDataFetchingPage<Data = unknown>(props: Props<Data>) {
  const { isFallback } = useRouter();

  if (props.result.type === 'error')
    return <ErrorScreen error={props.result.error} />;

  if (isFallback || !props.result.data)
    return (
      <HStack>
        <Spinner />
        <Text>Fetching data...</Text>
      </HStack>
    );

  return <>{props.children(props.result.data)}</>;
}
