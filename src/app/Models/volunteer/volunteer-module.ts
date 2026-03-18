import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EichudModel } from '../EichudModel';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class VolunteerModule {

  volunteerCode!: number
  positionCode!: number
  volunteerCodeNavigation?:EichudModel
}
