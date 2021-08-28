import { z } from 'zod';

export const addCourseFormSchema = z.object({
  courseId: z
    .string()
    .min(1, { message: 'Cannot be empty' })
    .transform((val) => val.toLowerCase()),
  courseName: z.string().min(1, { message: 'Cannot be empty' }),
  _createdAt: z.string(),
});

export type AddCourseFormValues = z.infer<typeof addCourseFormSchema>;
