import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const authUrl = req.url.substring(req.url.lastIndexOf('/') + 1);

    if (authUrl !== 'authenticate') {
      const token = this.storageService.retreive('token');
      if (token) {
        headersConfig['Authorization'] = `Bearer ${token}`;
        request = req.clone({ setHeaders: headersConfig });
      }
    }

    return next.handle(request);
  }
}
