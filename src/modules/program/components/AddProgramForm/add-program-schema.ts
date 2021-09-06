import { z } from 'zod';

export const addProgramFormSchema = z.object({
  code: z
    .string()
    .min(1, { message: 'Cannot be empty' })
    .transform((val) => val.toLowerCase()),
  name: z.string().min(1, { message: 'Cannot be empty' }),
  _createdAt: z.string(),
});

export type AddProgramFormValues = z.infer<typeof addProgramFormSchema>;
