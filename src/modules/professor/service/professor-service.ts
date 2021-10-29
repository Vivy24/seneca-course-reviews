import { firestore } from '@lib/firebase/firebase';
import { Professor } from '../model/Professor';

const collectionRef = firestore.collection('professors');

export class ProfessorSerivce {
  static async getAllProfessors(): Promise<Professor[]> {
    const snapshot = await collectionRef.get();

    return snapshot.docs.map((doc) => doc.data() as Professor);
  }

  static async getProfessor(professorId: string): Promise<Professor | null> {
    const snapshot = await collectionRef.doc(professorId).get();

    return (snapshot.data() as Professor) ?? null;
  }

  static async isProfessorExist(professorId: string) {
    return (await this.getProfessor(professorId)) !== null;
  }

  static async getProfessorsByIds(
    professorsIds: string[]
  ): Promise<Professor[]> {
    if (professorsIds.length === 0) return [];

    const snapshot = await collectionRef.where('id', 'in', professorsIds).get();

    return snapshot.docs.map((doc) => doc.data() as Professor);
  }

  static async addProfessor(professor: Professor) {
    collectionRef.doc(professor.id).set(professor);
  }
}
