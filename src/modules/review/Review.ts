import { Descendant } from 'slate';

export type ProfessorReview = {
  _submittedAt: string;
  _type: 'professor';
  professorId: string;
  body: Descendant[];
  isRecommended: boolean;
  rating: number;
  courseCodeList: string[];
};
