import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { AuthService } from './auth.service';
import { Course } from '../models/course.model';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class StudentService {
  private studentsUrl = 'students';

  constructor(
    private respositoryService: RepositoryService
  ) {
    this.studentsUrl = this.respositoryService.baseUrl + this.studentsUrl;
  }

  getStudents(): Observable<Student[]> {
    return this.respositoryService.get<Student[]>(this.studentsUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.respositoryService.get<Student>(`${this.studentsUrl}/${id}`);
  }

  addCourse(studentId: number, course: Course): Observable<string> {
    const enrollmentUrl = `${this.studentsUrl}/${studentId}/enrollments`;
    return this.respositoryService.post(enrollmentUrl, { courseId: course.id });
  }

  deleteCourse(studentId: number, course: Course): Observable<{}> {
    const enrollmentUrl = `${this.studentsUrl}/${studentId}/enrollments`;
    return this.respositoryService.delete(enrollmentUrl, { courseId: course.id });
  }
}
