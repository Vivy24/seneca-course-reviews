import { Descendant } from 'slate';

export type CourseReview = {
  _createdAt: string;
  _type: 'course';
  courseId: string;
  body: Descendant[];
  isRecommended: boolean;
  difficulty: number;
  professorIdList: string[];
};
