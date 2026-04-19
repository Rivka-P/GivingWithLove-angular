import { Component, inject, OnChanges } from '@angular/core';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
import { VolunteeringService } from '../../Services/volunteering-service';
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
  volunteeringService = inject(VolunteeringService)
  volunteerService = inject(VolunteerService)
  ecdService = inject(EichudService)
  vlntrFrm = new FormGroup({
    dateOfVolunteering: new FormControl<string | null>(null, Validators.required),

    volunteerCode: new FormControl<number | null>(this.volunteeringService.volunteerCodeInS ? this.volunteeringService.volunteerCodeInS : null, Validators.required),
    poorManCode: new FormControl<number | null>(this.volunteeringService.poorManCodeInS ? this.volunteeringService.poorManCodeInS : null, Validators.required),
    matcherCode: new FormControl<number | null>(this.volunteeringService.matcherCodeInS ? this.volunteeringService.matcherCodeInS : null, Validators.required),
    projectCode: new FormControl<number | null>(this.volunteeringService.projectCodeInS ? this.volunteeringService.projectCodeInS : null, Validators.required),
    subProjectCode: new FormControl<number | null>(this.volunteeringService.subProjectCodeInS ? this.volunteeringService.subProjectCodeInS : null, Validators.required)

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
      dateOfVolunteering: formatted
    });
    this.vlntrFrm = new FormGroup({
    dateOfVolunteering: new FormControl<string | null>(null, Validators.required),

    volunteerCode: new FormControl<number | null>(this.volunteeringService.volunteerCodeInS ? this.volunteeringService.volunteerCodeInS : null, Validators.required),
    poorManCode: new FormControl<number | null>(this.volunteeringService.poorManCodeInS ? this.volunteeringService.poorManCodeInS : null, Validators.required),
    matcherCode: new FormControl<number | null>(this.volunteeringService.matcherCodeInS ? this.volunteeringService.matcherCodeInS : null, Validators.required),
    projectCode: new FormControl<number | null>(this.volunteeringService.projectCodeInS ? this.volunteeringService.projectCodeInS : 0, Validators.required),
    subProjectCode: new FormControl<number | null>(this.volunteeringService.subProjectCodeInS ? this.volunteeringService.subProjectCodeInS : null, Validators.required)

  });
  // await this.volunteerService.refreshData()
   
  //  await this.ecdService.refreshData()
  //  await this.subProjectService.refreshData()
  //  await this.projectService.refreshData()
    // this.volunteerService.refreshData()

  await  this.volunteerService.getAllVolunteers().subscribe(res => { this.volunteerService.volunteers=res}) ;

    // await this.volunteeringService.getAllVolunteerings().subscribe(res => {  this.volunteeringArr = res; this.volunteerService.refreshData()})
   await  this.projectService.getAllProjects().subscribe(res => {this.projectsArr = res ; this.projectService.projects=res})  ;
       await  this.subProjectService.getAllProjects().subscribe(res => {this.subProjects = res; this.subProjectService.Projects=res}) ;
   await  this.ecdService.getAllEichud().subscribe(res => { this.ecdService.peopleInTheEichud=res}) ;

  }


//   async ngOnChanges(){
//  await this.volunteeringService.getAllVolunteerings().subscribe(res => {  this.volunteeringArr = res })
//   await   this.projectService.getAllProjects().subscribe(res => this.projectsArr = res)  ;
//   await    this.subProjectService.getAllProjects().subscribe(res => this.subProjects = res) ;
      
//   this.vlntrFrm = new FormGroup({
//     dateOfVolunteering: new FormControl<string | null>(null, Validators.required),

//     volunteerCode: new FormControl<number | null>(this.volunteeringService.volunteerCodeInS ? this.volunteeringService.volunteerCodeInS : null, Validators.required),
//     poorManCode: new FormControl<number | null>(this.volunteeringService.poorManCodeInS ? this.volunteeringService.poorManCodeInS : null, Validators.required),
//     matcherCode: new FormControl<number | null>(this.volunteeringService.matcherCodeInS ? this.volunteeringService.matcherCodeInS : null, Validators.required),
//     projectCode: new FormControl<number | null>(this.volunteeringService.projectCodeInS ? this.volunteeringService.projectCodeInS : 0, Validators.required),
//     subProjectCode: new FormControl<number | null>(this.volunteeringService.subProjectCodeInS ? this.volunteeringService.subProjectCodeInS : null, Validators.required)

