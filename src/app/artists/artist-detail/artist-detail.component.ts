import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import { Album } from "src/app/albums/album"
import { AlbumService } from "src/app/albums/album.service"
import { AuthService } from "src/app/auth/auth.service"
import { Artist } from "../artist"

@Component({
   selector: "app-artist-detail",
   templateUrl: "./artist-detail.component.html",
   styleUrls: ["./artist-detail.component.css"],
})
export class ArtistDetailComponent implements OnInit {
   artist!: Artist
   albumsFromArtist$ = new Observable<Album[]>()
   userIsAuthenticated = this.authService.userIsAuthenticated()

   constructor(
      private route: ActivatedRoute,
      private albumService: AlbumService,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      this.artist = this.route.snapshot.data.artist as Artist
      this.albumsFromArtist$ = this.albumService.getAlbumsFromArtist(
         this.artist._id
      )
   }
}
