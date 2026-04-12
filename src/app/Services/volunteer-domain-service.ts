import { Directive, inject } from '@angular/core';
import { VolunteerDomainModule } from '../Models/volunteer-domain/volunteer-domain-module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appVolunteerDomainService]'
})
export class VolunteerDomainService {
http = inject(HttpClient );
BASE_URL: string = 'https://localhost:7016/api/VolunteerDomain';
volunteerDomains$: Observable<VolunteerDomainModule[]>;
volunteerDomains:VolunteerDomainModule[]=[];
  constructor() { 
    this.volunteerDomains$=this.getAllVolunteerDomain()
  }
// --- מתודות CRUD ---
  getAllVolunteerDomain(): Observable<VolunteerDomainModule[]> {
    return this.http.get<VolunteerDomainModule[]>(this.BASE_URL);
  }
  getVolunteerDomainById(id:number): Observable<VolunteerDomainModule[]> {
    return this.http.get<VolunteerDomainModule[]>(this.BASE_URL+id);
  }
  addVolunteerDomain(item: VolunteerDomainModule) {
    return this.http.post(this.BASE_URL, item).subscribe(() => this.refreshData());
  }
  updateVolunteerDomain(item: VolunteerDomainModule){
    return this.http.put<number>(this.BASE_URL+item.volunteerDomainsCode, item).subscribe(() => this.refreshData());
  }
 
  deleteVolunteerDomain(id: number): Observable<number> {
    return this.http.delete<number>(this.BASE_URL+id);
  }

  existingVolunteerDomain(g: VolunteerDomainModule) {
    return this.volunteerDomains.findIndex(x => x.volunteerDomainsCode == g.volunteerDomainsCode ) >= 0;
  }
   refreshData(){
    this.getAllVolunteerDomain().subscribe(x => this.volunteerDomains = x);
    this.volunteerDomains$=this.getAllVolunteerDomain()
  }

}

