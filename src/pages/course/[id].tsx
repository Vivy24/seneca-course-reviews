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
import { CourseReviewCard } from '@modules/course-review/components/CourseReviewCard/CourseReviewCard';
import { PopulatedCourseReview } from '@modules/course-review/service/course-reviews-service';
import { Course } from '@modules/course/model/Course';
import { CourseService } from '@modules/course/service/course-service';
import { useCourseIdPage } from '@modules/page-data/hooks/useCourseIdPage';
import { PageService } from '@modules/page-data/service/page-service';
import GoBackButton from '@ui/GoBackButton';
import { ReviewCardList } from '@ui/ReviewCardList';
import { WithDataFetchingPage } from '@ui/WithDataFetchingPage';
import { handleStaticPropsError, ResultSuccess } from '@utils/api-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CourseIdPage = (props: Props) => {
  const result = useCourseIdPage(props.data);

  return (
    <WithDataFetchingPage
      data={result.data}
      error={props.error ?? result.error}
    >
      {(data) => (
        <Box>
          <Head>
            <title>
              {data.course.code.toUpperCase()} | Vietnamese ICT at Seneca
              College
            </title>
          </Head>

          <Box>
            <GoBackButton />

            <VStack mt="3" as="header" align="flex-start">
              <Heading as="h1" size="4xl">
                {data.course.code.toUpperCase()}
              </Heading>

              <Text
                fontSize={{
                  base: 'lg',
                  xl: '2xl',
                }}
              >
                {data.course.name}
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
              <HStack wrap="wrap" spacing="0">
                <Heading as="h2" mr="3">
                  Course reviews
                </Heading>

                <NextLink href="/course-review/add" passHref>
                  <Button
                    as="a"
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

type StaticProps = TResult<{
  course: Course;
  reviews: PopulatedCourseReview[];
}>;

type Params = {
  id: string;
};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  params,
}) => {
  try {
    const courseId = params?.id;
    if (!courseId) return handleStaticPropsError("Missing course's id");

    const { course, reviews } = await PageService.getCourseIdPage(courseId);
    if (!course) return handleStaticPropsError('Course not found');

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
      id: course.id,
    },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export default CourseIdPage;
