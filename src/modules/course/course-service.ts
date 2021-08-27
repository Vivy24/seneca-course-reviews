import { firestore } from 'src/lib/firebase/firebase';
import { Course } from './Course';

const collectionRef = firestore.collection('course');

export class CourseService {
  static async getCourse(courseId: string): Promise<Course | null> {
    const snapshot = await collectionRef.doc(courseId).get();

    if (!snapshot.exists) return null;

    return snapshot.data() as Course;
  }

  static async isCourseExist(courseId: string): Promise<boolean> {
    const course = await this.getCourse(courseId);

    return course !== null;
  }

  static async addCourse(course: Course) {
    collectionRef.doc(course.courseId).set(course);
  }
}
