import { Component, Input, OnInit } from "@angular/core"
import { emptyPlaylist, Playlist } from "../playlist"

@Component({
   selector: "app-playlist-display",
   templateUrl: "./playlist-display.component.html",
   styleUrls: ["./playlist-display.component.css"],
})
export class PlaylistDisplayComponent implements OnInit {
   @Input() playlist = emptyPlaylist

   constructor() {}

   ngOnInit(): void {}
}
