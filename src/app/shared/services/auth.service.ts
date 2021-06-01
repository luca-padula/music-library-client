import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { JwtHelperService } from "@auth0/angular-jwt"
import { environment } from "src/environments/environment"
import { UserLogin } from "../models/user-login"

/*
   Docs say you can create an instance of JwtHelperService and use it directly
   if you are not using extra injectable features. Injecting does not work
   without setting up JwtModule in app module imports. See canpolls app
   module for that method
*/
const jwtHelper = new JwtHelperService()

@Injectable({
   providedIn: "root",
})
export class AuthService {
   constructor(private http: HttpClient) {}

   public getToken(): any {
      return localStorage.getItem("access_token")
   }

   public setToken(token: any): void {
      localStorage.setItem("access_token", token)
   }

   public getDecodedToken(): any {
      const token = this.getToken()
      return jwtHelper.decodeToken(token)
   }

   public userIsAuthenticated(): boolean {
      const token = this.getToken()
      return !jwtHelper.isTokenExpired(token)
   }

   login(user: UserLogin): Observable<any> {
      return this.http.post<UserLogin>(
         `${environment.apiUrl}/users/login`,
         user
      )
   }

   logout(): void {
      localStorage.removeItem("access_token")
   }
}
