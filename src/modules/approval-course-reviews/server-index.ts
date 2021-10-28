import { firestore } from '@lib/firebase/firebase';

const collectionRef = firestore.collection('course_reviews');

export class ApprovalService {
  static async approveReviewByID(reviewId: string) {
    await collectionRef.doc(reviewId).update({ _isApproved: true });
  }
}
