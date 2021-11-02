import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = { children: ReactNode };
export default function FormContainer(props: Props) {
  return (
    <Box as="form" noValidate shadow="lg" pt="5" pb="10" px="5" rounded="base">
      {props.children}
    </Box>
  );
}
