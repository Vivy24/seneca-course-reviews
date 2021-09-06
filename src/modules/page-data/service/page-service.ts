import { Course } from '@modules/course';
import { CourseReviewService } from '@modules/course-review/service';
import { CourseService } from '@modules/course/service';

export class PageService {
  static async getCourseIdPage(courseId: string) {
    const course = await CourseService.getCourse(courseId);

    const reviews = await CourseReviewService.getReviewsByCourseId(courseId);
    const populatedReviews = await CourseReviewService.populateReviews(reviews);

    CourseReviewService.formatCourseReviews(populatedReviews, {
      sortBy: 'createdDate',
      order: 'desc',
    });

    return { course, reviews: populatedReviews };
  }

  static async getCoursesPage(): Promise<Course[]> {
    const courses = await CourseService.getAllCourses();
    CourseService.formatCourses(courses, {
      order: 'asc',
      sortBy: 'id',
    });

    return courses;
  }
}
