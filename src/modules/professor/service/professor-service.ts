import { firestore } from '@lib/firebase/firebase';
import { AddProfessorFormValues } from '../components/AddProfessorForm/add-professor-schema';
import { Professor } from '../model/Professor';

const collectionRef = firestore.collection('professors');

export class ProfessorSerivce {
  static async getAllProfessors(): Promise<Professor[]> {
    const snapshot = await collectionRef.get();

    return snapshot.docs.map((doc) => doc.data() as Professor);
  }

  static async addProfessor(professor: AddProfessorFormValues) {
    collectionRef.doc(professor.name).set(professor);
  }
}
