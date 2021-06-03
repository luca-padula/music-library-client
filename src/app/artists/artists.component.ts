import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { take } from "rxjs/operators"
import { Artist } from "../shared/models/artist"
import { ArtistService } from "../shared/services/artist.service"

@Component({
   selector: "app-artists",
   templateUrl: "./artists.component.html",
   styleUrls: ["./artists.component.css"],
})
export class ArtistsComponent implements OnInit {
   artists$: Observable<Artist[]>
   searchInput: string = ""

   constructor(private artistService: ArtistService) {
      this.artists$ = this.artistService.getAllArtists()
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
            console.log("succesfully created: ", success.createdArtist)
         })
   }
}
