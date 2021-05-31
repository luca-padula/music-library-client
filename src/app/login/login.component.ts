import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { NgForm } from "@angular/forms"
import { AuthService } from "../shared/services/auth.service"
import { User } from "../shared/models/user"
import { take } from "rxjs/operators"

@Component({
   selector: "app-login",
   templateUrl: "./login.component.html",
   styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
   public user: any
   errorMessage: string = ""

   constructor(private authService: AuthService, private router: Router) {
      this.user = {
         userName: "",
         password: "",
      }
   }

   ngOnInit(): void {}

   onSubmit(userLoginForm: NgForm): void {
      this.errorMessage = ""
      this.authService
         .login(this.user)
         .pipe(take(1))
         .subscribe(
            (success) => {
               this.authService.setToken(success.token)
               this.router.navigate(["/home"])
            },
            (err) => {
               this.errorMessage = err.message
            }
         )
   }
}
