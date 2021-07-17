import { Injectable } from "@angular/core"
import {
   Router,
   Resolve,
   RouterStateSnapshot,
   ActivatedRouteSnapshot,
} from "@angular/router"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import { Artist } from "../artists/artist"
import { PlaylistService } from "./playlist.service"

@Injectable({
   providedIn: "root",
})
export class PlaylistResolver implements Resolve<Artist> {
   constructor(
      private playlistService: PlaylistService,
      private router: Router
   ) {}

   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<Artist> {
      const playlistId = route.paramMap.get("id")
      return this.playlistService.getPlaylistById(playlistId!).pipe(
         catchError((err) => {
            this.router.navigate(["/page-not-found"])
            return throwError(err)
         })
      )
   }
}
