import { CourseReviews_Index_PostBody } from '@api/course-review';
import { Courses_Index_GetData, Courses_Index_GetQuery } from '@api/courses';
import {
  Professors_Index_GetData,
  Professors_Index_GetQuery,
} from '@api/professors';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ApiError } from '@common';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useAuthContext } from '@modules/auth/context/AuthContext';
import { AddCourseForm } from '@modules/course/components/AddCourseForm/AddCourseForm';
import Editor from '@modules/editor/components/Editor/Editor';
import { useEditor } from '@modules/editor/hooks/useEditor';
import { AddProfessorForm } from '@modules/professor/components/AddProfessorForm/AddProfessorForm';
import { AxiosMutation } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import { errorsToString } from '@utils/parse-utils';
import axios from 'axios';
import NextLink from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Slate } from 'slate-react';
import {
  AddCourseReviewFormValues,
  addCourseReviewSchema,
} from './add-course-review-schema';

export const AddCourseReviewForm = () => {
  const slate = useEditor();
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenProfessor,
    onOpen: onOpenProfessor,
    onClose: onCloseProfessor,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<AddCourseReviewFormValues>({
    resolver: zodResolver(addCourseReviewSchema),
    defaultValues: {
      reviewName: user?.displayName ?? '',
      userId: user?.uid ?? '',
    },
  });
  const courseId = watch('courseId');

  const coursesQuery = useQuery({
    queryKey: 'courses',
    queryFn: async () => {
      const params: Courses_Index_GetQuery = {
        sortBy: 'id',
      };

      const res = await axios.get<Courses_Index_GetData>('/api/courses', {
        params,
      });

      return res.data.data;
    },
    onError: (error: ApiError) => getAxiosError(error),
  });

  const professorsQuery = useQuery({
    queryKey: 'professors',
    queryFn: async () => {
      const params: Professors_Index_GetQuery = {
        sort: 'name',
      };

      const res = await axios.get<Professors_Index_GetData>('/api/professors', {
        params,
      });

      return res.data.data;
    },
    onError: (error: ApiError) => getAxiosError(error),
  });

  const submitMutation: AxiosMutation<AddCourseReviewFormValues> = useMutation(
    async (data) => {
      const newReview: CourseReviews_Index_PostBody = {
        ...data,
        body: slate.value,
      };

      await axios.post('/api/course-review', newReview);
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries(['course-reviews', courseId]);
      },
    }
  );
  const onSubmit = handleSubmit((data) => submitMutation.mutate(data));

  return (
    <>
      <Flex
        onSubmit={onSubmit}
        as="form"
        noValidate
        direction="column"
        gridGap="5"
        alignItems="start"
      >
        <FormControl isInvalid={Boolean(errors.reviewName)}>
          <FormLabel>Your name</FormLabel>
          <Input {...register('reviewName')} />
          {errors.reviewName && (
            <FormErrorMessage>{errors.reviewName.message}</FormErrorMessage>
          )}

          <FormHelperText>We need your reviewer name to display</FormHelperText>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.courseId)}>
          <FormLabel>
            {coursesQuery.isFetching ? (
              <Text as="span">
                Loading courses <Spinner size="xs" />
              </Text>
            ) : (
              <Text as="span">Select a course</Text>
            )}
          </FormLabel>

          <Select {...register('courseId')}>
            <option value=""></option>

            {coursesQuery.data?.map((course) => (
              <option key={course.id} value={course.id}>
                {`${course.code.toUpperCase()} - ${course.name}`}
              </option>
            ))}
          </Select>

          {errors.courseId && (
            <FormErrorMessage>{errors.courseId.message}</FormErrorMessage>
          )}

          <FormHelperText>
            Cannot find your course?{' '}
            <Button onClick={onOpen} variant="link">
              Create a new one
            </Button>
          </FormHelperText>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.professorIdList)}>
          <FormLabel>
            {professorsQuery.isFetching ? (
              <Text as="span">
                Loading professors <Spinner size="xs" />
              </Text>
            ) : (
              <Text as="span">Select professor(s)</Text>
            )}
          </FormLabel>

          <Select
            iconSize="0"
            multiple
            {...register('professorIdList')}
            height="32"
          >
            {professorsQuery.data?.map((professor) => (
              <option key={professor.name} value={professor.id}>
                {professor.name}
              </option>
            ))}
          </Select>

          {errors.professorIdList && (
            <FormErrorMessage>
              {errorsToString(errors.professorIdList)}
            </FormErrorMessage>
          )}

          <FormHelperText>
            Cannot find your professor?{' '}
            <Button onClick={onOpenProfessor} variant="link">
              Create a new one
            </Button>
          </FormHelperText>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.difficulty)}>
          <FormLabel>Difficulty</FormLabel>

          <Select {...register('difficulty')}>
            <option value=""></option>

            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

          {errors.difficulty && (
            <FormErrorMessage>{errors.difficulty.message}</FormErrorMessage>
          )}

          <FormHelperText>
            1 is an easy course, 5 is a hard course
          </FormHelperText>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.title)}>
          <FormLabel>Review title</FormLabel>

          <Input {...register('title')} />

          {errors.title && (
            <FormErrorMessage>{errors.title.message}</FormErrorMessage>
          )}

          <FormHelperText>
            Sum up your experience with a helpful title
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Course review</FormLabel>

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

        {submitMutation.error && (
          <Flex gridGap="1" color="red" alignItems="center">
            <FaBan /> {getAxiosError(submitMutation.error)}
          </Flex>
        )}

        {isSubmitSuccessful && (
          <Flex gridGap="1" color="green" alignItems="baseline">
            <FaCheckCircle style={{ alignSelf: 'center' }} />
            Thank you! Your review will appear once it is approved.
            <NextLink href="/professor-review/add" passHref>
              <Button as="a" variant="link">
                Add reviews for professors?
              </Button>
            </NextLink>
          </Flex>
        )}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddCourseForm />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenProfessor} onClose={onCloseProfessor} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new professor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddProfessorForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
