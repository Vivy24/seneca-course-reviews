import { z } from 'zod';

export const signinFormSchema = z.object({
  email: z.string().email({
    message: 'Email should have format user@example.com',
  }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type SigninFormValues = z.infer<typeof signinFormSchema>;
