import { Descendant } from 'slate';

export type CourseReview = {
  _createdAt: string;
  courseId: string;
  body: Descendant[];
  difficulty: number;
  professorNameList: string[];
  title: string;
  _isApproved: boolean;
};
