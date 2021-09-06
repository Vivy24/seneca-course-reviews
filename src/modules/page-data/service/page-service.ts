import { CourseReviewService } from '@modules/course-review/service';
import { CourseService } from '@modules/course/service';

export class PageService {
  static async getCourseIdPage(courseId: string) {
    const course = await CourseService.getCourse(courseId);

    const reviews = await CourseReviewService.getReviewsByCourseId(courseId);

    CourseReviewService.formatCourseReviews(reviews, {
      sortBy: 'createdDate',
      order: 'desc',
    });

    return { course, reviews };
  }
}
