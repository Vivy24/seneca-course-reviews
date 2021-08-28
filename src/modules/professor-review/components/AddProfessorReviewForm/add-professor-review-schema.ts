import { z } from 'zod';

export const addProfessorReviewSchema = z.object({
  professorName: z.string().min(1, { message: 'Must choose a professor' }),
  courseId: z.string().min(1, { message: 'Must choose a course' }),
  isRecommended: z.boolean(),
  difficulty: z
    .string()
    .transform((val) => +val)
    .refine((val) => val <= 5, { message: 'Maximum value is 5' })
    .refine((val) => val >= 1, { message: 'Minimum value is 1' }),
});

export type AddProfessorReviewFormValues = z.infer<
  typeof addProfessorReviewSchema
>;
