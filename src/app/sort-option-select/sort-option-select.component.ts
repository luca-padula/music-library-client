import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { SortOption } from "../shared/models/sort-option"

@Component({
   selector: "app-sort-option-select",
   templateUrl: "./sort-option-select.component.html",
   styleUrls: ["./sort-option-select.component.css"],
})
export class SortOptionSelectComponent implements OnInit {
   @Input() sortOptions!: SortOption[]
   @Output() sortChangeEvent = new EventEmitter<SortOption>()

   constructor() {}

   ngOnInit(): void {}

   changeSort(event: Event) {
      const target = event.target as HTMLInputElement
      const newSortOption = this.sortOptions.find(
         (option) => option.label === target.value
      )
      console.log(newSortOption, target.value)
      this.sortChangeEvent.emit(newSortOption)
   }
}
