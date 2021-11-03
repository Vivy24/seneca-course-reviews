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
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import FieldRequiredSymbol from '@ui/FieldRequiredSymbol';
import { AxiosMutation } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import {
  AddProfessorFormValues,
  addProfessorSchema,
} from './add-professor-schema';

export const AddProfessorForm = () => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,

    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AddProfessorFormValues>({
    resolver: zodResolver(addProfessorSchema),
    defaultValues: {
      _createdAt: new Date().toISOString(),
    },
  });

  const submitMutation: AxiosMutation<AddProfessorFormValues> = useMutation(
    async (data) => {
      await axios.post<Professor_Index_PostData>(
        '/api/professor',
        data as Professor_Index_PostBody
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('professors');
      },
    }
  );
  const onSubmit = handleSubmit((data) => submitMutation.mutate(data));

  return (
    <Flex
      as="form"
      onSubmit={onSubmit}
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

      <Button
        type="submit"
        spinner={<Spinner />}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Add
      </Button>

      {submitMutation.error && (
        <Flex gridGap="1" color="red" alignItems="center">
          <FaBan /> {getAxiosError(submitMutation.error)}
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
