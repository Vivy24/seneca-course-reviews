import { firestore } from '@lib/firebase/server-index';
import { Professor } from '@modules/professor';
import { ProfessorSerivce } from '@modules/professor/server-index';
import { snapshotToData } from '@utils/convert-utils';
import { isEmptyString } from '@utils/validate-utils';
import uniq from 'lodash/uniq';
import { CourseReview } from '../model/CourseReview';
import { CourseReviewsFormatOptions, sortCourseReviews } from '../utils';

export type PopulatedCourseReview = CourseReview & {
  professors: Professor[];
};

const collectionRef = firestore.collection('courseReviews');

export class CourseReviewService {
  static async getReviews(): Promise<CourseReview[]> {
    const snapshot = await collectionRef.where('_isApproved', '==', true).get();
    return snapshotToData<CourseReview>(snapshot);
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

  public static async populateReviews(
    reviews: CourseReview[]
  ): Promise<PopulatedCourseReview[]> {
    const professorIdList = reviews
      .map((review) => review.professorIdList)
      .flat()
      .filter((professorId) => !isEmptyString(professorId));

    const professors = await ProfessorSerivce.getProfessorsByIds(
      uniq(professorIdList)
    );

    return reviews.map((review) => {
      const matchedProfessors = professors.filter((professor) =>
        review.professorIdList.includes(professor.id)
      );

      return { ...review, professors: matchedProfessors };
    });
  }

  //#region helers

  //#endregion
}
