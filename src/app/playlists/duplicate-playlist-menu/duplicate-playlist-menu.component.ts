import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { Observable, Subject } from "rxjs"
import { take, takeUntil } from "rxjs/operators"
import { Album } from "src/app/albums/album"
import { AuthService } from "src/app/auth/auth.service"
import { ApiError, emptyApiError } from "src/app/shared/models/api-error"
import { emptyPlaylist, Playlist } from "../playlist"
import { PlaylistService } from "../playlist.service"

@Component({
   selector: "app-duplicate-playlist-menu",
   templateUrl: "./duplicate-playlist-menu.component.html",
   styleUrls: ["./duplicate-playlist-menu.component.css"],
})
export class DuplicatePlaylistMenuComponent implements OnInit {
   playlistToDuplicate = emptyPlaylist
   newPlaylist = emptyPlaylist
   @ViewChild("myModal", { static: true }) duplicatePlaylistModal: any
   @Input() openModalNotifier = new Observable<Playlist>()
   private token = this.authService.getDecodedToken()
   successNotifier = new Subject<string>()
   errorNotifier = new Subject<ApiError>()
   ngUnsubscribe = new Subject<any>()

   constructor(
      private modalService: NgbModal,
      private authService: AuthService,
      private playlistService: PlaylistService
   ) {}

   ngOnInit(): void {
      this.openModalNotifier
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((playlist) => {
            this.playlistToDuplicate = playlist
            this.newPlaylist = emptyPlaylist
            this.newPlaylist.creator = this.token._id
            this.newPlaylist.creatorUserName = this.token.userName
            this.newPlaylist.albums = this.playlistToDuplicate.albums
            this.openModal()
         })
   }

   openModal(): void {
      this.modalService.open(this.duplicatePlaylistModal)
   }

   private changePlaylistToApiFormat(): Partial<Playlist> {
      const { _id, __v, createdAt, updatedAt, ...fieldsToPost } =
         this.newPlaylist
      const albums = fieldsToPost.albums as Album[]
      const albumsAsStringArr = albums.map((album) => album._id)
      fieldsToPost.albums = albumsAsStringArr
      return fieldsToPost
   }

   duplicatePlaylist(): void {
      this.successNotifier.next("")
      this.errorNotifier.next(emptyApiError)

      const playlistToPost = this.changePlaylistToApiFormat()
      this.playlistService
         .createPlaylist(playlistToPost)
         .pipe(take(1))
         .subscribe(
            (success) => {
               this.successNotifier.next("Successfully duplicated playlist")
            },
            (err: ApiError) => {
               this.errorNotifier.next(err)
            }
         )
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
