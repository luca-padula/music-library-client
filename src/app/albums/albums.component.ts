import { AfterViewInit, Component, OnInit } from "@angular/core"
import { BehaviorSubject, combineLatest, fromEvent, Observable } from "rxjs"
import { FromEventTarget } from "rxjs/internal/observable/fromEvent"
import {
   debounceTime,
   distinctUntilChanged,
   map,
   pluck,
   startWith,
   tap,
} from "rxjs/operators"
import { Album } from "../shared/models/album"
import { AlbumService } from "../shared/services/album.service"

interface SortPredicate {
   field: string
   descending: boolean
}

const sortPredicates = new Map<string, SortPredicate>([
   ["none", { field: "", descending: false }],
   ["albumNameAsc", { field: "name", descending: false }],
   ["albumNameDesc", { field: "name", descending: true }],
   ["artistNameAsc", { field: "artistName", descending: false }],
   ["artistNameDesc", { field: "artistName", descending: true }],
])

@Component({
   selector: "app-albums",
   templateUrl: "./albums.component.html",
   styleUrls: ["./albums.component.css"],
})
export class AlbumsComponent implements OnInit, AfterViewInit {
   allAlbums$ = this.albumService.getAllAlbums()
   searchInput$ = new Observable<string>()
   sortPredicate$ = new BehaviorSubject<SortPredicate>({
      field: "",
      descending: false,
   })
   albums$ = new Observable<Album[]>()

   constructor(private albumService: AlbumService) {}

   buildAlbumCompareFunction(
      predicate: SortPredicate
   ): (album1: Album, album2: Album) => number {
      const sortField = predicate.field as keyof Album
      return (album1: Album, album2: Album) => {
         if (album1[sortField] < album2[sortField]) {
            return -1
         }
         if (album1[sortField] > album2[sortField]) {
            return 1
         }
         return 0
      }
   }

   ngOnInit(): void {}

   ngAfterViewInit(): void {
      const searchInput = document.querySelector(
         "#searchInput"
      ) as FromEventTarget<Event>

      this.searchInput$ = fromEvent(searchInput, "keyup").pipe(
         map((event) => event.target as HTMLInputElement),
         pluck("value"),
         debounceTime(400),
         distinctUntilChanged(),
         startWith("")
      )

      this.albums$ = combineLatest([
         this.allAlbums$,
         this.searchInput$,
         this.sortPredicate$,
      ]).pipe(
         map(([albums, filter, predicate]) => {
            const compareFunction = this.buildAlbumCompareFunction(predicate)
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
}
