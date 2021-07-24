import { Injectable } from "@angular/core"
import {
   Router,
   Resolve,
   RouterStateSnapshot,
   ActivatedRouteSnapshot,
} from "@angular/router"
import { Observable, of, throwError } from "rxjs"
import { catchError, switchMap } from "rxjs/operators"
import { AuthService } from "../auth/auth.service"
import { ApiError } from "../shared/models/api-error"
import { Playlist } from "./playlist"
import { PlaylistService } from "./playlist.service"

@Injectable({
   providedIn: "root",
})
export class PlaylistResolver implements Resolve<Playlist> {
   private token = this.authService.getDecodedToken()

   constructor(
      private playlistService: PlaylistService,
      private router: Router,
      private authService: AuthService
   ) {}

   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<Playlist> {
      const playlistId = route.paramMap.get("id")
      return this.playlistService.getPlaylistById(playlistId!).pipe(
         switchMap((playlist) => {
            if (playlist.isPrivate) {
               if (
                  this.authService.userIsAuthenticated() &&
                  this.token._id === playlist.creator
               ) {
                  return of(playlist)
               }
               const err: ApiError = {
                  message: "not authorized for playlist",
                  status: 401,
                  validationErrors: undefined,
               }
               return throwError(err)
            }

            return of(playlist)
         }),
         catchError((err) => {
            this.router.navigate(["/page-not-found"])
            return throwError(err)
         })
      )
   }
}
