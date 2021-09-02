import { Box, Heading, Text } from '@chakra-ui/layout';
import { TResult } from '@common';
import { Course } from '@modules/course';
import { CourseReview } from '@modules/course-review';
import { CourseReviewService } from '@modules/course-review/service';
import { CourseService } from '@modules/course/service';
import { WithDataFetchingPage } from '@ui/WithDataFetchingPage';
import { handleStaticPropsError, ResultSuccess } from '@utils/api-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CourseIdPage = (props: Props) => {
  return (
    <WithDataFetchingPage result={props}>
      {(data) => (
        <Box>
          <Head>
            <title>
              {data.course.courseId.toUpperCase()} | Vietnamese ICT at Seneca
              College
            </title>
          </Head>

          <Box>
            <Box as="header">
              <Heading as="h1" size="4xl">
                {data.course.courseId.toUpperCase()}
              </Heading>

              <Text
                fontSize={{
                  base: 'lg',
                  xl: '2xl',
                }}
              >
                {data.course.courseName}
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </WithDataFetchingPage>
  );
};

type StaticProps = TResult<{ course: Course; reviews: CourseReview[] }>;

type Params = {
  id: string;
};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  params,
}) => {
  try {
    const courseId = params?.id;
    if (!courseId) return handleStaticPropsError("Missing course's id");

    const course = await CourseService.getCourse(courseId);
    if (!course) return handleStaticPropsError('Course not found');
    const reviews = await CourseReviewService.getReviewsByCourseId(courseId);

    return {
      props: ResultSuccess({ course, reviews }),
      revalidate: 60,
    };
  } catch (error) {
    return handleStaticPropsError(error);
  }
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const courses = await CourseService.getAllCourses();

  const paths = courses.map((course) => ({
    params: {
      id: course.courseId,
    },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export default CourseIdPage;
