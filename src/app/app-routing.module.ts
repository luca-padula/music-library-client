import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ArtistListComponent } from "./artists/artist-list/artist-list.component"
import { LoginComponent } from "./auth/login/login.component"
import { HomeComponent } from "./home/home.component"
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { AuthGuard } from "./auth/auth.guard"
import { SignupComponent } from "./auth/signup/signup.component"
import { AlbumsPageComponent } from "./albums/albums-page/albums-page.component"
import { ArtistDetailComponent } from "./artists/artist-detail/artist-detail.component"
import { ArtistResolver } from "./artists/artist.resolver"
import { PlaylistsPageComponent } from "./playlists/playlists-page/playlists-page.component"
import { CreateAlbumComponent } from "./albums/create-album/create-album.component"
import { PlaylistDetailComponent } from "./playlists/playlist-detail/playlist-detail.component"
import { PlaylistResolver } from "./playlists/playlist.resolver"
import { EditPlaylistComponent } from "./playlists/edit-playlist/edit-playlist.component"

const routes: Routes = [
   { path: "home", component: HomeComponent },
   { path: "artists", component: ArtistListComponent },
   {
      path: "artist/:id",
      component: ArtistDetailComponent,
      resolve: { artist: ArtistResolver },
   },
   { path: "login", component: LoginComponent },
   { path: "signup", component: SignupComponent },
   { path: "albums", component: AlbumsPageComponent },
   {
      path: "create-album",
      component: CreateAlbumComponent,
      canActivate: [AuthGuard],
   },
   { path: "playlists", component: PlaylistsPageComponent },
   {
      path: "playlist/:id",
      component: PlaylistDetailComponent,
      resolve: { playlist: PlaylistResolver },
   },
   {
      path: "playlist/:id/edit",
      component: EditPlaylistComponent,
      resolve: { playlist: PlaylistResolver },
   },
   { path: "", redirectTo: "/home", pathMatch: "full" },
   { path: "**", component: PageNotFoundComponent },
]

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
