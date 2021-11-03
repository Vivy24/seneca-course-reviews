import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { AuthApi } from '@modules/auth/api/auth-api';
import FieldRequiredSymbol from '@ui/FieldRequiredSymbol';
import { Form } from '@ui/Form';
import { FormSubmitButton } from '@ui/FormSubmitButton';
import { FormSubmitErrorText } from '@ui/FormSubmitErrorText';
import { FormSubmitSuccessText } from '@ui/FormSubmitSuccessText';
import { PasswordInput } from '@ui/PasswordInput';
import { AxiosMutation } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signupFormSchema, SignupFormValues } from './signup-form-schema';

export const SignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
  });

  const submitMutation: AxiosMutation<SignupFormValues> = useMutation(
    AuthApi.signupByPassword
  );

  const onSubmit = form.handleSubmit((data) => submitMutation.mutate(data));

  return (
    <Form onSubmit={onSubmit}>
      <FormControl
        id="user-display-name"
        isInvalid={Boolean(form.formState.errors.displayName)}
      >
        <FormLabel>
          Display name
          <FieldRequiredSymbol />
        </FormLabel>

        <Input
          type="text"
          autoComplete="off"
          {...form.register('displayName')}
        />

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

        <Input type="email" autoComplete="email" {...form.register('email')} />

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

        <PasswordInput
          autoComplete="new-password"
          {...form.register('password')}
        />

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

        <PasswordInput
          autoComplete="new-password"
          {...form.register('confirmPassword')}
        />

        <FormErrorMessage>
          {form.formState.errors.confirmPassword?.message}
        </FormErrorMessage>

        <FormHelperText>Re-enter your password</FormHelperText>
      </FormControl>

      <FormSubmitButton isSubmitting={form.formState.isSubmitting}>
        Sign Up
      </FormSubmitButton>

      {submitMutation.error && (
        <FormSubmitErrorText message={getAxiosError(submitMutation.error)} />
      )}

      {submitMutation.isSuccess && (
        <FormSubmitSuccessText message="Your account is created. Welcome to the community!" />
      )}
    </Form>
  );
};
