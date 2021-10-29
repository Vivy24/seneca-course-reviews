import { Descendant } from 'slate';
import { AddCourseReviewFormValues } from '../components/AddCourseReviewForm/add-course-review-schema';

export type CourseReview = AddCourseReviewFormValues & {
  _createdAt: string;
  _isApproved: boolean;
  body: Descendant[];
};
