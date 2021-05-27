import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
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

   artistMatchesFilter(artist: Artist) {
      return artist.name.toLowerCase().includes(this.searchInput.toLowerCase())
   }

   ngOnInit(): void {}
}
