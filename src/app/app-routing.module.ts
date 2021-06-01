import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ArtistsComponent } from "./artists/artists.component"
import { LoginComponent } from "./login/login.component"
import { HomeComponent } from "./home/home.component"
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { AuthGuard } from "./shared/guards/auth.guard"

const routes: Routes = [
   { path: "home", component: HomeComponent },
   { path: "artists", component: ArtistsComponent, canActivate: [AuthGuard] },
   { path: "login", component: LoginComponent },
   { path: "", redirectTo: "/home", pathMatch: "full" },
   { path: "**", component: PageNotFoundComponent },
]

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
