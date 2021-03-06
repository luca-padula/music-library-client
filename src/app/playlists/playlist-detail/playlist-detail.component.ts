import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { BehaviorSubject, of, Subject } from "rxjs"
import { take } from "rxjs/operators"
import { Album } from "src/app/albums/album"
import { AuthService } from "src/app/auth/auth.service"
import { ApiError } from "src/app/shared/models/api-error"
import { emptyPlaylist, Playlist } from "../playlist"
import { PlaylistService } from "../playlist.service"

@Component({
   selector: "app-playlist-detail",
   templateUrl: "./playlist-detail.component.html",
   styleUrls: ["./playlist-detail.component.css"],
})
export class PlaylistDetailComponent implements OnInit {
   playlist = emptyPlaylist
   private token = this.authService.getDecodedToken()
   userIsAuthenticated = this.authService.userIsAuthenticated()
   userOwnsPlaylist = false

   addAlbumToPlaylistAction = new Subject<Album>()
   duplicatePlaylistAction = new Subject<Playlist>()
   playlistAlbumsSubject = new BehaviorSubject<Album[]>([])

   successNotifier = new Subject<string>()
   errorNotifier = new Subject<ApiError>()

   constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private playlistService: PlaylistService
   ) {}

   ngOnInit(): void {
      this.playlist = this.route.snapshot.data.playlist as Playlist
      const playlistAlbums = this.playlist.albums as Album[]
      this.playlistAlbumsSubject.next(playlistAlbums)

      if (this.userIsAuthenticated) {
         this.userOwnsPlaylist = this.playlist.creator === this.token._id
      }
   }

   handleRemoveAlbumFromPlaylist(album: Album): void {
      this.removeAlbumFromPlaylist(album)
   }

   handleAddAlbumToPlaylist(album: Album): void {
      this.addAlbumToPlaylistAction.next(album)
   }

   private deleteAlbumFromPlaylistArr(
      albumToRemove: Album,
      albumArr: Album[]
   ): Album[] {
      const updatedAlbums = albumArr
      const removedIdx = updatedAlbums.findIndex(
         (album) => album._id === albumToRemove._id
      )
      updatedAlbums.splice(removedIdx, 1)
      return updatedAlbums
   }

   private updateLocalPlaylistAlbums(albumToRemove: Album): void {
      const updatedAlbums = this.deleteAlbumFromPlaylistArr(
         albumToRemove,
         this.playlist.albums as Album[]
      )
      this.playlist.albums = updatedAlbums
      this.playlistAlbumsSubject.next(updatedAlbums)
   }

   removeAlbumFromPlaylist(albumToRemove: Album): void {
      this.playlistService
         .removeAlbumFromPlaylist(albumToRemove._id, this.playlist._id)
         .pipe(take(1))
         .subscribe(
            (success) => {
               this.updateLocalPlaylistAlbums(albumToRemove)
               this.successNotifier.next(
                  `Successfully removed '${albumToRemove.name}' from playlist`
               )
            },
            (err: ApiError) => this.errorNotifier.next(err)
         )
   }

   openDuplicatePlaylist(): void {
      this.duplicatePlaylistAction.next(this.playlist)
   }
}
