import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { JwtHelperService } from "@auth0/angular-jwt"
import { User } from "../models/user"
import { environment } from "src/environments/environment"

@Injectable({
   providedIn: "root",
})
export class AuthService {
   constructor(private http: HttpClient, private helper: JwtHelperService) {}

   public getToken(): any {
      return localStorage.getItem("access_token")
   }

   public readToken(): any {
      const token = this.getToken()
      return this.helper.decodeToken(token)
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
