import { Album } from "src/app/albums/album"
import { SortOption } from "src/app/sort-option-select/sort-option"

function buildAlbumCompareFunction(
   sortOption: SortOption
): (album1: Album, album2: Album) => number {
   const sortField = sortOption.field as keyof Album
   const descending = sortOption.descending
   return (album1: Album, album2: Album) => {
      /* convert to lowercase for case insensitive sorting in case not all users enter first letter capital
      for album/artist name, or else not having first letter case consistent breaks sorting */
      let field1 = album1[sortField],
         field2 = album2[sortField]
      if (typeof field1 === "string" && typeof field2 === "string") {
         field1 = field1.toLowerCase()
         field2 = field2.toLowerCase()
      }

      if (field1 < field2) {
         return descending ? 1 : -1
      }
      if (field1 > field2) {
         return descending ? -1 : 1
      }
      return 0
   }
}

function buildAlbumFilterFunction(filter: string): (album: Album) => boolean {
   return (album: Album) =>
      album.name.toLowerCase().includes(filter.toLowerCase()) ||
      album.artistName.toLowerCase().includes(filter.toLowerCase())
}

export { buildAlbumCompareFunction, buildAlbumFilterFunction }
