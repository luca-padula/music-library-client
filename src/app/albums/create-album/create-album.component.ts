import { Component, OnInit } from "@angular/core"
import { Artist } from "src/app/artists/artist"
import { Album } from "../album"

@Component({
   selector: "app-create-album",
   templateUrl: "./create-album.component.html",
   styleUrls: ["./create-album.component.css"],
})
export class CreateAlbumComponent implements OnInit {
   album: Partial<Album> = {
      name: "",
      releaseDate: undefined,
      albumLength: "",
      artist: "",
      artistName: "",
   }

   constructor() {}

   ngOnInit(): void {}

   handleArtistSelected(artist: Artist): void {
      this.album.artist = artist._id
      this.album.artistName = artist.name
      console.log(this.album)
   }
}
