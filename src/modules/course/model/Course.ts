import { AddCourseFormValues } from '../components/AddCourseForm/add-course-form-schema';

export type Course = AddCourseFormValues & { id: string };
