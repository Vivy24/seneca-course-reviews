import { Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

type Props = {};
export default function FormContainer(props: PropsWithChildren<Props>) {
  return (
    <Box as="form" noValidate shadow="lg" pt="5" pb="10" px="5" rounded="base">
      {props.children}
    </Box>
  );
}
