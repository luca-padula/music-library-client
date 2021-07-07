import { Component, OnInit } from "@angular/core"
import { AuthService } from "src/app/auth/auth.service"
import { PlaylistService } from "../playlist.service"

@Component({
   selector: "app-playlists-page",
   templateUrl: "./playlists-page.component.html",
   styleUrls: ["./playlists-page.component.css"],
})
export class PlaylistsPageComponent implements OnInit {
   userIsAuthenticated = this.authService.userIsAuthenticated()
   private token = this.authService.getDecodedToken()
   userPlaylists$ = this.playlistService.getPlaylistsForUser(this.token._id)
   allPlaylists$ = this.playlistService.getAllPlaylists()

   constructor(
      private authService: AuthService,
      private playlistService: PlaylistService
   ) {}

   ngOnInit(): void {}
}
