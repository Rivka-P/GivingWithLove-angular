import { Component, inject } from '@angular/core';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
import { VolunteeringService } from '../../Services/volunteering-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-volunteering',
  imports: [AsyncPipe],
  templateUrl:'./volunteering.html',
  styleUrl: './volunteering.scss'
})
export class Volunteering {

   volunteeringArr:VolunteeringModule[]=[]; 
   volunteeringService=inject(VolunteeringService)
ngOnInit(){
this.volunteeringService.getAllVolunteerings().subscribe(res=>{this.volunteeringArr = res})
  }

  addVolunteering(v:VolunteeringModule){
    this.volunteeringService.addVolunteering(v);
  }
  deleteVolunteering(v:VolunteeringModule){
        this.volunteeringService.addVolunteering(v);

  }
  updateVolunteering(v:VolunteeringModule){
        this.volunteeringService.updateVolunteering(v);

  }
  getVolunteering(){
    this.volunteeringService.getAllVolunteerings().subscribe(res=>{this.volunteeringArr = res})

  }
  getVolunteeringById(v:VolunteeringModule){
    this.volunteeringService.getVolunteeringById(v.volunteeringCode)
  }
}
