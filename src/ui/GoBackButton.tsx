import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

function GoBackButton() {
  const { back } = useRouter();

  return (
    <Button variant="link" onClick={back}>
      Go back
    </Button>
  );
}

export default GoBackButton;
