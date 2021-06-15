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
   takeUntil,
} from "rxjs/operators"
import { Album } from "../album"
import { SortOption } from "../../sort-option-select/sort-option"
import { AlbumService } from "../album.service"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { AuthService } from "src/app/auth/auth.service"
import { PlaylistService } from "src/app/playlists/playlist.service"
import { Playlist } from "src/app/playlists/playlist"
import { albumSortOptions } from "../album-sort-options"

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

   sortOptions = albumSortOptions
   getAllAlbums$ = this.albumService.getAllAlbums()
   searchInput$ = new Observable<string>()
   sortOption$ = new BehaviorSubject<SortOption>(this.sortOptions[0])
   albums$ = new Observable<Album[]>()
   ngUnsubscribe = new Subject<any>()

   userIsAuthenticated: boolean = this.authService.userIsAuthenticated()
   userToken: any
   playlists: Playlist[] = []

   constructor(
      private albumService: AlbumService,
      private modalService: NgbModal,
      private authService: AuthService,
      private playlistService: PlaylistService
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

      if (this.userIsAuthenticated) {
         this.userToken = this.authService.getDecodedToken()
         this.playlistService
            .getPlaylistsForUser(this.userToken._id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((playlists) => {
               this.playlists = playlists
               console.log(this.playlists)
            })
      }
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

   handleAddAlbumToPlaylistEvent(albumToAdd: Album): void {
      console.log(albumToAdd)
   }

   open(content: any): void {
      this.modalService.open(content)
   }

   ngOnDestroy() {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
