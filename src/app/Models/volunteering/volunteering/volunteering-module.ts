import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class VolunteeringModule {
 
    volunteeringCode!:number

    dateOfVolunteering!:Date 

    volunteerCode?:number 

    poorManCode?:number

    matcherCode? :number

    projectCode!:number 

    subProjectCode!:number

    // public virtual Volunteer? MatcherCodeNavigation { get; set; }

    // public virtual Eichud? PoorManCodeNavigation { get; set; }

    // public virtual Project ProjectCodeNavigation { get; set; } = null!;

    // public virtual SubProject SubProjectCodeNavigation { get; set; } = null!;

    // public virtual Volunteer? VolunteerCodeNavigation { get; set; }
}


