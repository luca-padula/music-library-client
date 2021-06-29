import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { AuthService } from "src/app/auth/auth.service"
import { Album } from "../album"

@Component({
   selector: "app-album-display",
   templateUrl: "./album-display.component.html",
   styleUrls: ["./album-display.component.css"],
})
export class AlbumDisplayComponent implements OnInit {
   @Input() album!: Album
   @Output() AddAlbumToPlaylist = new EventEmitter<Album>()
   userIsAuthenticated: boolean = this.authService.userIsAuthenticated()

   constructor(private authService: AuthService) {}

   ngOnInit(): void {}

   emitAddAlbumToPlaylistEvent(): void {
      this.AddAlbumToPlaylist.emit(this.album)
   }
}
