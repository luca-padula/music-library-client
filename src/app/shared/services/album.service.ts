import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { Album } from "../models/album"

@Injectable({
   providedIn: "root",
})
export class AlbumService {
   constructor(private http: HttpClient) {}

   getAllAlbums(): Observable<Album[]> {
      return this.http.get<Album[]>(`${environment.apiUrl}/albums`)
   }
}
