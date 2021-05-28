import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { ArtistsComponent } from "./artists/artists.component"

@NgModule({
   declarations: [AppComponent, SidebarComponent, ArtistsComponent],
   imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
