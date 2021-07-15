import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { take } from "rxjs/operators"
import { Artist } from "src/app/artists/artist"
import { emptyApiError } from "src/app/shared/models/api-error"
import { Album } from "../album"
import { AlbumService } from "../album.service"

@Component({
   selector: "app-create-album",
   templateUrl: "./create-album.component.html",
   styleUrls: ["./create-album.component.css"],
})
export class CreateAlbumComponent implements OnInit {
   maxAcceptableDate = new Date()
   album: Partial<Album> = {
      name: "",
      releaseDate: undefined,
      albumLength: "",
      artist: "",
      artistName: "",
   }

   error = emptyApiError
   successAlbum: Album | undefined = undefined

   constructor(private albumService: AlbumService) {}

   ngOnInit(): void {
      this.maxAcceptableDate.setFullYear(
         this.maxAcceptableDate.getFullYear() + 5
      )
   }

   handleArtistSelected(artist: Artist): void {
      this.album.artist = artist._id
      this.album.artistName = artist.name
   }

   validReleaseDate(): boolean {
      if (this.album.releaseDate) {
         const releaseDate = new Date(this.album.releaseDate)
         return releaseDate <= this.maxAcceptableDate
      }
      return false
   }

   onSubmit(form: NgForm): void {
      this.error = emptyApiError
      this.albumService
         .createAlbum(this.album)
         .pipe(take(1))
         .subscribe(
            (success) => (this.successAlbum = success.createdAlbum),
            (err) => (this.error = err)
         )
   }
}
