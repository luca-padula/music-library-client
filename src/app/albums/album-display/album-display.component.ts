import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Album } from "../album"

@Component({
   selector: "app-album-display",
   templateUrl: "./album-display.component.html",
   styleUrls: ["./album-display.component.css"],
})
export class AlbumDisplayComponent implements OnInit {
   @Input() album!: Album
   @Output() AddAlbumToPlaylist = new EventEmitter<Album>()

   constructor() {}

   ngOnInit(): void {}

   emitAddAlbumToPlaylistEvent(): void {
      this.AddAlbumToPlaylist.emit(this.album)
   }
}
