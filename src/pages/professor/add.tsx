import { Box, Heading } from '@chakra-ui/react';
import { AddProfessorForm } from '@modules/professor';
import React from 'react';
import GoBackButton from 'src/ui/GoBackButton';

function ProfessorAddPage() {
  return (
    <Box>
      <Box as="header">
        <GoBackButton />

        <Heading as="h1" size="3xl" mt="2">
          Add a professor
        </Heading>

        <Box shadow="lg" mt="3" pt="5" pb="10" px="5" rounded="base">
          <AddProfessorForm />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfessorAddPage;
