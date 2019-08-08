import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsDetailResolver } from './students-detail.resolver';



@NgModule({
  declarations: [
    StudentsComponent, 
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ],
  providers: [
    StudentsDetailResolver
  ]
})
export class StudentsModule { }
