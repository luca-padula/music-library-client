interface Album {
   _id: string
   name: string
   releaseDate: Date
   albumLength: string
   artist: string
   artistName: string
   createdAt: Date
   updatedAt: Date
   __v: number
}

const emptyDate = new Date()
const emptyAlbum: Album = {
   _id: "",
   name: "",
   albumLength: "",
   artist: "",
   artistName: "",
   __v: 0,
   releaseDate: emptyDate,
   createdAt: emptyDate,
   updatedAt: emptyDate,
}

export { Album, emptyAlbum }
