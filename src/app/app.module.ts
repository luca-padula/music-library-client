import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { ArtistsComponent } from "./artists/artists.component"
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

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
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
