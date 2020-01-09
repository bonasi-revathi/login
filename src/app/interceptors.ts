import { Injectable, Injector  } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    if (localStorage.getItem('authtoken') !== null) {
      let tokenizedReq = req.clone(
        {
          headers: req.headers.set('token',  authService.getToken())
        }
      );
      return next.handle(tokenizedReq);
    } else {
      let tokenizedReq = req.clone(
        {
          headers: req.headers.set('token', '')
        }
      );
      return next.handle(tokenizedReq);
    }
  }
}