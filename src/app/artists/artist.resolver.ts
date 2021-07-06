import { Injectable } from "@angular/core"
import {
   Router,
   Resolve,
   RouterStateSnapshot,
   ActivatedRouteSnapshot,
} from "@angular/router"
import { Observable, of, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import { Artist } from "./artist"
import { ArtistService } from "./artist.service"

@Injectable({
   providedIn: "root",
})
export class ArtistResolver implements Resolve<Artist> {
   constructor(private artistService: ArtistService, private router: Router) {}

   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<Artist> {
      let artistId = route.paramMap.get("id")
      return this.artistService.getArtistById(artistId!).pipe(
         catchError((err) => {
            this.router.navigate(["/page-not-found"])
            return throwError(err)
         })
      )
   }
}
