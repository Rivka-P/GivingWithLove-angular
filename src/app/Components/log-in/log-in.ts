import { Component, inject } from '@angular/core';
import { Volunteer } from '../volunteer/volunteer';
import { VolunteerService } from '../../Services/volunteer-service';
import { UserModel } from '../../Models/user/user-model/user-model';
import { PositionService } from '../../Services/position-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EichudService } from '../../Services/eichud-service';
import { VolunteerModule } from '../../Models/volunteer/volunteer-module';
import { EichudModel } from '../../Models/EichudModel';
import { VolunteeringService } from '../../Services/volunteering-service';
@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  constructor(private router: Router) { }
  error: boolean = true
  volunteerSrv: VolunteerService = inject(VolunteerService)
  volunteeringSrv: VolunteeringService = inject(VolunteeringService)

  volunteerArr:VolunteerModule[]=[]
  user?:VolunteerModule;
  positoinSrv: PositionService = inject(PositionService)
  eichudSrv: EichudService = inject(EichudService)
  eichudArr:EichudModel[]=[]
  person?:EichudModel
  lgFrm: FormGroup = new FormGroup({
    userName: new FormControl("אנונימי", [Validators.required]),
    password: new FormControl(0, [Validators.required]),
    position: new FormControl("זמני", [Validators.required])
  })
 async ngOnInit(){
   await this.volunteerSrv.getAllVolunteers().subscribe(res =>{
      this.volunteerArr=res
    })
   await this.eichudSrv.getAllEichud().subscribe(res =>{
      this.eichudArr=res
    })
  }
  enter() {
    let u = new UserModel()
    console.log(this.volunteerSrv.volunteers);
    u.userName = this.lgFrm.controls['userName'].value;
    u.password = this.lgFrm.controls['password'].value;

      this.user = this.volunteerArr.find(x => x.volunteerCode == u.password)
       this.person = this.eichudArr.find(x =>x.eichudCode == u.password)

    if (this.user?.volunteerCode != Number(u.password)) {
      this.error = false
    }
    else if (((this.person?.familyName)?.trim() + " " + (this.person?.firstName)?.trim()) != u.userName) {
      this.error = false
    }
    else {
      u.position = this.user.positionCode
      let nameOfPosition = this.positoinSrv.positions.find(x => x.positionCode == u.position)?.positionName
      this.volunteerSrv.userPosition = nameOfPosition
      this.lgFrm.controls['userName'].setValue(null);
      this.lgFrm.controls['password'].setValue(null);
      this.volunteeringSrv.setSelectedMatcher(Number(u.password))
      this.router.navigate(['/home'])
    }
  }
}
