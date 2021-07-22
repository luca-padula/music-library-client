import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Subject } from "rxjs"
import { take } from "rxjs/operators"
import { ApiError } from "src/app/shared/models/api-error"
import { emptyPlaylist, Playlist } from "../playlist"
import { PlaylistService } from "../playlist.service"

@Component({
   selector: "app-edit-playlist",
   templateUrl: "./edit-playlist.component.html",
   styleUrls: ["./edit-playlist.component.css"],
})
export class EditPlaylistComponent implements OnInit {
   playlist = emptyPlaylist
   updateSuccessNotifier = new Subject<string>()
   updateErrorNotifier = new Subject<ApiError>()

   constructor(
      private route: ActivatedRoute,
      private playlistService: PlaylistService
   ) {}

   ngOnInit(): void {
      this.playlist = this.route.snapshot.data.playlist as Playlist
   }

   onSubmit(form: NgForm): void {
      const { name, isPrivate } = this.playlist
      const fieldsToUpdate: Partial<Playlist> = { name, isPrivate }
      this.playlistService
         .updatePlaylist(this.playlist._id, fieldsToUpdate)
         .pipe(take(1))
         .subscribe(
            (success) =>
               this.updateSuccessNotifier.next(`Successfully updated playlist`),
            (err: ApiError) => this.updateErrorNotifier.next(err)
         )
   }
}
