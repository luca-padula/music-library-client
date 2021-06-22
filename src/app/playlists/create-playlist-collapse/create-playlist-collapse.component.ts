import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { NgForm } from "@angular/forms"
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap"
import { take } from "rxjs/operators"
import { AuthService } from "src/app/auth/auth.service"
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

   constructor(
      private authService: AuthService,
      private playlistService: PlaylistService
   ) {}

   ngOnInit(): void {}

   onSubmit(form: NgForm) {
      this.playlistService
         .createPlaylist(this.newPlaylist)
         .pipe(take(1))
         .subscribe((success) =>
            this.playlistCreated.emit(success.createdPlaylist)
         )
   }
}
