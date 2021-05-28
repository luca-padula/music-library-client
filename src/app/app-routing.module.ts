import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ArtistsComponent } from "src/app/artists/artists.component"
import { LoginComponent } from "src/app/login/login.component"

const routes: Routes = [
   { path: "artists", component: ArtistsComponent },
   { path: "login", component: LoginComponent },
]

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
