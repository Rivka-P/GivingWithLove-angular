import { Component, inject, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EichudService } from './Services/eichud-service';
import { V } from '@angular/cdk/keycodes';
import { VolunteerService } from './Services/volunteer-service';
import { VolunteerModule } from './Models/volunteer/volunteer-module';
import { ProjectService } from './Services/project-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blank-app');
  volunteerSrv=inject(VolunteerService)
  ecdSrv=inject(EichudService)
  prjctSrv=inject(ProjectService)
//    ngOnInit(){
//     if(this.volunteerSrv.volunteers.length==0)
//       this.volunteerSrv.refreshData()
//     if(this.ecdSrv.peopleInTheEichud.length==0)
//       this.ecdSrv.refreshData()
//     if(this.prjctSrv.projects.length==0)
//       this.prjctSrv.refreshData()




//   }
 }
