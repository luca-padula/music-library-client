import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Artist } from "src/app/artists/artist"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"

@Injectable({
   providedIn: "root",
})
export class ArtistService {
   constructor(private http: HttpClient) {}

   getAllArtists(): Observable<Artist[]> {
      return this.http.get<Artist[]>(`${environment.apiUrl}/artists`)
   }

   addArtist(newArtist: Partial<Artist>): Observable<any> {
      return this.http.post(`${environment.apiUrl}/artists`, newArtist)
   }
}