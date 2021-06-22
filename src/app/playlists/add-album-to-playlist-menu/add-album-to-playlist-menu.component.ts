import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { Album } from "src/app/albums/album"
import { Playlist } from "../playlist"
import { AuthService } from "src/app/auth/auth.service"
import { PlaylistService } from "../playlist.service"

@Component({
   selector: "app-add-album-to-playlist-menu",
   templateUrl: "./add-album-to-playlist-menu.component.html",
   styleUrls: ["./add-album-to-playlist-menu.component.css"],
})
export class AddAlbumToPlaylistMenuComponent implements OnInit {
   @Input() notifier = new Observable<Album>()
   albumToAdd: Album = {
      _id: "",
      name: "",
      albumLength: "",
      artist: "",
      artistName: "",
      __v: 0,
      releaseDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
   }
   @ViewChild("myModal", { static: true }) addAlbumModal: any
   userToken: any
   playlists: Playlist[] = []
   selectedPlaylist: Playlist | null = null
   ngUnsubscribe = new Subject<any>()

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

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
