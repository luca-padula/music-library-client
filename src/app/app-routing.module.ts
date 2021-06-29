import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ArtistListComponent } from "./artists/artist-list/artist-list.component"
import { LoginComponent } from "./auth/login/login.component"
import { HomeComponent } from "./home/home.component"
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { AuthGuard } from "./auth/auth.guard"
import { AlbumListComponent } from "./albums/album-list/album-list.component"
import { SignupComponent } from "./auth/signup/signup.component"

const routes: Routes = [
   { path: "home", component: HomeComponent },
   { path: "artists", component: ArtistListComponent },
   { path: "login", component: LoginComponent },
   { path: "signup", component: SignupComponent },
   { path: "albums", component: AlbumListComponent },
   { path: "", redirectTo: "/home", pathMatch: "full" },
   { path: "**", component: PageNotFoundComponent },
]

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
