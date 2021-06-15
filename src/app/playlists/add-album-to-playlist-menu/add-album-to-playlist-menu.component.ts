import { Component, Input, OnInit } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"
import { Album } from "src/app/albums/album"

@Component({
   selector: "app-add-album-to-playlist-menu",
   templateUrl: "./add-album-to-playlist-menu.component.html",
   styleUrls: ["./add-album-to-playlist-menu.component.css"],
})
export class AddAlbumToPlaylistMenuComponent implements OnInit {
   @Input() notifier = new Observable<Album>()
   ngUnsubscribe = new Subject<any>()

   constructor() {}

   ngOnInit(): void {
      this.notifier
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((album) => console.log(album))
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
