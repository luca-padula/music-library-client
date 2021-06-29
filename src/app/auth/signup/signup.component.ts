import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { AuthService } from "../auth.service"
import { emptyUserSignup } from "../user-signup"

@Component({
   selector: "app-signup",
   templateUrl: "./signup.component.html",
   styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
   user = emptyUserSignup

   constructor(private authService: AuthService) {}

   ngOnInit(): void {}

   onSubmit(form: NgForm): void {}
}
