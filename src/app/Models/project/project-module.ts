import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProjectModule {
  projectCode?: number
  projectName!: string
  projectManagerCode?: number
  domainCode?: number
}
