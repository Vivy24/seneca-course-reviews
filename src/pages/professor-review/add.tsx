import { Box, Heading } from '@chakra-ui/react';
import { AddProfessorReviewForm } from '@modules/professor-review';
import React from 'react';
import GoBackButton from 'src/ui/GoBackButton';

function ProfessorReviewAddPage() {
  return (
    <Box>
      <Box as="header">
        <GoBackButton />

        <Heading as="h1" size="3xl" mt="2">
          Add a course review
        </Heading>

        <Box shadow="lg" mt="3" pt="5" pb="10" px="5" rounded="base">
          <AddProfessorReviewForm />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfessorReviewAddPage;
