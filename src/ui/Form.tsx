import { Flex, FlexProps } from '@chakra-ui/layout';
import React, { PropsWithChildren } from 'react';

type Props = FlexProps;
export const Form = (props: PropsWithChildren<Props>) => {
  return (
    <Flex
      {...props}
      as="form"
      noValidate
      direction="column"
      gridGap="5"
      alignItems="start"
    >
      {props.children}
    </Flex>
  );
};
