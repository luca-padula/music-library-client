import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Subject } from "rxjs"
import { take } from "rxjs/operators"
import { Album } from "src/app/albums/album"
import { AuthService } from "src/app/auth/auth.service"
import { emptyPlaylist, Playlist } from "../playlist"
import { PlaylistService } from "../playlist.service"

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
   userOwnsPlaylist = false

   addAlbumToPlaylistAction = new Subject<Album>()

   constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private playlistService: PlaylistService
   ) {}

   ngOnInit(): void {
      this.playlist = this.route.snapshot.data.playlist as Playlist
      this.playlistAlbums = this.playlist.albums as Album[]
      if (this.userIsAuthenticated) {
         this.userOwnsPlaylist = this.playlist.creator === this.token._id
      }
   }

   private updateLocalPlaylistAlbums(albumToRemove: Album): void {
      const updatedAlbums = this.playlistAlbums
      const removedIdx = updatedAlbums.findIndex(
         (album) => album._id === albumToRemove._id
      )
      updatedAlbums.splice(removedIdx, 1)
      this.playlist.albums = updatedAlbums
      this.playlistAlbums = updatedAlbums
   }

   removeAlbumFromPlaylist(albumToRemove: Album): void {
      this.playlistService
         .removeAlbumFromPlaylist(albumToRemove._id, this.playlist._id)
         .pipe(take(1))
         .subscribe(
            (success) => this.updateLocalPlaylistAlbums(albumToRemove),
            (err) => console.log(err)
         )
   }
}
