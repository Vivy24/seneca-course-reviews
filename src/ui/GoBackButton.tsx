import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function GoBackButton() {
  const { back } = useRouter();

  return (
    <Button
      variant="link"
      display="inline-flex"
      alignItems="baseline"
      gridGap="1"
      onClick={back}
    >
      <FaArrowLeft fontSize="0.75em" />
      Go back
    </Button>
  );
}

export default GoBackButton;
