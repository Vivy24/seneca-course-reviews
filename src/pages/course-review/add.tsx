import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import GoBackButton from 'src/ui/GoBackButton';

function CourseReviewAddPage() {
  return (
    <Box>
      <Box as="header">
        <GoBackButton />

        <Heading as="h1" size="3xl" mt="2">
          Add course
        </Heading>
      </Box>
    </Box>
  );
}

export default CourseReviewAddPage;
