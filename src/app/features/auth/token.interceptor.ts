import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.authSrv.logged){
      request = request.clone({
        headers: request.headers.set(
          'Authorization', 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0NjgzNTEzMiwiZXhwIjoxNjQ3Njk5MTMyfQ.pAzXabypXRpRXezZsrU1rqK39CZQFp5s9dHQgvCRPTzLtlCC8-uS3x3tW3JPLDc_1y5WNhhMA_SrFSbJ6vlvuw'
        ).set('X-TENANT-ID', 'fe_0222b'),
      });
    }
    return next.handle(request);
  }}
