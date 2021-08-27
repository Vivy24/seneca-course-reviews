import {
  Professor_Index_PostBody,
  Professor_Index_PostData,
} from '@api/professor';
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
import FieldRequiredSymbol from '@ui/FieldRequiredSymbol';
import { MutationHandleSubmit } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useMutation } from 'react-query';
import {
  AddProfessorFormValues,
  addProfessorSchema,
} from './add-professor-schema';

export const AddProfessorForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AddProfessorFormValues>({
    resolver: zodResolver(addProfessorSchema),
    defaultValues: {
      _createdAt: new Date().toISOString(),
    },
  });

  const mutation: MutationHandleSubmit = useMutation(
    handleSubmit((data) => {
      axios.post<Professor_Index_PostData>(
        '/api/professor',
        data as Professor_Index_PostBody
      );
    })
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
      <FormControl id="professor-name" isInvalid={Boolean(errors.name)}>
        <FormLabel>
          Professor&apos;s name
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="text" {...register('name')} />

        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>

        <FormHelperText>e.g. David Humphrey</FormHelperText>
      </FormControl>

      <FormControl
        id="professor-description"
        isInvalid={Boolean(errors.description)}
      >
        <FormLabel>Professor&apos;s description</FormLabel>

        <Textarea {...register('description')} />

        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>

        <FormHelperText>
          Describe how your experience with the prossors was
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
          <FaCheckCircle /> New professor added successfully
        </Flex>
      )}
    </Flex>
  );
};
