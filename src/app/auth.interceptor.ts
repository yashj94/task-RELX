import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
        headers: req.headers.delete('Authorization').delete('Access-Control-Allow-Origin').delete('Access-Control-Allow-Methods').delete('Access-Control-Allow-Headers')
      });
  
   
  
      // Pass on the modified request instead of the original request
    //   return next.handle(clonedRequest);
    return next.handle(clonedRequest).pipe(
        tap((event: HttpEvent<any>) => {
            debugger
        }),

        catchError((error: HttpErrorResponse) => {
            console.log(error, "Log Out Check")
            return throwError(error);

        }))  

      
  }
}
