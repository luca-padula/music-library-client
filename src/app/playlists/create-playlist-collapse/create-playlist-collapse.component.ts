import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { NgForm } from "@angular/forms"
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap"
import { Subject } from "rxjs"
import { take } from "rxjs/operators"
import { AuthService } from "src/app/auth/auth.service"
import { ApiError, emptyApiError } from "src/app/shared/models/api-error"
import { Playlist } from "../playlist"
import { PlaylistService } from "../playlist.service"

@Component({
   selector: "app-create-playlist-collapse",
   templateUrl: "./create-playlist-collapse.component.html",
   styleUrls: ["./create-playlist-collapse.component.css"],
})
export class CreatePlaylistCollapseComponent implements OnInit {
   private token = this.authService.getDecodedToken()
   newPlaylist: Partial<Playlist> = {
      name: "",
      isPrivate: false,
      creator: this.token._id,
      creatorUserName: this.token.userName,
   }
   @Output() playlistCreated = new EventEmitter<Playlist>()
   isCollapsed: boolean = true

   successNotifier = new Subject<string>()
   errorNotifier = new Subject<ApiError>()
   success$ = this.successNotifier.asObservable()
   error$ = this.errorNotifier.asObservable()

   constructor(
      private authService: AuthService,
      private playlistService: PlaylistService
   ) {}

   ngOnInit(): void {}

   onSubmit(form: NgForm) {
      this.playlistService
         .createPlaylist(this.newPlaylist)
         .pipe(take(1))
         .subscribe(
            (success) => {
               this.successNotifier.next(
                  `Playlist ${this.newPlaylist.name} successfully created`
               )
               this.playlistCreated.emit(success.createdPlaylist)
               form.resetForm()
               this.newPlaylist.name = ""
               this.newPlaylist.isPrivate = false
            },
            (err: ApiError) => this.errorNotifier.next(err)
         )
   }
}
