import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { take } from "rxjs/operators"
import { ApiError, emptyApiError } from "src/app/shared/models/api-error"
import { AuthService } from "../auth.service"
import { emptyUserSignup } from "../user-signup"

@Component({
   selector: "app-signup",
   templateUrl: "./signup.component.html",
   styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
   user = emptyUserSignup
   accountCreated = false
   error = emptyApiError

   constructor(private authService: AuthService) {}

   ngOnInit(): void {}

   onSubmit(form: NgForm): void {
      this.error = emptyApiError
      this.authService
         .signup(this.user)
         .pipe(take(1))
         .subscribe(
            (success) => {
               console.log(success)
               this.accountCreated = true
            },
            (err: ApiError) => {
               this.error = err
            }
         )
   }
}
