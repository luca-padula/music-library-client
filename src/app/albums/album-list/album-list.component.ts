import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"
import { BehaviorSubject, combineLatest, fromEvent, Observable } from "rxjs"
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
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

@Component({
   selector: "app-albums",
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

   sortOptions: SortOption[] = [
      { label: "", field: "", descending: false },
      { label: "Album name ascending", field: "name", descending: false },
      { label: "Album name descending", field: "name", descending: true },
      {
         label: "Artist name ascending",
         field: "artistName",
         descending: false,
      },
      {
         label: "Artist name descending",
         field: "artistName",
         descending: true,
      },
      {
         label: "Release date earliest to latest",
         field: "releaseDate",
         descending: false,
      },
      {
         label: "Release date latest to earliest",
         field: "releaseDate",
         descending: true,
      },
   ]

   getAllAlbums$ = this.albumService.getAllAlbums()
   searchInput$ = new Observable<string>()
   sortOption$ = new BehaviorSubject<SortOption>(this.sortOptions[0])
   albums$ = new Observable<Album[]>()

   constructor(
      private albumService: AlbumService,
      private modalService: NgbModal
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
         this.sortOption$,
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
      this.sortOption$.next(newSortOption)
   }

   open(content: any): void {
      this.modalService.open(content)
   }
}
