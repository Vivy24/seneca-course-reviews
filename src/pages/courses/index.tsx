import { Courses_Index_GetData } from '@api/courses';
import {
  Box,
  Heading,
  IconButton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CoursePreviewCard } from '@modules/course';
import { PreviewGridList } from '@ui/PreviewGridList';
import axios from 'axios';
import NextLink from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useQuery } from 'react-query';

const CoursesIndexPage = () => {
  const coursesQuery = useQuery({
    queryKey: 'courses',
    queryFn: async () => {
      const res = await axios.get<Courses_Index_GetData>('/api/courses');
      return res.data.data;
    },
  });

  return (
    <Box>
      <Heading textAlign="center" size="4xl">
        Courses
      </Heading>

      {coursesQuery.data && (
        <PreviewGridList>
          <Stack
            h="full"
            as="article"
            justifyContent="center"
            alignItems="center"
          >
            <NextLink href="/course/add" passHref>
              <IconButton
                as="a"
                aria-label="Add a new course"
                rounded="full"
                icon={<FaPlus />}
              />
            </NextLink>
            <Text>Add a new course</Text>
          </Stack>

          {coursesQuery.data.map((course) => (
            <CoursePreviewCard key={course.courseId} course={course} />
          ))}
        </PreviewGridList>
      )}

      {!coursesQuery.data && <Spinner mt={3} size="xl" />}
    </Box>
  );
};

export default CoursesIndexPage;
