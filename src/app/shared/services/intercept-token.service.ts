import { Injectable } from "@angular/core"
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor,
} from "@angular/common/http"
import { AuthService } from "./auth.service"
import { Observable } from "rxjs"

@Injectable({
   providedIn: "root",
})
export class InterceptTokenService implements HttpInterceptor {
   constructor(private authService: AuthService) {}
   intercept(
      req: HttpRequest<any>,
      next: HttpHandler
   ): Observable<HttpEvent<any>> {
      const token = this.authService.getToken()
      req = req.clone({
         setHeaders: {
            Authorization: `JWT ${token}`,
         },
      })
      return next.handle(req)
   }
}
