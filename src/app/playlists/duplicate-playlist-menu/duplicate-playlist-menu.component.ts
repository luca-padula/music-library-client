import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { Observable, Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"
import { AuthService } from "src/app/auth/auth.service"
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
            this.openModal()
         })
   }

   openModal(): void {
      this.modalService.open(this.duplicatePlaylistModal)
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
