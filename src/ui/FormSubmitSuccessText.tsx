import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
  message: ReactNode;
};
export const FormSubmitSuccessText = (props: Props) => {
  return (
    <Flex gridGap="1" color="green" alignItems="center">
      <FaCheckCircle /> {props.message}
    </Flex>
  );
};
