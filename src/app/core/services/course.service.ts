import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable()
export class CourseService {
  private coursesUrl = 'courses';

  constructor(
    private repositoryService: RepositoryService
  ) {
    this.coursesUrl = this.repositoryService.baseUrl + this.coursesUrl;
  }

  getCourses(): Observable<Course[]> {
    return this.repositoryService.get<Course[]>(this.coursesUrl);
  }
}
