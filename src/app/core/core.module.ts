import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpCredentialInterceptor } from './interceptors/http.credential.interceptor';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { StorageService } from './services/storage.service';
import { RepositoryService } from './services/repository.service';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { CourseService } from './services/course.service';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCredentialInterceptor, multi: true },
    RepositoryService,
    StorageService,
    AuthService,
    StudentService,
    CourseService,
    AuthGuard
  ]
})
export class CoreModule { }
