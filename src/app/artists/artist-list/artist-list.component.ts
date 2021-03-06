import { Component, OnInit } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { take, takeUntil } from "rxjs/operators"
import { Artist } from "../artist"
import { ArtistService } from "../artist.service"
import { AuthService } from "../../auth/auth.service"

@Component({
   selector: "app-artists",
   templateUrl: "./artist-list.component.html",
   styleUrls: ["./artist-list.component.css"],
})
export class ArtistListComponent implements OnInit {
   userIsAuthenticated: boolean
   artists: Artist[]
   filteredArtists: Artist[]
   ngUnsubscribe: Subject<any>
   searchInput: string
   addArtistSuccessMessage: string
   addArtistFailMessage: string

   constructor(
      private artistService: ArtistService,
      private authService: AuthService
   ) {
      this.userIsAuthenticated = authService.userIsAuthenticated()
      this.artists = []
      this.filteredArtists = []
      this.ngUnsubscribe = new Subject<any>()
      this.searchInput = ""
      this.addArtistSuccessMessage = ""
      this.addArtistFailMessage = ""
   }

   ngOnInit(): void {
      this.artistService
         .getAllArtists()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((artists) => {
            this.artists = artists
            this.filteredArtists = artists
         })
   }

   onArtistSearchKeyup(event: any): void {
      const searchTerm = event.target.value.toLowerCase()
      this.filteredArtists = this.artists.filter((artist) => {
         return artist.name.toLowerCase().includes(searchTerm)
      })
   }

   addArtist(): void {
      this.addArtistSuccessMessage = ""
      this.addArtistFailMessage = ""
      const newArtist: Partial<Artist> = {
         name: this.searchInput,
      }
      this.artistService
         .addArtist(newArtist)
         .pipe(take(1))
         .subscribe(
            (success) => {
               const createdArtist: Artist = success.createdArtist
               this.addArtistSuccessMessage = `succesfully added "${createdArtist.name}"`
               this.artists = [...this.artists, createdArtist]
               this.filteredArtists = [...this.filteredArtists, createdArtist]
            },
            (err) => (this.addArtistFailMessage = err.message)
         )
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
