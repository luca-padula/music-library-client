import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Artist } from "../artist"
import { ArtistService } from "../artist.service"

@Component({
   selector: "app-artist-detail",
   templateUrl: "./artist-detail.component.html",
   styleUrls: ["./artist-detail.component.css"],
})
export class ArtistDetailComponent implements OnInit {
   artist!: Artist

   constructor(
      private route: ActivatedRoute,
      private artistService: ArtistService
   ) {}

   ngOnInit(): void {
      this.artist = this.route.snapshot.data.artist as Artist
      console.log(this.artist)
   }
}
