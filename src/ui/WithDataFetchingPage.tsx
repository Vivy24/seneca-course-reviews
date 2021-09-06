import { HStack, Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { Nullable } from '@utilities';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { ErrorScreen } from './ErrorScreen';

type Props<Data> = {
  data: Nullable<Data>;
  error: unknown;
  children(data: Data): ReactNode;
};
export function WithDataFetchingPage<Data = unknown>(props: Props<Data>) {
  const { isFallback } = useRouter();

  if (props.error) return <ErrorScreen error={props.error} />;

  if (isFallback || !props.data)
    return (
      <HStack>
        <Spinner />
        <Text>Fetching data...</Text>
      </HStack>
    );

  return <>{props.children(props.data)}</>;
}
