import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentsDetailResolver } from './students-detail.resolver';
import { AuthGuard } from '../core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: StudentDetailComponent,
    canActivate: [AuthGuard],
    resolve: {
      studentData: StudentsDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}