import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
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
   userPlaylists$ = this.playlistService.getPlaylistsForUser(this.token?._id)
   // TODO: Only get public playlists
   allPlaylists$ = this.playlistService.getAllPlaylists().pipe(
      map((allPlaylists) => {
         if (this.userIsAuthenticated) {
            return allPlaylists.filter(
               (playlist) =>
                  !playlist.isPrivate || playlist.creator === this.token._id
            )
         } else {
            return allPlaylists.filter((playlist) => !playlist.isPrivate)
         }
      })
   )

   constructor(
      private authService: AuthService,
      private playlistService: PlaylistService
   ) {}

   ngOnInit(): void {}
}
