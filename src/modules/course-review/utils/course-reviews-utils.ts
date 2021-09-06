import { Order } from '@common';
import { CourseReview } from '..';

export type CourseReviewsFormatOptions = Partial<{
  sortBy: 'id' | 'createdDate';
  order: Order;
}>;

export function sortCourseReviews(
  courses: CourseReview[],
  options: Pick<CourseReviewsFormatOptions, 'order' | 'sortBy'>
) {
  switch (options.sortBy) {
    case 'id':
      courses.sort((a, b) => a.courseId.localeCompare(b.courseId));
      break;

    case 'createdDate':
      courses.sort(
        (a, b) =>
          new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
      );
      break;

    default:
      break;
  }

  if (options.order === 'desc') {
    courses.reverse();
  }
}
