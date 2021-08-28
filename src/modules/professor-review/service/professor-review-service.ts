import { firestore } from '@lib/firebase/firebase';
import { ProfessorReview } from '../model/ProfessorReview';

const collectionRef = firestore.collection('professorReviews');

export class ProfessorReviewService {
  static async getReviews(): Promise<ProfessorReview[]> {
    const snapshot = await collectionRef.get();

    return snapshot.docs.map((doc) => doc.data() as ProfessorReview);
  }

  static async addReview(review: ProfessorReview) {
    collectionRef.add(review);
  }
}
