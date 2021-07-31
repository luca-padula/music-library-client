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

function buildAlbumFilterFunction(filter: string): (album: Album) => boolean {
   return (album: Album) =>
      album.name.toLowerCase().includes(filter.toLowerCase()) ||
      album.artistName.toLowerCase().includes(filter.toLowerCase())
}

export { buildAlbumCompareFunction, buildAlbumFilterFunction }
