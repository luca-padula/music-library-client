import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { Album } from "src/app/albums/album"

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
   ngUnsubscribe = new Subject<any>()

   constructor(private modalService: NgbModal) {}

   ngOnInit(): void {
      this.notifier.pipe(takeUntil(this.ngUnsubscribe)).subscribe((album) => {
         this.albumToAdd = album
         this.open(this.addAlbumModal)
      })
   }

   open(content: any): void {
      this.modalService.open(content)
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
