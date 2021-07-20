import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { emptyPlaylist, Playlist } from "../playlist"

@Component({
   selector: "app-edit-playlist",
   templateUrl: "./edit-playlist.component.html",
   styleUrls: ["./edit-playlist.component.css"],
})
export class EditPlaylistComponent implements OnInit {
   playlist = emptyPlaylist

   constructor(private route: ActivatedRoute) {}

   ngOnInit(): void {
      this.playlist = this.route.snapshot.data.playlist as Playlist
   }
}
