import {
   Component,
   ElementRef,
   EventEmitter,
   Input,
   OnInit,
   Output,
   ViewChild,
} from "@angular/core"
import { BehaviorSubject, combineLatest, fromEvent, Observable } from "rxjs"
import { distinctUntilChanged, map, pluck, startWith } from "rxjs/operators"
import { Album } from "src/app/albums/album"
import { albumSortOptions } from "src/app/albums/album-sort-options"
import { buildAlbumCompareFunction } from "src/app/shared/utils/album-function-factory"
import { SortOption } from "src/app/sort-option-select/sort-option"

@Component({
   selector: "app-playlist-album-list",
   templateUrl: "./playlist-album-list.component.html",
   styleUrls: ["./playlist-album-list.component.css"],
})
export class PlaylistAlbumListComponent implements OnInit {
   @Input() albums$ = new BehaviorSubject<Album[]>([])
   @ViewChild("searchInput", { static: true })
   searchInputEl!: ElementRef<HTMLInputElement>
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
      this.searchInput$ = fromEvent(
         this.searchInputEl.nativeElement,
         "keyup"
      ).pipe(
         map((event) => event.target as HTMLInputElement),
         pluck("value"),
         distinctUntilChanged(),
         startWith("")
      )

      this.displayedAlbums$ = combineLatest([
         this.albums$,
         this.searchInput$,
         this.sortOptionSubject,
      ]).pipe(
         map(([albums, filter, sortOption]) => {
            const compareFunction = buildAlbumCompareFunction(sortOption)
            return albums
               .filter(
                  (album) =>
                     album.name.toLowerCase().includes(filter.toLowerCase()) ||
                     album.artistName
                        .toLowerCase()
                        .includes(filter.toLowerCase())
               )
               .sort(compareFunction)
         })
      )
   }

   handleSortChange(newSortOption: SortOption): void {
      this.sortOptionSubject.next(newSortOption)
   }
}
