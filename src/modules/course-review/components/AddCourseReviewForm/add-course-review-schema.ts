import { z } from 'zod';

export const addCourseReviewSchema = z.object({
  courseId: z.string().min(1, 'Have to select a course ID'),
  difficulty: z
    .string()
    .transform((val) => +val)
    .refine((val) => val <= 5, { message: 'Maximum value is 5' })
    .refine((val) => val >= 1, { message: 'Minimum value is 1' }),
});

export type AddCourseReviewFormValues = z.infer<typeof addCourseReviewSchema>;
