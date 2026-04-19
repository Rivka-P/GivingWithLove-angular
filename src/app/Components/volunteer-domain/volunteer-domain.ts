import { Component, inject } from '@angular/core';
import { VolunteerDomainService } from '../../Services/volunteer-domain-service';
import { VolunteerDomainModule } from '../../Models/volunteer-domain/volunteer-domain-module';

@Component({
  selector: 'app-volunteer-domain',
  imports: [],
  templateUrl: './volunteer-domain.html',
  styleUrl: './volunteer-domain.scss'
})
export class VolunteerDomain {
volunteerDomainService=inject(VolunteerDomainService)
volunteerDomainArr:VolunteerDomainModule[]=[]

 async ngOnInit(){
 await this.volunteerDomainService.getAllVolunteerDomain().subscribe(res=>this.volunteerDomainArr=res)
}  
}
