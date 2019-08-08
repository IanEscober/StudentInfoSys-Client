import { User } from './user.model';
import { Course } from './course.model';

export interface Student extends User {
    enrollments: Course[];
}
