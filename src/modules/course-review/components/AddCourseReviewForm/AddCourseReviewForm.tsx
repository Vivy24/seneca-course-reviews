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
import { AddCourseForm, Course } from '@modules/course';
import { Editor, useEditor } from '@modules/editor';
import { AddProfessorForm, Professor } from '@modules/professor';
import { MutationHandleSubmit } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import axios from 'axios';
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenProfessor,
    onOpen: onOpenProfessor,
    onClose: onCloseProfessor,
  } = useDisclosure();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<AddCourseReviewFormValues>({
    resolver: zodResolver(addCourseReviewSchema),
  });

  const { isFetching } = useQuery({
    queryKey: 'courses',
    queryFn: () => {
      const params: Courses_Index_GetQuery = {
        sort: 'id',
      };

      return axios.get<Courses_Index_GetData>('/api/courses', {
        params,
      });
    },
    onError: (error: ApiError) => getAxiosError(error),
    onSuccess: (response) => {
      const data = response.data.data.sort((a, b) =>
        a.courseName.localeCompare(b.courseName)
      );
      setCourses(data);
    },
  });

  const { isFetching: isFetchingProfessors } = useQuery({
    queryKey: 'professors',
    queryFn: () => {
      const params: Professors_Index_GetQuery = {
        sort: 'name',
      };

      return axios.get<Professors_Index_GetData>('/api/professors', {
        params,
      });
    },
    onError: (error: ApiError) => getAxiosError(error),
    onSuccess: (response) => {
      const data = response.data.data;
      setProfessors(data);
    },
  });

  const mutation: MutationHandleSubmit = useMutation(
    handleSubmit(async (data) => {
      const newReview: CourseReviews_Index_PostBody = {
        ...data,
        _createdAt: new Date().toISOString(),
        body: slate.value,
      };

      await axios.post('/api/course-review', newReview);
    })
  );

  return (
    <>
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
            {isFetching ? (
              <Text as="span">
                Loading courses <Spinner size="xs" />
              </Text>
            ) : (
              <Text as="span">Select a course</Text>
            )}
          </FormLabel>

          <Select {...register('courseId')}>
            <option value="">Pick a course</option>

            {courses.map((course) => (
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

        <FormControl isInvalid={Boolean(errors.professorNameList)}>
          <FormLabel>
            {isFetchingProfessors ? (
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
            {...register('professorNameList')}
            height="32"
          >
            {professors.map((professor) => (
              <option key={professor.name} value={professor.name}>
                {professor.name}
              </option>
            ))}
          </Select>

          {errors.professorNameList && (
            <FormErrorMessage>
              {errors.professorNameList.message}
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
            <option value="">Choose difficult level</option>

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
