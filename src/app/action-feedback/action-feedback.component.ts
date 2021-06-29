import { Component, Input, OnInit } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"
import { ApiError, emptyApiError } from "../shared/models/api-error"

@Component({
   selector: "app-action-feedback",
   templateUrl: "./action-feedback.component.html",
   styleUrls: ["./action-feedback.component.css"],
})
export class ActionFeedbackComponent implements OnInit {
   successMessage: string = ""
   error: ApiError = emptyApiError
   @Input() successNotifier = new Observable<string>()
   @Input() errorNotifier = new Observable<ApiError>()
   ngUnsubscribe = new Subject<any>()

   constructor() {}

   ngOnInit(): void {
      this.successNotifier
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((message) => (this.successMessage = message))

      this.errorNotifier
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((err) => (this.error = err))
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
