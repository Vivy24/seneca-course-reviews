import { Descendant } from 'slate';

export type ProfessorReview = {
  _createdAt: string;
  isRecommended: boolean;
  difficulty: number;
  professorName: string;
  body: Descendant[];
};
