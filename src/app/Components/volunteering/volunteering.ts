import { Component, inject } from '@angular/core';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
import { VolunteeringService } from '../../Services/volunteering-service';


import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { VolunteerService } from '../../Services/volunteer-service';

import { EichudModel } from '../../Models/EichudModel';


import { VolunteerModule } from '../../Models/volunteer/volunteer-module';

import { EichudService } from '../../Services/eichud-service';
import { DataView } from 'primeng/dataview';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { ProjectModule } from '../../Models/project/project-module';
import { SubProjectModule } from '../../Models/sub-project/sub-project-module';
import { SubProjectService } from '../../Services/sub-project-service';
import { ProjectService } from '../../Services/project-service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-volunteering',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './volunteering.html',
  styleUrl: './volunteering.scss'
})
export class Volunteering {

  volunteeringArr: VolunteeringModule[] = [];//מערך התנדבויות
  projectsArr: ProjectModule[] = [];
  subProjects:SubProjectModule[]=[];
  filteredSubProjects:SubProjectModule[] = []; // מאגר ה-subProjects המותאם לפי projectCode
  volunteerArr:VolunteerModule[]=[]//מערך מתנדבים
  subProjectService = inject(SubProjectService)
  volunteeringService = inject(VolunteeringService)
  projectService=inject(ProjectService)
  volunteerService = inject(VolunteerService)
  ecdService=inject(EichudService)//איחוד service
  onProjectChange(event: Event) {
    const selectedProjectCode = (event.target as HTMLSelectElement).value;
    this.filteredSubProjects = this.subProjects.filter(subPro => subPro.projectCode === Number(selectedProjectCode));
  }
  // getVolunteerName(volunteerCode: number | undefined): string {
  //   // alert(volunteerCode)
  //   if (volunteerCode === undefined) {
  //   return 'שם לא נמצא';
  //   }
  //   const volunteer = this.eichudPeople.find(v => v.eichudCode === volunteerCode);
  //   // alert( volunteer)
  //   return volunteer ? (volunteer.familyName+" "+volunteer.firstName) : 'שם לא נמצא';
  // }

  async ngOnInit(){
    await this.getVolunteering()// this.volunteeringArr = await  lastValueFrom(this.volunteerService.getAllVolunteers());
    this.projectsArr = await  lastValueFrom(this.projectService.getAllProjects());
    this.subProjects = await  lastValueFrom(this.subProjectService.getAllProjects());
    this.volunteerArr = await  lastValueFrom(this.volunteerService.getAllVolunteers());
    // this.eichudPeople = await  lastValueFrom(this.eichudService.getAllEichud());
    this.volunteerService.refreshData();
   this.ecdService.refreshData();
  
    //  alert(this.subProjects.length)

  }
  vlntrFrm = new FormGroup({
    // volunteeringCode: new FormControl<number | null>(null, Validators.required),
    dateOfVolunteering: new FormControl<Date | null>(null, Validators.required),
    volunteerCode: new FormControl<number | null>(this.volunteeringService.volunteerCodeInS ? this.volunteeringService.volunteerCodeInS : null, Validators.required ),
    poorManCode: new FormControl<number | null>(this.volunteeringService.poorManCodeInS ? this.volunteeringService.poorManCodeInS : null, Validators.required),
    matcherCode: new FormControl<number | null>(this.volunteeringService.matcherCodeInS ? this.volunteeringService.matcherCodeInS : null, Validators.required),
    projectCode: new FormControl<number | null>(this.volunteeringService.projectCodeInS ? this.volunteeringService.projectCodeInS : null, Validators.required),
    subProjectCode: new FormControl<number | null>(this.volunteeringService.subProjectCodeInS ? this.volunteeringService.subProjectCodeInS : null, Validators.required)
  });

  addVolunteering() {
    if (this.vlntrFrm.valid) {
      const volunteering = {


        dateOfVolunteering: this.vlntrFrm.value.dateOfVolunteering!,
        volunteerCode: this.vlntrFrm.value.volunteerCode!,
        poorManCode: this.vlntrFrm.value.poorManCode!,
        matcherCode: this.vlntrFrm.value.matcherCode!,
        projectCode: this.vlntrFrm.value.projectCode!,
        subProjectCode: this.vlntrFrm.value.subProjectCode!
      }
      this.volunteeringService.addVolunteering(volunteering);
      alert(volunteering)
    }
  }
  deleteVolunteering(v: VolunteeringModule) {
    this.volunteeringService.addVolunteering(v);

  }
  updateVolunteering(v: VolunteeringModule) {
    this.volunteeringService.updateVolunteering(v);

  }
  getVolunteering() {
    this.volunteeringService.getAllVolunteerings().subscribe(res => { this.volunteeringArr = res })

  }
}
