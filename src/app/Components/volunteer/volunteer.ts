
import { Component, inject } from '@angular/core';
import { VolunteerService } from '../../Services/volunteer-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerDomain } from '../volunteer-domain/volunteer-domain';
import { EichudService } from '../../Services/eichud-service';
import { EichudModel } from   '../../Models/EichudModel';
import { lastValueFrom } from 'rxjs';
import { PositionService } from '../../Services/position-service';
import { PositionModel } from '../../Models/PositionModel';
import { FormBuilder } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VolunteeringService } from '../../Services/volunteering-service';

@Component({
  selector: 'app-volunteer',
  imports: [ReactiveFormsModule, CommonModule,ScrollingModule,RouterModule],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss'
})
export class Volunteer {
  volunteerService=inject(VolunteerService)
  volunteeringService=inject(VolunteeringService)
  eichudService=inject(EichudService)
  positionService=inject(PositionService)
  listE:EichudModel[]=[];
  listP:PositionModel[]=[];
  filteredList:EichudModel[] = [];
  formBuilder = inject(FormBuilder);
   router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

addVolunteer() {
   console.log("kkkk");  
       this.router.navigate(['/volunteer/addvolunteer']);
  }
  allVolunteer() {
   console.log("kkkk");
       this.router.navigate(['/volunteer/allvolunteers']);
  }}
//   onSearchChange(searchValue: string) {
//   const search = searchValue.toLowerCase().trim();
//   if (!search) {
//     this.filteredList = [...this.listE]; // מציג את כל המתנדבים
//     return;
//   }
//   this.filteredList = this.listE.filter(e =>
//     (`${e.familyName} ${e.firstName} ${e.shtibel} ${e.shver} ${e.firstName +' '+ e.familyName}`)
//       .toLowerCase()
//       .includes(search)
//   );
// }

// addVolunteer(){
//   if(this.vlntrFrm.valid){
//     const volunteer = {
//       volunteerCode: this.vlntrFrm.value.name!,
//       positionCode: this.vlntrFrm.value.position!
//     }
//     console.log(this.volunteerService.volunteers.length);
//         this.volunteerService.addVolunteer(volunteer);
//         console.log(this.volunteerService.volunteers.length);
//   }
// }
// selectVolunteer(vol: EichudModel) {
//   // מעדכן את ה-FormControl של המתנדב
//   this.vlntrFrm.patchValue({ name: vol.eichudCode });
//   // מעדכן גם את תיבת החיפוש כדי להראות למשתמש מה נבחר
//   this.searchControl.setValue(`${vol.familyName} ${vol.firstName}`, { emitEvent: false });
// }
// calculateViewportHeight(): number {
//   const itemHeight = 40; // אותו itemSize
//   const maxHeight = 300; // גובה מקסימלי של התיבה
//   const minHeight = 40;  // גובה מינימלי אם יש רק פריט אחד

//   // מספר פריטים בפועל
//   const itemCount = this.filteredList.length;

//   // הגובה: פריטים * גובה פריט, מוגבל למקסימום ולמינימום
//   return Math.min(maxHeight, Math.max(minHeight, itemCount * itemHeight));
// }
// }

