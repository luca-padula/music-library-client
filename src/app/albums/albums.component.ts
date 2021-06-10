import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"
import { BehaviorSubject, combineLatest, fromEvent, Observable } from "rxjs"
import {
   debounceTime,
   distinctUntilChanged,
   map,
   pluck,
   startWith,
} from "rxjs/operators"
import { Album } from "../shared/models/album"
import { SortOption } from "../shared/models/sort-option"
import { AlbumService } from "../shared/services/album.service"

@Component({
   selector: "app-albums",
   templateUrl: "./albums.component.html",
   styleUrls: ["./albums.component.css"],
})
export class AlbumsComponent implements OnInit {
   /*
   Had to bypass undefined safety checker for searchInputEl as i
   cannot manually assign it and it is only automatically assigned
   after view is initialized
   */
   @ViewChild("searchInput", { static: true })
   searchInputEl!: ElementRef<HTMLInputElement>

   sortPredicates = new Map<string, SortOption>([
      ["none", { field: "", descending: false }],
      ["albumNameAsc", { field: "name", descending: false }],
      ["albumNameDesc", { field: "name", descending: true }],
      ["artistNameAsc", { field: "artistName", descending: false }],
      ["artistNameDesc", { field: "artistName", descending: true }],
   ])

   getAllAlbums$ = this.albumService.getAllAlbums()
   searchInput$ = new Observable<string>()
   sortPredicate$ = new BehaviorSubject<SortOption>({
      field: "",
      descending: false,
   })
   albums$ = new Observable<Album[]>()

   constructor(private albumService: AlbumService) {}

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
         this.sortPredicate$,
      ]).pipe(
         map(([allAlbums, filter, predicate]) => {
            const compareFunction = this.buildAlbumCompareFunction(predicate)
            return allAlbums
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

   buildAlbumCompareFunction(
      predicate: SortOption
   ): (album1: Album, album2: Album) => number {
      const sortField = predicate.field as keyof Album
      const descending = predicate.descending
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

   handleSortOptionChange(event: Event): void {
      const target = event.target as HTMLInputElement
      const newSortOption = this.sortPredicates.get(target.value)
      if (newSortOption) {
         this.sortPredicate$.next(newSortOption)
      }
   }
}
