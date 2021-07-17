import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { emptyPlaylist, Playlist } from "../playlist"

@Component({
   selector: "app-playlist-detail",
   templateUrl: "./playlist-detail.component.html",
   styleUrls: ["./playlist-detail.component.css"],
})
export class PlaylistDetailComponent implements OnInit {
   playlist = emptyPlaylist

   constructor(private route: ActivatedRoute) {}

   ngOnInit(): void {
      this.playlist = this.route.snapshot.data.playlist as Playlist
   }
}
