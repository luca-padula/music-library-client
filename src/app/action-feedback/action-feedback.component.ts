import { Component, Input, OnInit } from "@angular/core"
import { ApiError, emptyApiError } from "../shared/models/api-error"

@Component({
   selector: "app-action-feedback",
   templateUrl: "./action-feedback.component.html",
   styleUrls: ["./action-feedback.component.css"],
})
export class ActionFeedbackComponent implements OnInit {
   @Input() successMessage: string = ""
   @Input() error: ApiError = emptyApiError

   constructor() {}

   ngOnInit(): void {}
}
