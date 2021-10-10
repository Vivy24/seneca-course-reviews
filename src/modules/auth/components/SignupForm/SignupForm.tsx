import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthApi } from '@modules/auth';
import FieldRequiredSymbol from '@ui/FieldRequiredSymbol';
import { MutationHandleSubmit } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { signupFormSchema, SignupFormValues } from './signup-form-schema';

export const SignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
  });

  const submitMutation: MutationHandleSubmit = useMutation(
    form.handleSubmit(async (data) => {
      await AuthApi.signupByPassword(data);
    })
  );

  return (
    <Flex
      as="form"
      onSubmit={submitMutation.mutate}
      noValidate
      direction="column"
      gridGap="5"
      alignItems="start"
    >
      <FormControl
        id="user-display-name"
        isInvalid={Boolean(form.formState.errors.displayName)}
      >
        <FormLabel>
          Display name
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="text" {...form.register('displayName')} />

        <FormErrorMessage>
          {form.formState.errors.displayName?.message}
        </FormErrorMessage>

        <FormHelperText>Your preferred name</FormHelperText>
      </FormControl>

      <FormControl
        id="user-email"
        isInvalid={Boolean(form.formState.errors.email)}
      >
        <FormLabel>
          Email
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="text" {...form.register('email')} />

        <FormErrorMessage>
          {form.formState.errors.email?.message}
        </FormErrorMessage>

        <FormHelperText>Your email for logging in</FormHelperText>
      </FormControl>

      <FormControl
        id="user-password"
        isInvalid={Boolean(form.formState.errors.password)}
      >
        <FormLabel>
          Password
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="password" {...form.register('password')} />

        <FormErrorMessage>
          {form.formState.errors.password?.message}
        </FormErrorMessage>

        <FormHelperText>Your password for logging in</FormHelperText>
      </FormControl>

      <FormControl
        id="user-confirm-password"
        isInvalid={Boolean(form.formState.errors.confirmPassword)}
      >
        <FormLabel>
          Confirm password
          <FieldRequiredSymbol />
        </FormLabel>

        <Input type="password" {...form.register('confirmPassword')} />

        <FormErrorMessage>
          {form.formState.errors.confirmPassword?.message}
        </FormErrorMessage>

        <FormHelperText>Re-enter your password</FormHelperText>
      </FormControl>

      <Button
        type="submit"
        spinner={<Spinner />}
        disabled={form.formState.isSubmitting}
        isLoading={form.formState.isSubmitting}
      >
        Sign Up
      </Button>

      {submitMutation.error && (
        <Flex gridGap="1" color="red" alignItems="center">
          <FaBan /> {getAxiosError(submitMutation.error)}
        </Flex>
      )}

      {submitMutation.isSuccess && (
        <Flex gridGap="1" color="green" alignItems="center">
          <FaCheckCircle /> Your account is created. Welcome to the community!
        </Flex>
      )}
    </Flex>
  );
};
