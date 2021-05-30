import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { JwtHelperService } from "@auth0/angular-jwt"
import { User } from "../models/user"
import { environment } from "src/environments/environment"

/*
   Web 422 guide creates new jwt helper service here instead of
   injecting it in constructor. Injecting does not work without
   setting up JwtModule in app module imports. See canpolls app
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

   public readToken(): any {
      const token = this.getToken()
      return jwtHelper.decodeToken(token)
   }

   public userIsAuthenticated(): boolean {
      const token = this.getToken()
      if (token != null) {
         return true
      }
      return false
   }

   login(user: User): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/users/login`, user)
   }
}
