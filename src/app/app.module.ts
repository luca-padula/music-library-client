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
import { InterceptTokenService } from "src/app/shared/services/intercept-token.service"

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
         useClass: InterceptTokenService,
         multi: true,
      },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
