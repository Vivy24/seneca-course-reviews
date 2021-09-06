import { Courses_Index_GetData, Courses_Index_GetQuery } from '@api/courses';
import { ProfessorReview_Index_PostBody } from '@api/professor-review';
import {
  Professors_Index_GetData,
  Professors_Index_GetQuery,
} from '@api/professors';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCourseForm } from '@modules/course';
import { Editor, useEditor } from '@modules/editor';
import { AddProfessorForm } from '@modules/professor';
import { MutationHandleSubmit } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import axios from 'axios';
import NextLink from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';
import { Slate } from 'slate-react';
import {
  AddProfessorReviewFormValues,
  addProfessorReviewSchema,
} from './add-professor-review-schema';

export const AddProfessorReviewForm = () => {
  const slate = useEditor();

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
  } = useForm<AddProfessorReviewFormValues>({
    resolver: zodResolver(addProfessorReviewSchema),
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

  const submitMutation: MutationHandleSubmit = useMutation(
    handleSubmit(async (data) => {
      const newReview: ProfessorReview_Index_PostBody = {
        ...data,
        _createdAt: new Date().toISOString(),
        body: slate.value,
      };

      await axios.post('/api/professor-review', newReview);
    })
  );

  return (
    <>
      <Flex
        onSubmit={submitMutation.mutate}
        as="form"
        noValidate
        direction="column"
        gridGap="5"
        alignItems="start"
      >
        <FormControl isInvalid={Boolean(errors.professorName)}>
          <FormLabel>
            {professorsQuery.isFetching ? (
              <Text as="span">
                Loading professors <Spinner size="xs" />
              </Text>
            ) : (
              <Text as="span">Select a professor</Text>
            )}
          </FormLabel>

          <Select {...register('professorName')}>
            <option value=""></option>

            {professorsQuery.data?.map((professor) => (
              <option key={professor.name} value={professor.name}>
                {professor.name}
              </option>
            ))}
          </Select>

          {errors.professorName && (
            <FormErrorMessage>{errors.professorName.message}</FormErrorMessage>
          )}

          <FormHelperText>
            Cannot find your professor?{' '}
            <Button onClick={onOpenProfessor} variant="link">
              Create a new one
            </Button>
          </FormHelperText>
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

          <Select iconSize="0" {...register('courseId')}>
            <option value=""></option>

            {coursesQuery.data?.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {`${course.courseId.toUpperCase()} - ${course.courseName}`}
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
            1 is an easy marker, 5 is a hard marker
          </FormHelperText>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.isRecommended)}>
          <FormLabel>Recommended</FormLabel>
          <Checkbox {...register('isRecommended')}>
            I like this professor
          </Checkbox>

          {errors.isRecommended && (
            <FormErrorMessage>{errors.isRecommended.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Professor review</FormLabel>

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
          <Flex gridGap="1" color="green" alignItems="center">
            <FaCheckCircle /> Thank you for your contribution.
            <NextLink href="/course-review/add" passHref>
              <Button as="a" variant="link">
                Add a review for the course{' '}
                <Text fontStyle="italic" ml="1">
                  {courseId}
                </Text>
                ?
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
