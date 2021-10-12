import { Controllers } from '@common';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthApi, signinFormSchema, SigninFormValues } from '@modules/auth';
import { MutationHandleSubmit } from '@utilities';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

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

  const submitMutation: MutationHandleSubmit = useMutation(
    form.handleSubmit(async (data) => {
      await AuthApi.signinByPassword(data).catch((error) => {
        throw new Error(AuthApi.getAuthErrorMessage(error));
      });
    })
  );

  return {
    form,
    controllers,
    submitMutation,
  };
};
