import { Box, Heading } from '@chakra-ui/react';
import { AddProfessorReviewForm } from '@modules/professor-review';
import Head from 'next/head';
import React from 'react';
import GoBackButton from 'src/ui/GoBackButton';

function ProfessorReviewAddPage() {
  return (
    <Box>
      <Head>
        <title>Add professor review | Vietnamese ICT at Seneca College</title>
      </Head>

      <Box as="header">
        <GoBackButton />

        <Heading as="h1" size="3xl" mt="2">
          Add a professor review
        </Heading>

        <Box shadow="lg" mt="3" pt="5" pb="10" px="5" rounded="base">
          <AddProfessorReviewForm />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfessorReviewAddPage;
