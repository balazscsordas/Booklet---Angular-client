import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const userToken = this.auth.userToken;
    const profileToken = this.auth.profileToken;
    const tokenToSend = profileToken ? profileToken : userToken;
    const authReq = request.clone({
      setHeaders: { Authorization: `Bearer ${tokenToSend}` },
    });
    return next.handle(authReq);
  }
}
