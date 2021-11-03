import { Program_Index_PostBody } from '@api/program';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import FieldRequiredSymbol from '@ui/FieldRequiredSymbol';
import { FormSubmitButton } from '@ui/FormSubmitButton';
import { FormSubmitErrorText } from '@ui/FormSubmitErrorText';
import { FormSubmitSuccessText } from '@ui/FormSubmitSuccessText';
import { AxiosMutation } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import {
  addProgramFormSchema,
  AddProgramFormValues,
} from './add-program-schema';

export const AddProgramForm = () => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AddProgramFormValues>({
    resolver: zodResolver(addProgramFormSchema),
    defaultValues: {
      _createdAt: new Date().toISOString(),
    },
  });

  const mutation: AxiosMutation<AddProgramFormValues> = useMutation(
    async (data) => {
      await axios.post('/api/program', data as Program_Index_PostBody);
    },
    {
      mutationKey: 'add-program',
      onSuccess: () => queryClient.invalidateQueries('programs'),
    }
  );
  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <Flex
      as="form"
      onSubmit={onSubmit}
      noValidate
      direction="column"
      gridGap="5"
      alignItems="start"
    >
      <FormControl id="program-id" isInvalid={Boolean(errors.code)}>
        <FormLabel>
          Program code
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="text" {...register('code')} />

        <FormErrorMessage>{errors.code?.message}</FormErrorMessage>

        <FormHelperText>e.g. CPA, CTY, etc.</FormHelperText>
      </FormControl>

      <FormControl id="program-name" isInvalid={Boolean(errors.name)}>
        <FormLabel>
          Program name
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="text" {...register('name')} />

        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>

        <FormHelperText>e.g. Computer Programming and Analysis</FormHelperText>
      </FormControl>

      <FormSubmitButton isSubmitting={isSubmitting}>Add</FormSubmitButton>

      {mutation.error && (
        <FormSubmitErrorText message={getAxiosError(mutation.error)} />
      )}

      {isSubmitSuccessful && (
        <FormSubmitSuccessText message="New course added successfully" />
      )}
    </Flex>
  );
};
