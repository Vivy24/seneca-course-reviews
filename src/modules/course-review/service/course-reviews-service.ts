import { firestore } from '@lib/firebase/firebase';
import { CourseReview } from '../model/CourseReview';
import { CourseReviewsFormatOptions, sortCourseReviews } from '../utils';

const collectionRef = firestore.collection('courseReviews');

export class CourseReviewService {
  static async getReviews(): Promise<CourseReview[]> {
    const snapshot = await collectionRef.where('_isApproved', '==', true).get();

    return snapshot.docs.map((doc) => doc.data() as CourseReview);
  }

  static async getReviewsByCourseId(courseId: string): Promise<CourseReview[]> {
    const snapshot = await collectionRef
      .where('_isApproved', '==', true)
      .where('courseId', '==', courseId.toLowerCase())
      .get();

    return snapshot.docs.map((doc) => doc.data() as CourseReview);
  }

  static formatCourseReviews(
    reviews: CourseReview[],
    options: CourseReviewsFormatOptions
  ) {
    if (options.sortBy) {
      sortCourseReviews(reviews, options);
    }
  }

  static async addReview(review: CourseReview) {
    collectionRef.add(review);
  }
}
