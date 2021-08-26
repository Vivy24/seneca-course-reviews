import { Descendant } from 'slate';

export type Review = ProfessorReview | CourseReview;

export type ProfessorReview = {
  _submittedAt: string;
  _type: 'professor';
  professorId: string;
  body: Descendant[];
  isRecommended: boolean;
  rating: number;
  courseCodeList: string[];
};

export type CourseReview = {
  _submittedAt: string;
  _type: 'course';
  courseId: string;
  body: Descendant[];
  isRecommended: boolean;
  rating: number;
  professorIdList: string[];
};
