import { Box, VStack } from '@chakra-ui/react';
import React, { Children, PropsWithChildren } from 'react';

type Props = {};
export const ReviewCardList = ({ children }: PropsWithChildren<Props>) => {
  return (
    <VStack as="ul" spacing="5" listStyleType="none" align="stretch">
      {Children.map(children, (child) => (
        <Box shadow="md" p="5" as="li">
          {child}
        </Box>
      ))}
    </VStack>
  );
};
