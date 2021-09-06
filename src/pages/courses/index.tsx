import { Courses_Index_GetData } from '@api/courses';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { TResultSuccess } from '@common';
import { CoursePreviewCard } from '@modules/course';
import { PreviewGridList } from '@ui/PreviewGridList';
import axios from 'axios';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useQuery } from 'react-query';

const CoursesIndexPage = () => {
  const coursesQuery = useQuery({
    queryKey: 'courses',
    queryFn: async () => {
      const res = await axios.get<TResultSuccess<Courses_Index_GetData>>(
        '/api/courses'
      );
      return res.data.data;
    },
  });

  return (
    <Box>
      <Head>
        <title>Courses | Vietnamese ICT at Seneca College</title>
      </Head>

      <Heading textAlign="center" size="4xl">
        Courses
      </Heading>

      <Box mt={5}>
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

            {coursesQuery.data?.map((course) => (
              <CoursePreviewCard key={course.courseId} course={course} />
            ))}
          </PreviewGridList>
        )}

        {coursesQuery.isFetching && (
          <HStack mt={3} alignItems="center">
            <Spinner />

            <Text>Fetching courses</Text>
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default CoursesIndexPage;
