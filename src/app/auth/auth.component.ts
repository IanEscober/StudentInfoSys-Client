import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  currentUser: User
  authForm: FormGroup;
  authType: string;
  isAuthenticating = false;
  authSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.authType = url[url.length - 1].path;
      if (this.authType === 'register') {
        this.authForm.addControl('gender', new FormControl('', Validators.required));
        this.authForm.addControl('firstname', new FormControl('', Validators.required));
        this.authForm.addControl('lastname', new FormControl('', Validators.required));
      }
    });

    this.authSubscription = this.authService.isAuthenticated$
      .subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/students');
        }
      });

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSubmit() {
    this.isAuthenticating = true;
    const credentials = this.authForm.value as User;

    if (this.authType === 'login') {
      this.login(credentials);
    } else if (this.authType === 'register') {
      this.register(credentials);
    }
  }

  login(credentials: User) {
    this.authService.authenticate(credentials)
      .subscribe(
        user => this.currentUser = user,
        error => this.authService.dismiss()
      );
  }

  register(credentials: User) {
    this.authService.register(credentials)
      .subscribe(
        user => this.currentUser = user,
        error => this.authService.dismiss()
      );
  }

  logout() {
    this.authService.dismiss();
    this.router.navigateByUrl('/');
  }
}
