import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"
import { combineLatest, fromEvent, Observable, Subject } from "rxjs"
import {
   debounceTime,
   distinctUntilChanged,
   map,
   pluck,
   startWith,
   takeUntil,
} from "rxjs/operators"
import { AuthService } from "src/app/auth/auth.service"
import { Playlist } from "../playlist"
import { PlaylistService } from "../playlist.service"

@Component({
   selector: "app-playlists-page",
   templateUrl: "./playlists-page.component.html",
   styleUrls: ["./playlists-page.component.css"],
})
export class PlaylistsPageComponent implements OnInit {
   ngUnsubscribe = new Subject<any>()
   userIsAuthenticated = this.authService.userIsAuthenticated()
   private token = this.authService.getDecodedToken()
   userPlaylists: Playlist[] = []

   @ViewChild("searchInput", { static: true })
   searchInputEl!: ElementRef<HTMLInputElement>
   searchInput$ = new Observable<string>()

   allPublicPlaylists$ = this.playlistService.getAllPlaylists().pipe(
      map((allPlaylists) => {
         if (this.userIsAuthenticated) {
            return allPlaylists.filter(
               (playlist) =>
                  !playlist.isPrivate || playlist.creator === this.token._id
            )
         } else {
            return allPlaylists.filter((playlist) => !playlist.isPrivate)
         }
      })
   )
   allPlaylistsFiltered$ = new Observable<Playlist[]>()

   constructor(
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

      this.allPlaylistsFiltered$ = combineLatest([
         this.searchInput$,
         this.allPublicPlaylists$,
      ]).pipe(
         map(([filter, playlists]) =>
            playlists.filter(
               (playlist) =>
                  playlist.name.toLowerCase().includes(filter.toLowerCase()) ||
                  playlist.creatorUserName
                     .toLowerCase()
                     .includes(filter.toLowerCase())
            )
         )
      )

      if (this.userIsAuthenticated) {
         this.playlistService
            .getPlaylistsForUser(this.token._id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((playlists) => (this.userPlaylists = playlists))
      }
   }

   handlePlaylistCreated(createdPlaylist: Playlist): void {
      this.userPlaylists = [...this.userPlaylists, createdPlaylist]
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
