import { firestore } from '@lib/firebase/firebase';
import { CourseReview } from '../model/CourseReview';

const collectionRef = firestore.collection('courseReviews');

export class CourseReviewService {
  static async getReviews(): Promise<CourseReview[]> {
    const snapshot = await collectionRef.get();

    return snapshot.docs.map((doc) => doc.data() as CourseReview);
  }

  static async addReview(review: CourseReview) {
    collectionRef.add(review);
  }
}
