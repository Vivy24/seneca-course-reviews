import { firestore } from 'src/lib/firebase/firebase';
import { Course } from './Course';

const collectionRef = firestore.collection('course');

export class CourseService {
  static async addCourse(course: Course) {
    collectionRef.doc(course.courseId).set(course);
  }
}
