import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Form } from '@ui/Form';
import { FormGroup } from '@ui/FormGroup';
import { FormSubmitErrorText } from '@ui/FormSubmitErrorText';
import { FormSubmitSuccessText } from '@ui/FormSubmitSuccessText';
import { PasswordInput } from '@ui/PasswordInput';
import { getErrorMessage } from '@utils/api-utils';
import React from 'react';
import { useSigninFormValues } from './useSigninFormValues';

export const SigninForm = () => {
  const { controllers, form, onSubmit, submitMutation } = useSigninFormValues();

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup
        id="user-email"
        label="Email"
        controllerProps={controllers.email}
        isRequired
      >
        <Input
          type="email"
          autoComplete="username"
          {...form.register('email')}
        />
      </FormGroup>

      <FormGroup
        id="user-password"
        label="Password"
        controllerProps={controllers.password}
        isRequired
      >
        <PasswordInput
          autoComplete="current-password"
          {...form.register('password')}
        />
      </FormGroup>

      <Button type="submit">Submit</Button>

      {submitMutation.error && (
        <FormSubmitErrorText message={getErrorMessage(submitMutation.error)} />
      )}

      {submitMutation.isSuccess && (
        <FormSubmitSuccessText message="Signed in!" />
      )}
    </Form>
  );
};
