import { z } from 'zod';

export const addCourseFormSchema = z.object({
  code: z
    .string()
    .min(1, { message: 'Cannot be empty' })
    .refine((val) => !/[^a-zA-Z0-9]/.test(val), {
      message: 'Can only be alphanumerics',
    })
    .transform((val) => val.toLowerCase()),
  name: z.string().min(1, { message: 'Cannot be empty' }),
  _createdAt: z.string(),
  programIdList: z
    .string()
    .array()
    .min(1, { message: 'Minimum one related program' }),
});

export type AddCourseFormValues = z.infer<typeof addCourseFormSchema>;
