import { Component, Input, OnInit } from "@angular/core"
import { Album } from "../album"

@Component({
   selector: "app-album-display",
   templateUrl: "./album-display.component.html",
   styleUrls: ["./album-display.component.css"],
})
export class AlbumDisplayComponent implements OnInit {
   @Input() album!: Album

   constructor() {}

   ngOnInit(): void {}
}
