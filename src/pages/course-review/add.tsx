import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import GoBackButton from 'src/ui/GoBackButton';

function add() {
  return (
    <div>
      <GoBackButton />
      Add course review
      <Button>
        <NextLink href="/course/add">Add a new course</NextLink>
      </Button>
    </div>
  );
}

export default add;
