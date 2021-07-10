import { ViewportScroller } from "@angular/common"
import { Component, HostListener, OnInit } from "@angular/core"

@Component({
   selector: "app-back-to-top",
   templateUrl: "./back-to-top.component.html",
   styleUrls: ["./back-to-top.component.css"],
})
export class BackToTopComponent implements OnInit {
   pageYOffset = 0
   @HostListener("window:scroll", ["$event"]) onScroll(event: any) {
      this.pageYOffset = window.pageYOffset
   }

   constructor(private scroller: ViewportScroller) {}

   ngOnInit(): void {}

   scrollToTop(): void {
      this.scroller.scrollToPosition([0, 0])
   }
}
