import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { Album } from "../albums/album"
import { Playlist } from "./playlist"

@Injectable({
   providedIn: "root",
})
export class PlaylistService {
   constructor(private http: HttpClient) {}

   getPlaylistsForUser(userId: string): Observable<Playlist[]> {
      return this.http.get<Playlist[]>(
         `${environment.apiUrl}/users/${userId}/playlists`
      )
   }

   createPlaylist(newPlaylist: Partial<Playlist>): Observable<any> {
      return this.http.post(`${environment.apiUrl}/playlists`, newPlaylist)
   }

   addAlbumToPlaylist(albumId: string, playlistId: string): Observable<any> {
      return this.http.put(
         `${environment.apiUrl}/playlists/${playlistId}/albums/${albumId}`,
         {}
      )
   }
}
