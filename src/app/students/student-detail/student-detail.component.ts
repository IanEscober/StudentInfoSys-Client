import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/core/models/student.model';
import { Course } from 'src/app/core/models/course.model';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student: Student;
  enrolledCourses: Course[];
  availableCourses: Course[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const { student, enrolledCourses, availableCourses } = data.studentData;
      this.student = student;
      this.enrolledCourses = enrolledCourses;
      this.availableCourses = availableCourses;
    });
  }

  onAddCourse(course: Course) {
    this.studentService.addCourse(this.student.id, course)
      .subscribe(() => {
        this.enrolledCourses.push(course);
        this.availableCourses = this.availableCourses.filter(courses => courses.id !== course.id);
      });
  }

  onRemoveCourse(course: Course) {
    this.studentService.deleteCourse(this.student.id, course)
      .subscribe(() => {
        this.enrolledCourses = this.enrolledCourses.filter(courses => courses.id !== course.id);
        this.availableCourses.push(course);
      });
  }
  
  onBack() {
    this.location.back();
  }
}
