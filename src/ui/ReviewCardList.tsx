import { Box, Divider, VStack } from '@chakra-ui/react';
import React, { Children, PropsWithChildren } from 'react';

type Props = {};
export const ReviewCardList = ({ children }: PropsWithChildren<Props>) => {
  return (
    <VStack
      as="ul"
      spacing="5"
      listStyleType="none"
      align="stretch"
      divider={<Divider />}
    >
      {Children.map(children, (child) => (
        <Box as="li">{child}</Box>
      ))}
    </VStack>
  );
};
