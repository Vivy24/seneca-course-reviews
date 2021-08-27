import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import FieldRequiredSymbol from 'src/ui/FieldRequiredSymbol';
import {
  addCourseFormSchema,
  AddCourseFormValues,
} from './add-course-form-schema';

export function AddCourseForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AddCourseFormValues>({
    resolver: zodResolver(addCourseFormSchema),
    defaultValues: {
      _createdAt: new Date().toISOString(),
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
  });

  return (
    <Flex
      as="form"
      onSubmit={onSubmit}
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

      <FormControl
        id="course-description"
        isInvalid={Boolean(errors.courseDescription)}
      >
        <FormLabel>Course description</FormLabel>

        <Textarea {...register('courseDescription')} />

        <FormErrorMessage>{errors.courseDescription?.message}</FormErrorMessage>

        <FormHelperText>
          In less than 3 sentences, describe what this course is about.
        </FormHelperText>
      </FormControl>

      <Button
        type="submit"
        spinner={<Spinner />}
        mt="5"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Submit
      </Button>
    </Flex>
  );
}
