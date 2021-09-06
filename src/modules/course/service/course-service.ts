import { PartiallyPartial } from '@utilities';
import { firestore as admin } from 'firebase-admin';
import { firestore } from 'src/lib/firebase/firebase';
import { Course, CoursesFormatOptions, sortCourses } from '..';

const collectionRef = firestore.collection('courses');

export class CourseService {
  static async getCourse(courseId: string): Promise<Course | null> {
    const snapshot = await collectionRef.doc(courseId.toLowerCase()).get();

    if (!snapshot.exists) return null;

    return snapshot.data() as Course;
  }

  static async getAllCourses(): Promise<Course[]> {
    const snapshot = await collectionRef.get();

    return snapshot.docs.map((doc) => doc.data() as Course);
  }

  static async isCourseExist(courseId: string): Promise<boolean> {
    const course = await this.getCourse(courseId.toLowerCase());

    return course !== null;
  }

  static async addCourse(course: Course) {
    collectionRef.doc(course.id.toLowerCase()).set(course);
  }

  static async updateCourse(course: PartiallyPartial<Course, 'id'>) {
    collectionRef.doc(course.id.toLowerCase()).update(course);
  }

  static async addProgramsToCourse(courseId: string, programIdList: string[]) {
    const updatedList = admin.FieldValue.arrayUnion(
      ...programIdList
    ) as unknown as string[];

    this.updateCourse({
      id: courseId.toLowerCase(),
      programIdList: updatedList,
    });
  }

  static formatCourses(courses: Course[], options: CoursesFormatOptions): void {
    if (options.sortBy) {
      sortCourses(courses, options);
    }
  }
}
