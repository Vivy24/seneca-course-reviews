import { Button } from '@chakra-ui/button';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import { getErrorMessage } from '@utils/api-utils';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  error: unknown;
};
export const ErrorScreen = (props: Props) => {
  const { back } = useRouter();

  return (
    <VStack spacing="6">
      <Heading as="h1" size="2xl">
        {getErrorMessage(props.error)}
      </Heading>

      <HStack spacing="2">
        <NextLink href="/" passHref>
          <Button as="a" colorScheme="red">
            Homepage
          </Button>
        </NextLink>

        <Button variant="outline" onClick={back}>
          Go back
        </Button>
      </HStack>
    </VStack>
  );
};
