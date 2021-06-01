import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { FormsModule } from "@angular/forms"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { ArtistsComponent } from "./artists/artists.component"
import { LoginComponent } from "./login/login.component"
import { HomeComponent } from "./home/home.component"
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { AuthTokenInterceptor } from "src/app/shared/interceptors/auth-token.interceptor"
import { ErrorInterceptor } from "./shared/interceptors/error.interceptor"

@NgModule({
   declarations: [
      AppComponent,
      SidebarComponent,
      ArtistsComponent,
      LoginComponent,
      HomeComponent,
      PageNotFoundComponent,
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
