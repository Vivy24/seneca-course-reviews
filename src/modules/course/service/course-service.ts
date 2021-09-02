import { PartiallyPartial } from '@utilities';
import { firestore as admin } from 'firebase-admin';
import { firestore } from 'src/lib/firebase/firebase';
import { Course } from '..';

const collectionRef = firestore.collection('course');

export class CourseService {
  static async getCourse(courseId: string): Promise<Course | null> {
    const snapshot = await collectionRef.doc(courseId).get();

    if (!snapshot.exists) return null;

    return snapshot.data() as Course;
  }

  static async getAllCourses(): Promise<Course[]> {
    const snapshot = await collectionRef.get();

    return snapshot.docs.map((doc) => doc.data() as Course);
  }

  static async isCourseExist(courseId: string): Promise<boolean> {
    const course = await this.getCourse(courseId);

    return course !== null;
  }

  static async addCourse(course: Course) {
    collectionRef.doc(course.courseId).set(course);
  }

  static async updateCourse(course: PartiallyPartial<Course, 'courseId'>) {
    collectionRef.doc(course.courseId).update(course);
  }

  static async addProgramsToCourse(courseId: string, programIdList: string[]) {
    const updatedList = admin.FieldValue.arrayUnion(
      ...programIdList
    ) as unknown as string[];

    this.updateCourse({
      courseId,
      programIdList: updatedList,
    });
  }
}
