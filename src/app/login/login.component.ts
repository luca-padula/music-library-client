import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { NgForm } from "@angular/forms"
import { AuthService } from "../shared/services/auth.service"
import { User } from "../shared/models/user"

@Component({
   selector: "app-login",
   templateUrl: "./login.component.html",
   styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
   // public user: User

   constructor(private auth: AuthService, private router: Router) {
      // this.user = new User()
   }

   ngOnInit(): void {}
}
