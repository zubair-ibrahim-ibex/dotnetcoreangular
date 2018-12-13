import { Course } from './course';

export interface Student {
    id: string,
    name: string,
    rollNo: string,
    enrollmentNo: string,
    courseIds: [string],
    studentWithCourses: [Course]
}