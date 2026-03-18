import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SubProjectModule { 
  subProjectCode?: number
  projectCode!: number
  subProjectName!: string
  estimatedTime?: number
  estimatedCost?: number

}
