import { Injectable } from "@angular/core"
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor,
   HttpErrorResponse,
} from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import { ApiError } from "../models/api-error"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   constructor() {}

   intercept(
      request: HttpRequest<any>,
      next: HttpHandler
   ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(this.handleError))
   }

   handleError(err: HttpErrorResponse) {
      console.error("Http error response: \n", err)
      return throwError(err.error as ApiError)
   }
}
