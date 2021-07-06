import { Component, OnInit } from "@angular/core"
import { AlbumService } from "../album.service"

@Component({
   selector: "app-albums-page",
   templateUrl: "./albums-page.component.html",
   styleUrls: ["./albums-page.component.css"],
})
export class AlbumsPageComponent implements OnInit {
   allAlbums$ = this.albumService.getAllAlbums()

   constructor(private albumService: AlbumService) {}

   ngOnInit(): void {}
}
