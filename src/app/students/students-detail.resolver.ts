import { Injectable } from '@angular/core';
import { Student } from '../core/models/student.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StudentService } from '../core/services/student.service';
import { Observable } from 'rxjs';
import { CourseService } from '../core/services/course.service';
import { concatMap, map } from 'rxjs/operators';
import { Course } from '../core/models/course.model';

@Injectable()
export class StudentsDetailResolver implements Resolve<{ student: Student, enrolledCourses: Course[], availableCourses: Course[] }> {
  constructor(
    private studentService: StudentService,
    private courseService: CourseService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ student: Student, enrolledCourses: Course[], availableCourses: Course[] }> {
    return this.studentService.getStudent(route.params['id'])
      .pipe(
        concatMap(student => this.courseService.getCourses()
          .pipe(
            map(courses => {
              let enrolledCourses = [];
              let availableCourses = [];

              if (student.enrollments) {
                enrolledCourses = courses.filter(course => student.enrollments.some(enrollment => enrollment.id === course.id));
                availableCourses = courses.filter(course => !student.enrollments.some(enrollment => enrollment.id === course.id));
              }

              return { student, enrolledCourses, availableCourses }
            })
          )
        )
      )
  }
}
