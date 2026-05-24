import { Component, inject, Inject } from '@angular/core';
import { EichudService } from '../../Services/eichud-service';
import { PositionService } from '../../Services/position-service';
import { VolunteerService } from '../../Services/volunteer-service';
import { VolunteeringService } from '../../Services/volunteering-service';
import { forkJoin } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { VolunteerDomain } from '../volunteer-domain/volunteer-domain';

@Component({
  selector: 'app-home-page',
  imports: [ ReactiveFormsModule, CommonModule,  RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  // isLoading=true;
  // eichudService=inject(EichudService)
  // positionService=inject(PositionService)
  // volunteerService=inject(VolunteerService)
  // volunteeringService=inject(VolunteeringService)

//   ngOnInit() {  



//  while(this.isLoading){
//     forkJoin({
     
//           // eichudList: this.eichudService.refreshData(),
//           // positionList: this.positionService.refreshData(),
//           // volunteerList: this.volunteerService.refreshData(),
//           // volunteeringList:  this.volunteeringService.refreshData()
//           // projectList: this.projectService.getAllProjects()
//         }).subscribe({
//           next: () => {
          
//             this.isLoading = false;
//           },
//           error: (err) => {
//             alert('שגיאה בטעינת נתונים');
//             this.isLoading = true;
//           }
//         });}
//         // this.searchControl.valueChanges.subscribe(value => {
//         //   this.applyFilter(value);
//         // });
    
//     //  await this.eichudService.refreshData()
// //  await this.positionService.refreshData()
// //  await this.volunteerService.refreshData()
// //  await this.volunteeringService.refreshData()
// //  this.isLoading=false;
    
//     //     this.volunteerService.refreshData()
    
//       }
  }


