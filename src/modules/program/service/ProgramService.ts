import { PartiallyPartial } from '@utilities';
import { firestore } from 'src/lib/firebase/firebase';
import { Program } from '../model/Program';

const collectionRef = firestore.collection('program');

export class ProgramService {
  static async getProgram(courseId: string): Promise<Program | null> {
    const snapshot = await collectionRef.doc(courseId).get();

    if (!snapshot.exists) return null;

    return snapshot.data() as Program;
  }

  static async getAllPrograms(): Promise<Program[]> {
    const snapshot = await collectionRef.get();

    return snapshot.docs.map((doc) => doc.data() as Program);
  }

  static async isProgramExist(courseId: string): Promise<boolean> {
    const course = await this.getProgram(courseId);

    return course !== null;
  }

  static async addProgram(program: Program) {
    collectionRef.doc(program.id).set(program);
  }

  static async updateProgram(program: PartiallyPartial<Program, 'id'>) {
    collectionRef.doc(program.id).update(program);
  }
}
