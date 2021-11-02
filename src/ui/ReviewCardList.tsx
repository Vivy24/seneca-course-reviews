import { Box, VStack } from '@chakra-ui/react';
import React, { Children, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const ReviewCardList = ({ children }: Props) => {
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
