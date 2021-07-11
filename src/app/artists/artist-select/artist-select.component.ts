import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { Subject } from "rxjs"
import { distinctUntilChanged, switchMap } from "rxjs/operators"
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

   constructor(
      private albumService: AlbumService,
      private artistService: ArtistService
   ) {}

   ngOnInit(): void {}

   selectArtist(artist: Artist): void {
      this.artistSelectedAction.next(artist)
      this.artistSelectedEvent.emit(artist)
      this.selectedArtist = artist
   }
}
