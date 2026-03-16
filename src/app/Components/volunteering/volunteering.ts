import { Component, inject } from '@angular/core';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
import { VolunteeringService } from '../../Services/volunteering-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerModule } from '../../Models/volunteer/volunteer-module';
import { VolunteerService } from '../../Services/volunteer-service';

@Component({
  selector: 'app-volunteering',
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './volunteering.html',
  styleUrl: './volunteering.scss'
})
export class Volunteering {
  volunteeringArr: VolunteeringModule[] = [];
  volunteeringService = inject(VolunteeringService)
  volunteerService = inject(VolunteerService)
  ngOnInit() {
    this.volunteeringService.getAllVolunteerings().subscribe(res => { this.volunteeringArr = res })
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
