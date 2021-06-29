import { SortOption } from "../sort-option-select/sort-option"

export const albumSortOptions: SortOption[] = [
   { label: "", field: "", descending: false },
   { label: "Album name ascending", field: "name", descending: false },
   { label: "Album name descending", field: "name", descending: true },
   {
      label: "Artist name ascending",
      field: "artistName",
      descending: false,
   },
   {
      label: "Artist name descending",
      field: "artistName",
      descending: true,
   },
   {
      label: "Release date earliest to latest",
      field: "releaseDate",
      descending: false,
   },
   {
      label: "Release date latest to earliest",
      field: "releaseDate",
      descending: true,
   },
]
