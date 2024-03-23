import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {

    let token = this.authService.getToken();
    if (token) {
      req = req.clone({ 
        setHeaders: { Authorization: token } 
      });
    }
    return next.handle(req);
  }
}
