import { Courses_Index_GetData, Courses_Index_GetQuery } from '@api/courses';
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TResult } from '@common';
import { Course } from '@modules/course';
import { CourseReview, CourseReviewCard } from '@modules/course-review';
import { CourseReviewService } from '@modules/course-review/service';
import { CourseService } from '@modules/course/service';
import { ReviewCardList } from '@ui/ReviewCardList';
import { WithDataFetchingPage } from '@ui/WithDataFetchingPage';
import { handleStaticPropsError, ResultSuccess } from '@utils/api-utils';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const queryOptions: Courses_Index_GetQuery = {
  order: 'desc',
  sortBy: 'createdDate',
};

async function coursesFetcher() {
  const res = await axios.get<Courses_Index_GetData>('/api/courses', {
    params: queryOptions,
  });

  return res.data.data;
}

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
            <VStack as="header" align="flex-start">
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

              <HStack as="ul" listStyleType="none">
                {data.course.programIdList.map((id) => (
                  <li key={id}>
                    <NextLink href={`/program/${id}`} passHref>
                      <Link>
                        <Tag size="lg">{id.toUpperCase()}</Tag>
                      </Link>
                    </NextLink>
                  </li>
                ))}
              </HStack>
            </VStack>

            <Box mt={10}>
              <HStack>
                <Heading as="h2">Course reviews</Heading>

                <NextLink href="/course-review/add" passHref>
                  <Button
                    as="a"
                    rounded="full"
                    aria-label="Add a review"
                    display="inline-flex"
                    alignItems="center"
                    gridGap="2"
                  >
                    <FaPlusCircle />
                    Add a review
                  </Button>
                </NextLink>
              </HStack>

              <Box mt="3">
                {data.reviews.length === 0 && (
                  <Text>Be the first to review</Text>
                )}

                <ReviewCardList>
                  {data.reviews.map((review, index) => (
                    <CourseReviewCard review={review} key={index} />
                  ))}
                </ReviewCardList>
              </Box>
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

  CourseService.formatCourses(courses);

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
