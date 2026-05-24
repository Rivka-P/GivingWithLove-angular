import { Component, inject } from '@angular/core';
import { VolunteerService } from '../../Services/volunteer-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerDomain } from '../volunteer-domain/volunteer-domain';
import { EichudService } from '../../Services/eichud-service';
import { EichudModel } from '../../Models/EichudModel';
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


  
//   vlntrFrm: FormGroup = this.formBuilder.group({
//     name: [null, Validators.required],
//     position: [null, Validators.required],
    
//   });

//   form: FormGroup = this.formBuilder.group({
//     searchText: ['']
//   });
    
//    async ngOnInit(){

// this.listE = await  lastValueFrom(this.eichudService.getAllEichud());
// this.listP = await  lastValueFrom(this.positionService.getAllPositions());
//     this.filteredList = [...this.listE];
//     this.searchControl.valueChanges.subscribe(value => {
//       this.applyFilter(value);
//     });

    
//     this.volunteerService.refreshData()

//   }
  
//   get searchControl() {
//   return this.form.get('searchText') as FormControl;
// }

//   applyFilter(searchValue: string) {
//     const search = searchValue.toLowerCase().trim();

//     if (!search) {
//       this.filteredList = [...this.listE];
//       return;
//     }

//     this.filteredList = this.listE.filter(e =>
//       (`${e.familyName} ${e.firstName} ${e.shtibel} ${e.shver}`)
//         .toLowerCase()
//         .includes(search)
//     );
//   }
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

// // addVolunteer(){
// //   if(this.vlntrFrm.valid){
// //     const volunteer = {
// //       volunteerCode: this.vlntrFrm.value.name!,
// //       positionCode: this.vlntrFrm.value.position!
// //     }
// //     this.volunteerService.addVolunteer(volunteer);
// //   }


// // }
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
addVolunteer() {
   console.log("kkkk");
   
      // //ניתוב לדף הוספה
      // this.router.navigate(['addvolunteer'], { relativeTo: this.activatedRoute });

    //  this.router.navigateByUrl("/volunteer/addvolunteer");
       this.router.navigate(['/volunteer/addvolunteer']);

      // this.router.navigate(['./allvolunteers']);
    

    // //this.editDay = this.rainyDaysSrv.getByDate(dt) ?? new RainyDayModel();
    // this.editGift = ind + 1;
    // //אם נשתמש בסיגנל נעשה כך:
    // this.gftSrv.selectedIndexSignal.set(ind);
    // this.gftSrv.selectedIndexService = ind;
  }
  allVolunteer() {
   console.log("kkkk");
   
      // //ניתוב לדף הוספה
      // this.router.navigate(['addvolunteer'], { relativeTo: this.activatedRoute });

    //  this.router.navigateByUrl("/volunteer/addvolunteer");
       this.router.navigate(['/volunteer/allvolunteers']);

      // this.router.navigate(['./allvolunteers']);
    

    // //this.editDay = this.rainyDaysSrv.getByDate(dt) ?? new RainyDayModel();
    // this.editGift = ind + 1;
    // //אם נשתמש בסיגנל נעשה כך:
    // this.gftSrv.selectedIndexSignal.set(ind);
    // this.gftSrv.selectedIndexService = ind;
  }
}

// this.ordrSrv.getAll().subscribe(async data => {
//       this.ordrSrv.list = data;
//       this.sum = 0;
//       for (let index = 0; index < this.ordrSrv.list.length; index++) {
//         if (this.cp.customerPas == this.ordrSrv.list[index].customerId && !this.ordrSrv.list[index].isPay) {
//           try {
//             const gift: any = await firstValueFrom(this.gftSrv.getByCode(this.ordrSrv.list[index].giftCode));
//             this.sum += this.ordrSrv.list[index].count * gift.cardPrice;
//           } catch (err: any) {
//             alert('ארעה שגיאה ' + err.message);
//           }
//         }
//       }
//     },
//     (err => {
//       alert('ארעה שגיאה ' + err.message);
//     }));
  // }
  // ngOnChanges() {  
  //    this.ordrSrv.getAll().subscribe(async data => {
  //     this.ordrSrv.list = data;
  //     this.sum = 0;
  //     for (let index = 0; index < this.ordrSrv.list.length; index++) {
  //       if (this.cp.customerPas == this.ordrSrv.list[index].customerId && !this.ordrSrv.list[index].isPay) {
  //         try {
  //           const gift: any = await firstValueFrom(this.gftSrv.getByCode(this.ordrSrv.list[index].giftCode));
  //           this.sum += this.ordrSrv.list[index].count * gift.cardPrice;
  //         } catch (err: any) {
  //           alert('ארעה שגיאה ' + err.message);
  //         }
  //       }
  //     }
  //   },
  //   (err => {
  //     alert('ארעה שגיאה ' + err.message);
  //   }));
// vlntrFrm = new FormGroup({
      
  //     name: new FormControl<number | null>(null, Validators.required),
  //     position: new FormControl<number | null>(null, Validators.required)
  //   });
    // constructor(private fb: FormBuilder) {

    //   this.form = this.fb.group({
    //     name: [''],
    //     searchText: ['']
    //   });
    // }
    //  await lastValueFrom(this.eichudService.getAllEichud().subscribe(x => this.listE = x))
// .subscribe(async data => {
//       this.listE=data
//       // this.sum = 0;
//       // for (let index = 0; index < this.ordrSrv.list.length; index++) {
//       //   if (this.cp.customerPas == this.ordrSrv.list[index].customerId && !this.ordrSrv.list[index].isPay) {
//       //     try {
//       //       const gift: any = await firstValueFrom(this.gftSrv.getByCode(this.ordrSrv.list[index].giftCode));
//       //       this.sum += this.ordrSrv.list[index].count * gift.cardPrice;
//       //     } catch (err: any) {
//       //       alert('ארעה שגיאה ' + err.message);
//       //     }
//         // }
//       // }
//     },
//     (err => {
//       alert('ארעה שגיאה ' + err.message);
//     }));)
// this.searchControl.valueChanges.subscribe(searchValue => {
//   this.onSearchChange(searchValue);
//   const match = this.filteredList.find(e => 
//     `${e.familyName} ${e.firstName}`.toLowerCase() === searchValue.toLowerCase()
//   );
//   if (match) {
//     this.vlntrFrm.patchValue({ name: match.eichudCode });
//   }
// });
  // onSearchChange(searchValue: string) {
  //   const search = searchValue.toLowerCase();
  //   this.filteredList = this.listE.filter(e =>
  //     (`${e.familyName} ${e.firstName } ${e.shtibel} ${e.shver} ${e.firstName +' '+ e.familyName}`)
  //       .toLowerCase()
  //       .includes(search)
  //   );
  // }