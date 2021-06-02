import { Component, OnInit } from "@angular/core"
import { Router, Event, NavigationStart } from "@angular/router"
import { Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"
import { AuthService } from "../shared/services/auth.service"

@Component({
   selector: "app-sidebar",
   templateUrl: "./sidebar.component.html",
   styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
   private ngUnsubscribe = new Subject()
   public token: any

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {
      this.router.events
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
               this.token = this.authService.getDecodedToken()
            }
         })
   }

   logout(): void {
      this.authService.logout()
      this.router.navigate(["login"])
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }
}
