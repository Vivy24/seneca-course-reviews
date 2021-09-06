import { Descendant } from 'slate';
import { AddCourseReviewFormValues } from '..';

export type CourseReview = AddCourseReviewFormValues & {
  _createdAt: string;
  _isApproved: boolean;
  body: Descendant[];
};
