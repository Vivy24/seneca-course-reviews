import { Controllers } from '@common';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { AuthApi } from '@modules/auth/api/auth-api';
import { AxiosMutation } from '@utilities';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signinFormSchema, SigninFormValues } from './signin-form-schema';

type SigninFormControllers = Controllers<SigninFormValues>;

export const useSigninFormValues = () => {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
  });

  const { control } = form;

  const controllers: SigninFormControllers = {
    email: {
      control,
      name: 'email',
    },
    password: {
      control,
      name: 'password',
    },
  };

  const submitMutation: AxiosMutation<SigninFormValues> = useMutation(
    async (data) => {
      await AuthApi.signinByPassword(data).catch((error) => {
        throw new Error(AuthApi.getAuthErrorMessage(error));
      });
    }
  );

  const onSubmit = form.handleSubmit((data) => submitMutation.mutate(data));

  return {
    form,
    controllers,
    onSubmit,
    submitMutation,
  };
};
