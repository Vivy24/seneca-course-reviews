import { Order } from '@common';
import { Course } from '..';

export type CoursesFormatOptions = Partial<{
  sortBy: 'name' | 'id' | 'createdDate';
  order: Order;
}>;

export function sortCourses(
  courses: Course[],
  options: Pick<CoursesFormatOptions, 'order' | 'sortBy'>
) {
  switch (options.sortBy) {
    case 'id':
      courses.sort((a, b) => a.courseId.localeCompare(b.courseId));
      break;

    case 'name':
      courses.sort((a, b) => a.courseName.localeCompare(b.courseName));
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
  console.log(courses);
  if (options.order === 'desc') {
    courses.reverse();
  }
}
