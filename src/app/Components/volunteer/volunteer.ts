import { Component, inject } from '@angular/core';
import { VolunteerService } from '../../Services/volunteer-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerDomain } from '../volunteer-domain/volunteer-domain';

@Component({
  selector: 'app-volunteer',
  imports: [AsyncPipe,ReactiveFormsModule, CommonModule,VolunteerDomain],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss'
})
export class Volunteer {
  volunteerService=inject(VolunteerService)
  vlntrFrm = new FormGroup({
      code: new FormControl<number | null>(null, Validators.required),
      name: new FormControl<string | null>(null, Validators.required),
      position: new FormControl<number | null>(null, Validators.required)
    });
  
addVolunteer(){
  if(this.vlntrFrm.valid){
    const volunteer = {
      volunteerCode: this.vlntrFrm.value.code!,
      positionCode: this.vlntrFrm.value.position!
    }
    this.volunteerService.addVolunteer(volunteer);
  }


}
}
