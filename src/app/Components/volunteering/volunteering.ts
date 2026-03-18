import { Component, inject } from '@angular/core';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
import { VolunteeringService } from '../../Services/volunteering-service';
<<<<<<< HEAD
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerModule } from '../../Models/volunteer/volunteer-module';
import { VolunteerService } from '../../Services/volunteer-service';
import { ProjectService } from '../../Services/project-service';
import { ProjectModule } from '../../Models/project/project-module';
import { SubProjectModule } from '../../Models/sub-project/sub-project-module';
import { SubProjectService } from '../../Services/sub-project-service';
import { lastValueFrom } from 'rxjs';
import { EichudService } from '../../Services/eichud-service';
import { EichudModel } from '../../Models/EichudModel';
=======
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerModule } from '../../Models/volunteer/volunteer-module';
import { VolunteerService } from '../../Services/volunteer-service';
import { EichudService } from '../../Services/eichud-service';
import { DataView } from 'primeng/dataview';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
>>>>>>> 93a781744fd55843e6664a9d5e302f489ff1febe

@Component({
  selector: 'app-volunteering',
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
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
    volunteerCode: new FormControl<number | null>(null),
    poorManCode: new FormControl<number | null>(null),
    matcherCode: new FormControl<number | null>(null),
    projectCode: new FormControl<number | null>(null),
    subProjectCode: new FormControl<number | null>(null)

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

  // getVolunteeringById(v: VolunteeringModule) {
  //   this.volunteeringService.getVolunteeringById(v.volunteeringCode)
  // }


}
