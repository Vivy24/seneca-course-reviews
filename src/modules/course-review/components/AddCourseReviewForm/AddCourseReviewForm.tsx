import { CourseReviews_Index_PostBody } from '@api/course-review';
import { Courses_Index_GetData } from '@api/courses';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ApiError } from '@common';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor, useEditor } from '@modules/editor';
import { MutationHandleSubmit } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import axios from 'axios';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';
import { Slate } from 'slate-react';
import {
  AddCourseReviewFormValues,
  addCourseReviewSchema,
} from './add-course-review-schema';

export const AddCourseReviewForm = () => {
  const slate = useEditor();
  const [coursesIdList, setCoursesIdList] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<AddCourseReviewFormValues>({
    resolver: zodResolver(addCourseReviewSchema),
  });

  const { isLoading } = useQuery({
    queryKey: 'courses',
    queryFn: () => axios.get<Courses_Index_GetData>('/api/courses'),
    onError: (error: ApiError) => getAxiosError(error),
    onSuccess: (response) => {
      const idList = response.data.data.map((course) => course.courseId);
      setCoursesIdList(idList);
      setValue('courseId', idList?.[0] ?? '');
    },
  });

  const mutation: MutationHandleSubmit = useMutation(
    handleSubmit(async (data) => {
      const newReview: CourseReviews_Index_PostBody = {
        ...data,
        _createdAt: new Date().toISOString(),
        _type: 'course',
        body: slate.value,
        isRecommended: false,
        professorIdList: [],
      };

      await axios.post('/api/course-review', newReview);
    })
  );

  console.log({ isSubmitSuccessful, isSubmitting });

  return (
    <Flex
      onSubmit={mutation.mutate}
      as="form"
      noValidate
      direction="column"
      gridGap="5"
      alignItems="start"
    >
      <FormControl isInvalid={Boolean(errors.courseId)}>
        <FormLabel>
          {isLoading ? (
            <Text as="span">
              Loading courses <Spinner size="xs" />
            </Text>
          ) : (
            <Text as="span">Select a course</Text>
          )}
        </FormLabel>

        <Select {...register('courseId')}>
          {coursesIdList.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </Select>

        {errors.courseId && (
          <FormErrorMessage>{errors.courseId}</FormErrorMessage>
        )}

        <FormHelperText>
          Cannot find your course?{' '}
          <NextLink href="/course/add" passHref>
            <Button as="a" variant="link">
              Create a new one
            </Button>
          </NextLink>
        </FormHelperText>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.difficulty)}>
        <FormLabel>Difficulty</FormLabel>

        <Select {...register('difficulty')}>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>

        {errors.difficulty && (
          <FormErrorMessage>{errors.difficulty.message}</FormErrorMessage>
        )}

        <FormHelperText>1 is easy, 5 is hard</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Your review</FormLabel>

        <Box borderWidth="1px" rounded="base">
          <Slate {...slate}>
            <Editor />
          </Slate>
        </Box>
      </FormControl>

      <Button
        type="submit"
        spinner={<Spinner />}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Submit
      </Button>

      {mutation.error && (
        <Flex gridGap="1" color="red" alignItems="center">
          <FaBan /> {getAxiosError(mutation.error)}
        </Flex>
      )}

      {isSubmitSuccessful && (
        <Flex gridGap="1" color="green" alignItems="center">
          <FaCheckCircle /> Submitted. Thank you for your contribution
        </Flex>
      )}
    </Flex>
  );
};
