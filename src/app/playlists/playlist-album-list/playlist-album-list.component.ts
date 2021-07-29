import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { BehaviorSubject, combineLatest, Observable } from "rxjs"
import { Album } from "src/app/albums/album"
import { albumSortOptions } from "src/app/albums/album-sort-options"
import { SortOption } from "src/app/sort-option-select/sort-option"

@Component({
   selector: "app-playlist-album-list",
   templateUrl: "./playlist-album-list.component.html",
   styleUrls: ["./playlist-album-list.component.css"],
})
export class PlaylistAlbumListComponent implements OnInit {
   @Input() albums$ = new BehaviorSubject<Album[]>([])
   searchInput$ = new Observable<string>()
   sortOptions = albumSortOptions
   sortOptionSubject = new BehaviorSubject<SortOption>(this.sortOptions[0])
   displayedAlbums$ = new Observable<Album[]>()
   @Output() addAlbumToPlaylist = new EventEmitter<Album>()
   @Output() removeAlbumFromPlaylist = new EventEmitter<Album>()

   @Input() userIsAuthenticated = false
   @Input() userOwnsPlaylist = false
   constructor() {}

   ngOnInit(): void {
      //  this.displayedAlbums$ = combineLatest([this.albums$, this.searchInput$, this.sortOptionSubject])
   }
}
