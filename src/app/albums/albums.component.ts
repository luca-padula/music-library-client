import { Component, OnInit } from "@angular/core"
import { BehaviorSubject, combineLatest, Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Album } from "../shared/models/album"
import { AlbumService } from "../shared/services/album.service"

interface SortPredicate {
   field: string
   descending: boolean
}

const sortPredicates = new Map<string, SortPredicate>([
   ["none", { field: "", descending: false }],
   ["albumNameAsc", { field: "name", descending: false }],
   ["albumNameDesc", { field: "name", descending: true }],
   ["artistNameAsc", { field: "artistName", descending: false }],
   ["artistNameDesc", { field: "artistName", descending: true }],
])

@Component({
   selector: "app-albums",
   templateUrl: "./albums.component.html",
   styleUrls: ["./albums.component.css"],
})
export class AlbumsComponent implements OnInit {
   albums$: Observable<Album[]>
   sortPredicate$ = new BehaviorSubject<SortPredicate>({
      field: "",
      descending: false,
   })

   constructor(private albumService: AlbumService) {
      this.albums$ = combineLatest([
         this.albumService.getAllAlbums(),
         this.sortPredicate$,
      ]).pipe(
         map(([albums, predicate]) => {
            const sortField = predicate.field as keyof Album
            return albums.sort((album, nextAlbum) => {
               if (album[sortField] < nextAlbum[sortField]) {
                  return -1
               }
               if (album[sortField] > nextAlbum[sortField]) {
                  return 1
               }
               return 0
            })
            /* return albums.sort((album, nextAlbum) =>
               album["artistName"].localeCompare(nextAlbum["artistName"])
            ) */
         })
      )
   }

   /* generateCompareFunction(predicate: SortPredicate): () => number {
    const sortField = predicate.field as keyof Album
    return (album1: Album, album2: Album) => {

    }
   } */

   ngOnInit(): void {}
}
