import { Component, OnInit } from '@angular/core';
import { StudentService } from '../core/services/student.service';
import { Student } from '../core/models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  isFetching = false;


  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(filter: string = null) {
    this.isFetching = true;
    this.studentService.getStudents()
      .subscribe(students => {
        if (filter) {
          this.students = students.filter(student => student.gender === filter);
        } else {
          this.students = students;
        }
        this.isFetching = false;
      });
  }

  onFilter(gender: string) {
    if (gender === 'male' || gender === 'female') {
      this.getStudents(gender);
    } else if (gender === 'reset') {
      this.getStudents();
    }
  }
}
