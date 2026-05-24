import { Component, inject, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EichudService } from './Services/eichud-service';
import { V } from '@angular/cdk/keycodes';
import { VolunteerService } from './Services/volunteer-service';
import { VolunteerModule } from './Models/volunteer/volunteer-module';

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
  ngOnInit(){
      // this.volunteerSrv.refreshData()
      // this.ecdSrv.refreshData()


  }
}
