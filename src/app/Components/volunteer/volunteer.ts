
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
  }
}

