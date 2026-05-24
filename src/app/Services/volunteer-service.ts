import { inject, Injectable } from '@angular/core';
import { VolunteerModule } from '../Models/volunteer/volunteer-module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VolunteerDomainModule } from '../Models/volunteering/volunteer-domain/volunteer-domain-module';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  BASE_URL: string =' https://localhost:7016/api/Volunteer';
  http = inject(HttpClient);
  volunteers$: Observable<VolunteerModule[]>;
  volunteers:VolunteerModule[]=[];
    volunteerCodeInS?:number 
  setSelectedVolunteer(volunteerCode: number) {
    this.volunteerCodeInS = volunteerCode;
  }
  // volunterrDomain:
    constructor() { 
      this.volunteers$=this.getAllVolunteers()
    }
  getAllVolunteers(): Observable<VolunteerModule[]> {
    return this.http.get<VolunteerModule[]>(this.BASE_URL);
  }
getVolunteerById(id: number): Observable<VolunteerModule> {
    return this.http.get<VolunteerModule>(this.BASE_URL + '/' + id);
}

  // getProjectById(id:number): Observable<ProjectModule[]> {
  //   return this.http.get<ProjectModule[]>(this.BASE_URL +'Get/'+id);
  // }
  addVolunteer(item: VolunteerModule) {
    return this.http.post(this.BASE_URL, item).subscribe((res) => this.refreshData());
  }
  updateVolunteer(item: VolunteerModule){
    return this.http.put<number>(this.BASE_URL+item.volunteerCode, item).subscribe(() => this.refreshData());
  }
  deleteVolunteer(id: number): Observable<number> {
    return this.http.delete<number>(this.BASE_URL+id);
  }   
  refreshData(){
    this.getAllVolunteers().subscribe(x => this.volunteers = x);
    this.volunteers$=this.getAllVolunteers()
  }

 
}
