import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FaBan } from 'react-icons/fa';

type Props = {
  message: ReactNode;
};
export const FormSubmitErrorText = (props: Props) => {
  return (
    <Flex gridGap="1" color="red" alignItems="center">
      <FaBan /> {props.message}
    </Flex>
  );
};
