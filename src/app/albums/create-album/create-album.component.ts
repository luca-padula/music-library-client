import { Component, OnInit } from "@angular/core"
import { Album } from "../album"
import { AlbumService } from "../album.service"

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

   constructor(private albumService: AlbumService) {}

   ngOnInit(): void {}
}
