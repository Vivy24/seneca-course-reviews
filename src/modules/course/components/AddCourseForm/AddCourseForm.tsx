import { Course_Index_PostBody } from '@api/course';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MutationHandleSubmit } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import FieldRequiredSymbol from 'src/ui/FieldRequiredSymbol';
import {
  addCourseFormSchema,
  AddCourseFormValues,
} from './add-course-form-schema';

export function AddCourseForm() {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AddCourseFormValues>({
    resolver: zodResolver(addCourseFormSchema),
    defaultValues: {
      _createdAt: new Date().toISOString(),
    },
  });

  const mutation: MutationHandleSubmit = useMutation(
    handleSubmit(async (data) => {
      await axios.post('/api/course', data as Course_Index_PostBody);
    }),
    {
      mutationKey: 'add-course',
      onSuccess: () => queryClient.invalidateQueries('courses'),
    }
  );

  return (
    <Flex
      as="form"
      onSubmit={mutation.mutate}
      noValidate
      direction="column"
      gridGap="5"
      alignItems="start"
    >
      <FormControl id="course-id" isInvalid={Boolean(errors.courseId)}>
        <FormLabel>
          Course ID
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="text" {...register('courseId')} />

        <FormErrorMessage>{errors.courseId?.message}</FormErrorMessage>

        <FormHelperText>e.g. ULI101, IPC144, etc.</FormHelperText>
      </FormControl>

      <FormControl id="course-name" isInvalid={Boolean(errors.courseName)}>
        <FormLabel>
          Course name
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="text" {...register('courseName')} />

        <FormErrorMessage>{errors.courseName?.message}</FormErrorMessage>

        <FormHelperText>
          e.g. Introduction to UNIX/Linux and the Internet
        </FormHelperText>
      </FormControl>

      <Button
        type="submit"
        spinner={<Spinner />}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Add
      </Button>

      {mutation.error && (
        <Flex gridGap="1" color="red" alignItems="center">
          <FaBan /> {getAxiosError(mutation.error)}
        </Flex>
      )}

      {isSubmitSuccessful && (
        <Flex gridGap="1" color="green" alignItems="center">
          <FaCheckCircle /> New course added successfully
        </Flex>
      )}
    </Flex>
  );
}
