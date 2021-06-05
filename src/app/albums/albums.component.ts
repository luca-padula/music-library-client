import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { Album } from "../shared/models/album"
import { AlbumService } from "../shared/services/album.service"

@Component({
   selector: "app-albums",
   templateUrl: "./albums.component.html",
   styleUrls: ["./albums.component.css"],
})
export class AlbumsComponent implements OnInit {
   albums$: Observable<Album[]>

   constructor(private albumService: AlbumService) {
      this.albums$ = this.albumService.getAllAlbums()
   }

   ngOnInit(): void {}
}
