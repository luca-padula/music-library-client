import { Injectable } from "@angular/core"
import {
   ActivatedRouteSnapshot,
   CanActivate,
   RouterStateSnapshot,
   Router,
} from "@angular/router"
import { AuthService } from "./auth.service"

@Injectable({
   providedIn: "root",
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): boolean {
      if (!this.authService.userIsAuthenticated()) {
         this.router.navigate(["/login"])
         return false
      }
      return true
   }
}
