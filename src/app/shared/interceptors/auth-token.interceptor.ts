import { Injectable } from "@angular/core"
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor,
} from "@angular/common/http"
import { Observable } from "rxjs"
import { AuthService } from "../services/auth.service"

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
   constructor(private authService: AuthService) {}

   intercept(
      request: HttpRequest<any>,
      next: HttpHandler
   ): Observable<HttpEvent<any>> {
      if (this.authService.userIsAuthenticated()) {
         const token = this.authService.getToken()
         request = request.clone({
            setHeaders: {
               Authorization: `JWT ${token}`,
            },
         })
      }
      return next.handle(request)
   }
}
