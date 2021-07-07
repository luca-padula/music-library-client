import { Album } from "../albums/album"

interface Playlist {
   _id: string
   name: string
   isPrivate: boolean
   albums: string[] | Album[]
   creator: string
   creatorUserName: string
   createdAt: Date
   updatedAt: Date
   __v: number
}

const emptyDate = new Date()

const emptyPlaylist: Playlist = {
   _id: "",
   name: "",
   isPrivate: false,
   albums: [],
   creator: "",
   creatorUserName: "",
   createdAt: emptyDate,
   updatedAt: emptyDate,
   __v: 0,
}

export { Playlist, emptyPlaylist }
