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
   ],
   imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
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
