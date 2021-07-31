import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core"
import {
   BehaviorSubject,
   combineLatest,
   fromEvent,
   Observable,
   Subject,
} from "rxjs"
import {
   debounceTime,
   distinctUntilChanged,
   map,
   pluck,
   startWith,
} from "rxjs/operators"
import { Album } from "../album"
import { SortOption } from "../../sort-option-select/sort-option"
import { AuthService } from "src/app/auth/auth.service"
import { albumSortOptions } from "../album-sort-options"
import {
   buildAlbumCompareFunction,
   buildAlbumFilterFunction,
} from "src/app/shared/utils/album-function-factory"

@Component({
   selector: "app-album-list",
   templateUrl: "./album-list.component.html",
   styleUrls: ["./album-list.component.css"],
})
export class AlbumListComponent implements OnInit {
   /*
   Had to bypass undefined safety checker for searchInputEl as i
   cannot manually assign it and it is only automatically assigned
   after view is initialized
   */
   @ViewChild("searchInput", { static: true })
   searchInputEl!: ElementRef<HTMLInputElement>

   private addAlbumToPlaylistSubject = new Subject<Album>()
   playlistMenuNotifier$ = this.addAlbumToPlaylistSubject.asObservable()
   sortOptions = albumSortOptions

   @Input() albumsToFetch$ = new Observable<Album[]>()
   searchInput$ = new Observable<string>()
   sortOptionSubject = new BehaviorSubject<SortOption>(this.sortOptions[0])
   albums$ = new Observable<Album[]>()

   userIsAuthenticated: boolean = this.authService.userIsAuthenticated()

   constructor(private authService: AuthService) {}

   ngOnInit(): void {
      this.searchInput$ = fromEvent(
         this.searchInputEl.nativeElement,
         "keyup"
      ).pipe(
         map((event) => event.target as HTMLInputElement),
         pluck("value"),
         debounceTime(400),
         distinctUntilChanged(),
         startWith("")
      )

      this.albums$ = combineLatest([
         this.albumsToFetch$,
         this.searchInput$,
         this.sortOptionSubject,
      ]).pipe(
         map(([allAlbums, filter, sortOption]) => {
            const filterFunction = buildAlbumFilterFunction(filter)
            const compareFunction = buildAlbumCompareFunction(sortOption)
            return allAlbums.filter(filterFunction).sort(compareFunction)
         })
      )
   }

   handleSortChange(newSortOption: SortOption): void {
      this.sortOptionSubject.next(newSortOption)
   }

   handleAddAlbumToPlaylistEvent(albumToAdd: Album): void {
      this.addAlbumToPlaylistSubject.next(albumToAdd)
   }
}
