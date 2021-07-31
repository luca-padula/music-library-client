import { Album } from "src/app/albums/album"
import { SortOption } from "src/app/sort-option-select/sort-option"

function buildAlbumCompareFunction(
   sortOption: SortOption
): (album1: Album, album2: Album) => number {
   const sortField = sortOption.field as keyof Album
   const descending = sortOption.descending
   return (album1: Album, album2: Album) => {
      if (album1[sortField] < album2[sortField]) {
         return descending ? 1 : -1
      }
      if (album1[sortField] > album2[sortField]) {
         return descending ? -1 : 1
      }
      return 0
   }
}

export { buildAlbumCompareFunction }
