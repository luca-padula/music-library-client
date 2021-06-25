import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { take, takeUntil } from "rxjs/operators"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { Album, emptyAlbum } from "src/app/albums/album"
import { Playlist } from "../playlist"
import { AuthService } from "src/app/auth/auth.service"
import { PlaylistService } from "../playlist.service"
import { ApiError, emptyApiError } from "src/app/shared/models/api-error"

@Component({
   selector: "app-add-album-to-playlist-menu",
   templateUrl: "./add-album-to-playlist-menu.component.html",
   styleUrls: ["./add-album-to-playlist-menu.component.css"],
})
export class AddAlbumToPlaylistMenuComponent implements OnInit {
   @Input() notifier = new Observable<Album>()
   albumToAdd: Album = emptyAlbum
   @ViewChild("myModal", { static: true }) addAlbumModal: any
   userToken: any
   playlists: Playlist[] = []
   selectedPlaylist: Playlist | null = null
   ngUnsubscribe = new Subject<any>()
   successMessage: string = ""
   error: ApiError = emptyApiError

   constructor(
      private authService: AuthService,
      private playlistService: PlaylistService,
      private modalService: NgbModal
   ) {}

   ngOnInit(): void {
      this.notifier.pipe(takeUntil(this.ngUnsubscribe)).subscribe((album) => {
         this.albumToAdd = album
         this.openModal()
      })

      this.userToken = this.authService.getDecodedToken()
      this.playlistService
         .getPlaylistsForUser(this.userToken._id)
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((playlists) => {
            this.playlists = playlists
         })
   }

   openModal(): void {
      this.modalService
         .open(this.addAlbumModal)
         .result.then((result) => (this.selectedPlaylist = null))
   }

   selectPlaylist(playlist: Playlist): void {
      this.selectedPlaylist = playlist
   }

   handlePlaylistCreated(createdPlaylist: Playlist): void {
      this.playlists = [...this.playlists, createdPlaylist]
      this.selectPlaylist(createdPlaylist)
   }

   addAlbumToPlaylist(): void {
      if (this.selectedPlaylist) {
         this.playlistService
            .addAlbumToPlaylist(this.albumToAdd._id, this.selectedPlaylist._id)
            .pipe(take(1))
            .subscribe(
               (success) => {
                  this.successMessage = `${this.albumToAdd.name} successfully added to ${this.selectedPlaylist?.name}`
                  this.updateLocalPlaylist(success.updatedPlaylist)
                  this.selectedPlaylist = null
               },
               (err: ApiError) => (this.error = err)
            )
      }
   }

   updateLocalPlaylist(updatedPlaylist: Playlist): void {
      const playlistIndex = this.playlists.findIndex(
         (playlist) => playlist._id === updatedPlaylist._id
      )
      this.playlists.splice(playlistIndex, 1, updatedPlaylist)
   }

   selectedPlaylistIncludesAlbum(): boolean {
      if (!this.selectedPlaylist) {
         return false
      }
      const albums = this.selectedPlaylist.albums as string[]
      return albums.includes(this.albumToAdd._id)
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