//   });
//   }


  onProjectChange(event: Event) {
    const selectedProjectCode = (event.target as HTMLSelectElement).value;
    console.log(selectedProjectCode);
    
    this.filteredSubProjects = this.subProjectService.Projects.filter(subPro => subPro.projectCode === Number(selectedProjectCode));
    console.log(this.filteredSubProjects);
    
  }

  
  addVolunteering() {
    if (this.vlntrFrm.valid) {
      const volunteering = {
        // volunteeringCode: this.vlntrFrm.controls['volunteerCode'].value!,
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
// import { Component, inject } from '@angular/core';
// import { VolunteeringService } from '../../Services/volunteering-service';
// import { VolunteerService } from '../../Services/volunteer-service';
// import { EichudService } from '../../Services/eichud-service';
// import { ProjectService } from '../../Services/project-service';
// import { SubProjectService } from '../../Services/sub-project-service';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { lastValueFrom } from 'rxjs';
// import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
// import { ProjectModule } from '../../Models/project/project-module';
// import { SubProjectModule } from '../../Models/sub-project/sub-project-module';
// import { AsyncPipe, CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-volunteering',
//   imports: [ReactiveFormsModule,AsyncPipe, CommonModule],
//   templateUrl: './volunteering.html',
//   styleUrls: ['./volunteering.scss']
// })
// export class Volunteering {
//   projectsArr: ProjectModule[] = [];
//   subProjects: SubProjectModule[] = [];
//   filteredSubProjects: SubProjectModule[] = [];
//   volunteeringArr: VolunteeringModule[] = [];

//   projectService = inject(ProjectService);
//   subProjectService = inject(SubProjectService);
//   volunteeringService = inject(VolunteeringService);
//   volunteerService = inject(VolunteerService);
//   ecdService = inject(EichudService);

//   vlntrFrm = new FormGroup({
//     dateOfVolunteering: new FormControl<string | null>(null, Validators.required),
//     volunteerCode: new FormControl<number | null>(null, Validators.required),
//     poorManCode: new FormControl<number | null>(null, Validators.required),
//     matcherCode: new FormControl<number | null>(null, Validators.required),
//     projectCode: new FormControl<number | null>(null, Validators.required),
//     subProjectCode: new FormControl<number | null>(null, Validators.required)
//   });

//   async ngOnInit() {
//     const today = new Date();
//     const formatted =
//       today.getFullYear() +
//       '-' +
//       String(today.getMonth() + 1).padStart(2, '0') +
//       '-' +
//       String(today.getDate()).padStart(2, '0');

//     this.vlntrFrm.patchValue({
//       dateOfVolunteering: formatted
//     });

//     // Fetching all data using Promise.all or lastValueFrom
//     try {
//       const [volunteerings, projects, subProjects] = await Promise.all([
//         lastValueFrom(this.volunteeringService.getAllVolunteerings()),
//         lastValueFrom(this.projectService.getAllProjects()),
//         lastValueFrom(this.subProjectService.getAllProjects())
//       ]);
      
//       this.volunteeringArr = volunteerings;
//       this.projectsArr = projects;
//       this.subProjects = subProjects;
//     } catch (error) {
//       console.error('Error loading data:', error);
//     }
//   }

//   onProjectChange(event: Event) {
//     const selectedProjectCode = (event.target as HTMLSelectElement).value;
//     this.filteredSubProjects = this.subProjects.filter(subPro => subPro.projectCode === Number(selectedProjectCode));
//   }

//   addVolunteering() {
//     if (this.vlntrFrm.valid) {
//       const volunteering = {
//         dateOfVolunteering: this.vlntrFrm.value.dateOfVolunteering!,
//         volunteerCode: this.vlntrFrm.value.volunteerCode!,
//         poorManCode: this.vlntrFrm.value.poorManCode!,
//         matcherCode: this.vlntrFrm.value.matcherCode!,
//         projectCode: this.vlntrFrm.value.projectCode!,
//         subProjectCode: this.vlntrFrm.value.subProjectCode!
//       };
//       this.volunteeringService.addVolunteering(volunteering);
//       alert('ההתנדבות נוספה!');
//     }
//   }

//   deleteVolunteering(v: VolunteeringModule) {
//     this.volunteeringService.deleteVolunteering(v.volunteeringCode!);
//   }

//   updateVolunteering(v: VolunteeringModule) {
//     this.volunteeringService.updateVolunteering(v);
//   }
// }