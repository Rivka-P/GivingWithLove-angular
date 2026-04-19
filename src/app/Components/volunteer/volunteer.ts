// import { Component, inject } from '@angular/core';
// import { VolunteerService } from '../../Services/volunteer-service';
// import { AsyncPipe, CommonModule } from '@angular/common';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { VolunteerDomain } from '../volunteer-domain/volunteer-domain';

// @Component({
//   selector: 'app-volunteer',
//   imports: [AsyncPipe,ReactiveFormsModule, CommonModule,VolunteerDomain],
//   templateUrl: './volunteer.html',
//   styleUrl: './volunteer.scss'
// })
// export class Volunteer {
//   volunteerService=inject(VolunteerService)
//   vlntrFrm = new FormGroup({
//       code: new FormControl<number | null>(null, Validators.required),
//       name: new FormControl<string | null>(null, Validators.required),
//       position: new FormControl<number | null>(null, Validators.required)
//     });
  
// addVolunteer(){
//   if(this.vlntrFrm.valid){
//     const volunteer = {
//       volunteerCode: this.vlntrFrm.value.code!,
//       positionCode: this.vlntrFrm.value.position!
//     }
//     this.volunteerService.addVolunteer(volunteer);
//   }


// }
// }
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

@Component({
  selector: 'app-volunteer',
  imports: [AsyncPipe,ReactiveFormsModule, CommonModule,VolunteerDomain,ScrollingModule],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss'
})
export class Volunteer {
  volunteerService=inject(VolunteerService)
  eichudService=inject(EichudService)
  positionService=inject(PositionService)
  listE:EichudModel[]=[];
  listP:PositionModel[]=[];
  filteredList:EichudModel[] = [];
  formBuilder = inject(FormBuilder);

  
  vlntrFrm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    position: [null, Validators.required]
  });

  form: FormGroup = this.formBuilder.group({
    searchText: ['']
  });
    
   async ngOnInit(){

this.listE = await  lastValueFrom(this.eichudService.getAllEichud());
this.listP = await  lastValueFrom(this.positionService.getAllPositions());
    this.filteredList = [...this.listE];
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });

    
    this.volunteerService.refreshData()

  }
  get searchControl() {
  return this.form.get('searchText') as FormControl;
}

  applyFilter(searchValue: string) {
    const search = searchValue.toLowerCase().trim();

    if (!search) {
      this.filteredList = [...this.listE];
      return;
    }

    this.filteredList = this.listE.filter(e =>
      (`${e.familyName} ${e.firstName} ${e.shtibel} ${e.shver}`)
        .toLowerCase()
        .includes(search)
    );
  }
  onSearchChange(searchValue: string) {
  const search = searchValue.toLowerCase().trim();
  if (!search) {
    this.filteredList = [...this.listE]; // מציג את כל המתנדבים
    return;
  }
  this.filteredList = this.listE.filter(e =>
    (`${e.familyName} ${e.firstName} ${e.shtibel} ${e.shver} ${e.firstName +' '+ e.familyName}`)
      .toLowerCase()
      .includes(search)
  );
}

addVolunteer(){
  if(this.vlntrFrm.valid){
    const volunteer = {
      volunteerCode: this.vlntrFrm.value.name!,
      positionCode: this.vlntrFrm.value.position!
    }
    this.volunteerService.addVolunteer(volunteer);
  }


}
selectVolunteer(vol: EichudModel) {
  // מעדכן את ה-FormControl של המתנדב
  this.vlntrFrm.patchValue({ name: vol.eichudCode });
  // מעדכן גם את תיבת החיפוש כדי להראות למשתמש מה נבחר
  this.searchControl.setValue(`${vol.familyName} ${vol.firstName}`, { emitEvent: false });
}
calculateViewportHeight(): number {
  const itemHeight = 40; // אותו itemSize
  const maxHeight = 300; // גובה מקסימלי של התיבה
  const minHeight = 40;  // גובה מינימלי אם יש רק פריט אחד

  // מספר פריטים בפועל
  const itemCount = this.filteredList.length;

  // הגובה: פריטים * גובה פריט, מוגבל למקסימום ולמינימום
  return Math.min(maxHeight, Math.max(minHeight, itemCount * itemHeight));
}
}

