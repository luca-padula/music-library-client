import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { FormsModule } from "@angular/forms"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { ArtistListComponent } from "./artists/artist-list/artist-list.component"
import { LoginComponent } from "./auth/login/login.component"
import { HomeComponent } from "./home/home.component"
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { AuthTokenInterceptor } from "./auth/auth-token.interceptor"
import { ErrorInterceptor } from "./shared/interceptors/error.interceptor"
import { AlbumListComponent } from "./albums/album-list/album-list.component"
import { SortOptionSelectComponent } from "./sort-option-select/sort-option-select.component"
import { AlbumDisplayComponent } from "./albums/album-display/album-display.component"
import { NgbModalModule, NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap"
import { AddAlbumToPlaylistMenuComponent } from "./playlists/add-album-to-playlist-menu/add-album-to-playlist-menu.component"
import { CreatePlaylistCollapseComponent } from "./playlists/create-playlist-collapse/create-playlist-collapse.component";
import { ActionFeedbackComponent } from './action-feedback/action-feedback.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AlbumsPageComponent } from './albums/albums-page/albums-page.component';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';
import { PlaylistsPageComponent } from './playlists/playlists-page/playlists-page.component';
import { PlaylistDisplayComponent } from './playlists/playlist-display/playlist-display.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { CreateAlbumComponent } from './albums/create-album/create-album.component'

@NgModule({
   declarations: [
      AppComponent,
      SidebarComponent,
      ArtistListComponent,
      LoginComponent,
      HomeComponent,
      PageNotFoundComponent,
      AlbumListComponent,
      SortOptionSelectComponent,
      AlbumDisplayComponent,
      AddAlbumToPlaylistMenuComponent,
      CreatePlaylistCollapseComponent,
      ActionFeedbackComponent,
      SignupComponent,
      AlbumsPageComponent,
      ArtistDetailComponent,
      PlaylistsPageComponent,
      PlaylistDisplayComponent,
      BackToTopComponent,
      CreateAlbumComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      NgbModalModule,
      NgbCollapseModule,
   ],
   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthTokenInterceptor,
         multi: true,
      },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptor,
         multi: true,
      },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
