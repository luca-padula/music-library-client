import { Injectable } from "@angular/core"
import {
   Router,
   Resolve,
   RouterStateSnapshot,
   ActivatedRouteSnapshot,
} from "@angular/router"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import { Playlist } from "./playlist"
import { PlaylistService } from "./playlist.service"

@Injectable({
   providedIn: "root",
})
export class PlaylistResolver implements Resolve<Playlist> {
   constructor(
      private playlistService: PlaylistService,
      private router: Router
   ) {}

   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<Playlist> {
      const playlistId = route.paramMap.get("id")
      return this.playlistService.getPlaylistById(playlistId!).pipe(
         catchError((err) => {
            this.router.navigate(["/page-not-found"])
            return throwError(err)
         })
      )
   }
}
