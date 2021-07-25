import { Injectable } from "@angular/core"
import {
   ActivatedRouteSnapshot,
   CanActivate,
   Router,
   RouterStateSnapshot,
   UrlTree,
} from "@angular/router"
import { Observable, of, throwError } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { AuthService } from "../auth/auth.service"
import { PlaylistService } from "./playlist.service"

@Injectable({
   providedIn: "root",
})
export class PlaylistOwnerGuard implements CanActivate {
   constructor(
      private playlistService: PlaylistService,
      private authService: AuthService,
      private router: Router
   ) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<boolean> {
      const token = this.authService.getDecodedToken()
      if (this.authService.userIsAuthenticated()) {
         const playlistId = route.paramMap.get("id")
         return this.playlistService.getPlaylistById(playlistId!).pipe(
            map((playlist) => {
               if (playlist.creator === token._id) {
                  return true
               }
               this.router.navigate(["/login"])
               return false
            }),
            catchError((err) => {
               this.router.navigate(["/page-not-found"])
               return throwError(err)
            })
         )
      }
      this.router.navigate(["/login"])
      return of(false)
   }
}
