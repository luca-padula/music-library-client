import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { take } from "rxjs/operators"
import { Artist } from "../shared/models/artist"
import { ArtistService } from "../shared/services/artist.service"
import { AuthService } from "../shared/services/auth.service"

@Component({
   selector: "app-artists",
   templateUrl: "./artists.component.html",
   styleUrls: ["./artists.component.css"],
})
export class ArtistsComponent implements OnInit {
   userIsAuthenticated: boolean
   artists$: Observable<Artist[]>
   searchInput: string
   addArtistSuccessMessage: string

   constructor(
      private artistService: ArtistService,
      private authService: AuthService
   ) {
      this.userIsAuthenticated = authService.userIsAuthenticated()
      this.artists$ = this.artistService.getAllArtists()
      this.searchInput = ""
      this.addArtistSuccessMessage = ""
   }

   ngOnInit(): void {}

   artistMatchesFilter(artist: Artist): boolean {
      return artist.name.toLowerCase().includes(this.searchInput.toLowerCase())
   }

   addArtist(): void {
      const newArtist: any = {
         name: this.searchInput,
      }
      this.artistService
         .addArtist(newArtist)
         .pipe(take(1))
         .subscribe((success) => {
            const createdArtist: Artist = success.createdArtist
            this.addArtistSuccessMessage = `succesfully added "${createdArtist.name}"`
         })
   }
}
