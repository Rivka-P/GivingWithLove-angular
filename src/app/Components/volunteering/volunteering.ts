import { VolunteeringService } from '../../Services/volunteering-service';
import { EichudModel } from '../../Models/EichudModel';

import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerModule } from '../../Models/volunteer/volunteer-module';
import { VolunteerService } from '../../Services/volunteer-service';
import { EichudService } from '../../Services/eichud-service';
import { DataView } from 'primeng/dataview';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { ProjectService } from '../../Services/project-service';
import { ProjectModule } from '../../Models/project/project-module';
import { SubProjectService } from '../../Services/sub-project-service';
import { SubProjectModule } from '../../Models/sub-project/sub-project-module';
import { lastValueFrom } from 'rxjs';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { Component, inject } from '@angular/core';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
import { NO_ERRORS_SCHEMA, SECURITY_SCHEMA } from '@angular/compiler';

@Component({
  selector: 'app-volunteering',
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './volunteering.html',
  styleUrl: './volunteering.scss'
})
export class Volunteering {
  projectService = inject(ProjectService)
  projectsArr: ProjectModule[] = [];
  subProjectService = inject(SubProjectService)
  subProjects: SubProjectModule[] = [];
  filteredSubProjects: SubProjectModule[] = []; // מאגר ה-subProjects המותאם לפי projectCode
  // poorManService = inject(EichudService)
  volunteeringArr: VolunteeringModule[] = [];
  volunteerArr: VolunteerModule[] = []//מערך מתנדבים
  volunteeringService = inject(VolunteeringService)
  volunteerService = inject(VolunteerService)
  ecdService = inject(EichudService)

  vlntrFrm = new FormGroup({
    dateOfVolunteering: new FormControl<string | null>(null, Validators.required),

    volunteerCode: new FormControl<number | null>(this.volunteeringService.volunteerCodeInS ? this.volunteeringService.volunteerCodeInS : null, Validators.required),
    poorManCode: new FormControl<number | null>(this.volunteeringService.poorManCodeInS ? this.volunteeringService.poorManCodeInS : null, Validators.required),
    matcherCode: new FormControl<number | null>(this.volunteeringService.matcherCodeInS ? this.volunteeringService.matcherCodeInS : null, Validators.required),
    projectCode: new FormControl<number | null>(this.volunteeringService.projectCodeInS ? this.volunteeringService.projectCodeInS : null),
    subProjectCode: new FormControl<number | null>(this.volunteeringService.subProjectCodeInS ? this.volunteeringService.subProjectCodeInS : null)

  });
  async ngOnInit() {
    const today = new Date();

    const formatted =
      today.getFullYear() +
      '-' +
      String(today.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(today.getDate()).padStart(2, '0');

    this.vlntrFrm.patchValue({
      dateOfVolunteering: formatted,
      volunteerCode: this.volunteeringService.volunteerCodeInS ,
      poorManCode: this.volunteeringService.poorManCodeInS ,
      matcherCode: this.volunteeringService.matcherCodeInS ,
      projectCode: this.volunteeringService.projectCodeInS ,
      subProjectCode: this.volunteeringService.subProjectCodeInS 
    });
    this.filteredSubProjects =  this.subProjectService.Projects.filter(subPro => subPro.projectCode === Number(this.volunteeringService.projectCodeInS))

    await this.volunteerService.getAllVolunteers().subscribe(res => { this.volunteerService.volunteers = res });
    await this.projectService.getAllProjects().subscribe(res => { this.projectsArr = res; this.projectService.projects = res });
    await this.subProjectService.getAllProjects().subscribe(res => { this.subProjects = res; this.subProjectService.Projects = res });
    await this.ecdService.getAllEichud().subscribe(res => { this.ecdService.peopleInTheEichud = res });  

  }



  onProjectChange(event: Event) {
    const selectedProjectCode = (event.target as HTMLSelectElement).value;

    this.filteredSubProjects = this.subProjectService.Projects.filter(subPro => subPro.projectCode === Number(selectedProjectCode));

  }
 
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
