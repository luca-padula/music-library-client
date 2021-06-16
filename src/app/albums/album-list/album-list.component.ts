import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"
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
import { AlbumService } from "../album.service"
import { AuthService } from "src/app/auth/auth.service"
import { albumSortOptions } from "../album-sort-options"

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

   getAllAlbums$ = this.albumService.getAllAlbums()
   searchInput$ = new Observable<string>()
   sortOptionSubject = new BehaviorSubject<SortOption>(this.sortOptions[0])
   albums$ = new Observable<Album[]>()

   userIsAuthenticated: boolean = this.authService.userIsAuthenticated()

   constructor(
      private albumService: AlbumService,
      private authService: AuthService
   ) {}

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
         this.getAllAlbums$,
         this.searchInput$,
         this.sortOptionSubject,
      ]).pipe(
         map(([allAlbums, filter, sortOption]) => {
            const filterFunction = this.buildAlbumFilterFunction(filter)
            const compareFunction = this.buildAlbumCompareFunction(sortOption)
            return allAlbums.filter(filterFunction).sort(compareFunction)
         })
      )
   }

   private buildAlbumFilterFunction(filter: string): (album: Album) => boolean {
      return (album: Album) =>
         album.name.toLowerCase().includes(filter.toLowerCase()) ||
         album.artistName.toLowerCase().includes(filter.toLowerCase())
   }

   private buildAlbumCompareFunction(
      sortOption: SortOption
   ): (album1: Album, album2: Album) => number {
      const sortField = sortOption.field as keyof Album
      const descending = sortOption.descending
      return (album1: Album, album2: Album) => {
         if (album1[sortField] < album2[sortField]) {
            return descending ? 1 : -1
         }
         if (album1[sortField] > album2[sortField]) {
            return descending ? -1 : 1
         }
         return 0
      }
   }

   handleSortChange(newSortOption: SortOption): void {
      this.sortOptionSubject.next(newSortOption)
   }

   handleAddAlbumToPlaylistEvent(albumToAdd: Album): void {
      this.addAlbumToPlaylistSubject.next(albumToAdd)
   }
}
