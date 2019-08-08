import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Student Info Sys';
  isFetching = false;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.authService.initialize()
      .subscribe(withCredentials => {
        if(withCredentials) {
          this.router.navigateByUrl('/students');
        } else {
          this.router.navigateByUrl('/register');
        }
        this.isFetching = false;
      });
  }

  onLogout() {
    this.authService.dismiss();
    this.router.navigateByUrl('/login');
  }
}
