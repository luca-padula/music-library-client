import { Component, OnInit } from "@angular/core"
import { AuthService } from "../shared/services/auth.service"

@Component({
   selector: "app-sidebar",
   templateUrl: "./sidebar.component.html",
   styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
   private token: any

   constructor(private authService: AuthService) {
      this.token = authService.getDecodedToken()
   }

   ngOnInit(): void {}
}
