import { z } from 'zod';

const matchSpecialChar = /[^\w]/;
const matchUpperChar = /[A-Z]/;
const matchLowerChar = /[a-z]/;

export const signupFormSchema = z
  .object({
    email: z.string().email({
      message: 'Email should have format user@example.com',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Minimum length is 8',
      })
      .regex(matchSpecialChar, {
        message: 'Must include at least 1 special character',
      })
      .regex(matchUpperChar, {
        message: 'Must include at least 1 upper character',
      })
      .regex(matchLowerChar, {
        message: 'Must include at least 1 lower character',
      }),
    confirmPassword: z.string(),
    displayName: z.string().min(1, { message: 'Display name is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupFormSchema>;
