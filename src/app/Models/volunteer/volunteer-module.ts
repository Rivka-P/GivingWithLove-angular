import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EichudModel } from '../EichudModel';
// import { VolunteerDomain } from '../../Components/volunteer-domain/volunteer-domain';
import { VolunteerDomainModule } from '../volunteer-domain/volunteer-domain-module';





@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class VolunteerModule {
  volunteerCode!: number
  positionCode!: number
  positionName?: string
  volunteerCodeNavigation?: EichudModel
  volunteerDomains?: VolunteerDomainModule[];


}
