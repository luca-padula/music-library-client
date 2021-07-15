import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Artist } from "src/app/artists/artist"
import { Album } from "../album"

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

   constructor() {}

   ngOnInit(): void {
      this.maxAcceptableDate.setFullYear(
         this.maxAcceptableDate.getFullYear() + 5
      )
   }

   handleArtistSelected(artist: Artist): void {
      this.album.artist = artist._id
      this.album.artistName = artist.name
   }

   onSubmit(form: NgForm): void {
      console.log(this.album)
      console.log(this.maxAcceptableDate)
      console.log(this.album.releaseDate! > this.maxAcceptableDate)
   }
}
