import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubProjectModule } from '../sub-project/sub-project-module';
import { VolunteerDomainModule } from '../volunteer-domain/volunteer-domain-module';
import { VolunteerModule } from '../volunteer/volunteer-module';
import { VolunteeringModule } from '../volunteering/volunteering/volunteering-module';



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
  inverseDomainCodeNavigation?: ProjectModule[]
  subProjects?: SubProjectModule[]
  volunteerDomains?: VolunteerDomainModule[]
  ////////////////////////
  volunteersPerProject?:VolunteerModule[]
  estimatedCost?:number=0
  estimatedTime?:number=0
  volunteeringArrToProject?:VolunteeringModule[]
  
}
