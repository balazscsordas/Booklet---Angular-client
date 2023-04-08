import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ProgressbarService } from '../services/progressbar/progressbar.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private progressbarService: ProgressbarService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.progressbarService.setIsLoading(true);
    const userToken = this.auth.userToken;
    const profileToken = this.auth.profileToken;
    const tokenToSend = profileToken ? profileToken : userToken;
    const authReq = request.clone({
      setHeaders: { Authorization: `Bearer ${tokenToSend}` },
    });
    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event.type === HttpEventType.Response) {
            this.progressbarService.setIsLoading(false);
          }
        },
        error => {
          this.progressbarService.setIsLoading(false);
        },
      ),
    );
  }
}
