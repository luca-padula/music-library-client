import { Album } from "../albums/album"

export interface Playlist {
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
