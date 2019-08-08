import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Auth } from '../models/auth.model';
import { RepositoryService } from './repository.service';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';
import { map, concatMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private authUrl = 'authenticate';
  private studentsUrl = 'students'
  private userSubject = new BehaviorSubject<User>({} as User);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  user$ = this.userSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private repositoryService: RepositoryService,
    private storageService: StorageService
  ) {
    this.authUrl = this.repositoryService.baseUrl + this.authUrl;
    this.studentsUrl = this.repositoryService.baseUrl + this.studentsUrl;
  }

  setAuth(auth: Auth) {
    this.storageService.store('token', auth.token);
    this.userSubject.next(auth.data);
    this.isAuthenticatedSubject.next(true);
  }

  initialize(): Observable<boolean> {
    const credentials = this.storageService.retreive<string>('credentials');
    if (credentials) {
      return this.repositoryService.post<Auth>(this.authUrl)
        .pipe(
          map(auth => {
            this.setAuth(auth);
            return true;
          })
        );
    } else {
      return of(false);
    }
  }

  dismiss() {
    this.storageService.remove('credentials');
    this.storageService.remove('token');
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next({} as User);
  }

  authenticate(user: User): Observable<User> {
    const credentials = window.btoa(`${user.email}:${user.password}`);
    this.storageService.store('credentials', credentials);
    return this.repositoryService.post<Auth>(this.authUrl)
      .pipe(
        map(auth => {
          this.setAuth(auth);
          return auth.data;
        })
      );
  }

  register(user: User): Observable<User> {
    return this.repositoryService.post<User>(this.studentsUrl, user)
      .pipe(
        concatMap(newUser => {
          newUser.password = user.password;
          return this.authenticate(newUser);
        })
      );
  }
}
