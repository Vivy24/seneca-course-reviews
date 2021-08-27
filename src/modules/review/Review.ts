import { Descendant } from 'slate';
import { z } from 'zod';

export const addProfessorReviewSchema = z.object({
  difficulty: z
    .string()
    .transform((val) => +val)
    .refine((val) => val >= 1 && val <= 5, {
      message: 'Must be in range 1-5',
    }),
});

export type ProfessorReview = {
  _submittedAt: string;
  _type: 'professor';
  professorId: string;
  body: Descendant[];
  isRecommended: boolean;
  rating: number;
  courseCodeList: string[];
};
