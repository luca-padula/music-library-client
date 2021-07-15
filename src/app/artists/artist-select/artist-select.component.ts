import {
   Component,
   ElementRef,
   EventEmitter,
   OnInit,
   Output,
   ViewChild,
} from "@angular/core"
import { combineLatest, fromEvent, Observable, Subject } from "rxjs"
import {
   debounceTime,
   distinctUntilChanged,
   map,
   pluck,
   startWith,
   switchMap,
} from "rxjs/operators"
import { AlbumService } from "src/app/albums/album.service"
import { Artist } from "../artist"
import { ArtistService } from "../artist.service"

@Component({
   selector: "app-artist-select",
   templateUrl: "./artist-select.component.html",
   styleUrls: ["./artist-select.component.css"],
})
export class ArtistSelectComponent implements OnInit {
   @Output() artistSelectedEvent = new EventEmitter<Artist>()
   allArtists$ = this.artistService.getAllArtists()
   artistSelectedAction = new Subject<Artist>()
   artistSelectedAction$ = this.artistSelectedAction
      .asObservable()
      .pipe(distinctUntilChanged())
   artistAlbums$ = this.artistSelectedAction$.pipe(
      switchMap((artist) => this.albumService.getAlbumsFromArtist(artist._id))
   )
   selectedArtist: Artist | undefined

   @ViewChild("searchInput", { static: true })
   searchInputEl!: ElementRef<HTMLInputElement>
   searchInput$ = new Observable<string>()
   filteredArtists$ = new Observable<Artist[]>()

   constructor(
      private albumService: AlbumService,
      private artistService: ArtistService
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

      this.filteredArtists$ = combineLatest([
         this.allArtists$,
         this.searchInput$,
      ]).pipe(
         map(([artists, filter]) =>
            artists.filter((artist) =>
               artist.name.toLowerCase().includes(filter.toLowerCase())
            )
         )
      )
   }

   selectArtist(artist: Artist): void {
      this.selectedArtist = artist
      this.artistSelectedAction.next(artist)
      this.artistSelectedEvent.emit(artist)
   }
}
