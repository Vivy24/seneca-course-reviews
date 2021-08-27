import { Box, Heading } from '@chakra-ui/react';
import { AddCourseForm } from '@modules/course';
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

        <Box shadow="lg" mt="3" pt="5" pb="10" px="5" rounded="base">
          <AddCourseForm />
        </Box>
      </Box>
    </Box>
  );
}

export default CourseReviewAddPage;
