import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Subject } from "rxjs"
import { Album } from "src/app/albums/album"
import { AuthService } from "src/app/auth/auth.service"
import { emptyPlaylist, Playlist } from "../playlist"

@Component({
   selector: "app-playlist-detail",
   templateUrl: "./playlist-detail.component.html",
   styleUrls: ["./playlist-detail.component.css"],
})
export class PlaylistDetailComponent implements OnInit {
   playlist = emptyPlaylist
   playlistAlbums: Album[] = []
   private token = this.authService.getDecodedToken()
   userIsAuthenticated = this.authService.userIsAuthenticated()

   addAlbumToPlaylistAction = new Subject<Album>()

   constructor(
      private route: ActivatedRoute,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      this.playlist = this.route.snapshot.data.playlist as Playlist
      this.playlistAlbums = this.playlist.albums as Album[]
   }
}
