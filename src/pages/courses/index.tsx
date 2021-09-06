import { PageData_Courses_GetData } from '@api/page-data/courses';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { TResult, TResultSuccess } from '@common';
import { CoursePreviewCard } from '@modules/course';
import { PageService } from '@modules/page-data/service';
import { PreviewGridList } from '@ui/PreviewGridList';
import { handleStaticPropsError, ResultSuccess } from '@utils/api-utils';
import axios from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useQuery } from 'react-query';

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const CoursesIndexPage = (props: Props) => {
  const coursesQuery = useQuery({
    queryKey: 'courses',
    queryFn: async () => {
      const res = await axios.get<TResultSuccess<PageData_Courses_GetData>>(
        '/api/page-data/courses'
      );
      return res.data.data;
    },
    placeholderData: props.data,
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

type StaticProps = TResult<PageData_Courses_GetData>;

type Params = {};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async () => {
  try {
    const courses = await PageService.getCoursesPage();

    return {
      props: ResultSuccess(courses),
      revalidate: 60,
    };
  } catch (error) {
    return handleStaticPropsError(error);
  }
};

export default CoursesIndexPage;
