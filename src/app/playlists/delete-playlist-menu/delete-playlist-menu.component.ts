import {
   Component,
   EventEmitter,
   Input,
   OnInit,
   Output,
   ViewChild,
} from "@angular/core"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { Observable, Subject } from "rxjs"
import { take, takeUntil } from "rxjs/operators"
import { ApiError, emptyApiError } from "src/app/shared/models/api-error"
import { emptyPlaylist, Playlist } from "../playlist"
import { PlaylistService } from "../playlist.service"

@Component({
   selector: "app-delete-playlist-menu",
   templateUrl: "./delete-playlist-menu.component.html",
   styleUrls: ["./delete-playlist-menu.component.css"],
})
export class DeletePlaylistMenuComponent implements OnInit {
   @Input() openModalNotifier = new Observable<Playlist>()
   @Output() playlistDeletedEvent = new EventEmitter<string>()
   @ViewChild("myModal", { static: true }) deletePlaylistModal: any
   playlistWasDeletedMsg = ""
   error = emptyApiError
   playlistToDelete = emptyPlaylist
   ngUnsubscribe = new Subject<any>()

   constructor(
      private playlistService: PlaylistService,
      private modalService: NgbModal
   ) {}

   ngOnInit(): void {
      this.openModalNotifier
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((playlist) => {
            this.playlistToDelete = playlist
            this.openModal()
         })
   }

   openModal(): void {
      this.modalService
         .open(this.deletePlaylistModal)
         .result.then((result) => {
            if (this.playlistWasDeletedMsg) {
               this.playlistDeletedEvent.emit(this.playlistWasDeletedMsg)
            }
         })
         .catch(() => {
            if (this.playlistWasDeletedMsg) {
               this.playlistDeletedEvent.emit(this.playlistWasDeletedMsg)
            }
         })
   }

   deletePlaylist(): void {
      this.error = emptyApiError
      this.playlistService
         .deletePlaylist(this.playlistToDelete._id)
         .pipe(take(1))
         .subscribe(
            (success) => {
               this.playlistWasDeletedMsg =
                  "Your playlist has been successfully deleted"
            },
            (err: ApiError) => (this.error = err)
         )
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
