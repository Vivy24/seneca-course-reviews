import { z } from 'zod';

export const addProfessorSchema = z.object({
  name: z.string().min(1, { message: 'Cannot be empty' }),
  description: z.string().optional(),
  _createdAt: z.string(),
});

export type AddProfessorFormValues = z.infer<typeof addProfessorSchema>;
