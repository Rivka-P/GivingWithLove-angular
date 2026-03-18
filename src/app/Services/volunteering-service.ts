import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VolunteeringModule } from '../Models/volunteering/volunteering/volunteering-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteeringService {
  http = inject(HttpClient );

BASE_URL: string =' https://localhost:7016/api/Volunteering';
volunteerings$: Observable<VolunteeringModule[]>;
volunteerings:VolunteeringModule[]=[];
  constructor() { 
    this.volunteerings$=this.getAllVolunteerings()
  }
// --- מתודות CRUD ---
  getAllVolunteerings(): Observable<VolunteeringModule[]> {
    return this.http.get<VolunteeringModule[]>(this.BASE_URL);
  }
  getVolunteeringById(id:number): Observable<VolunteeringModule[]> {
    return this.http.get<VolunteeringModule[]>(this.BASE_URL+id);
  }
  addVolunteering(item: VolunteeringModule) {
    return this.http.post(this.BASE_URL, item).subscribe(() => this.refreshData());
  }
  updateVolunteering(item: VolunteeringModule){
    return this.http.put<number>(this.BASE_URL+item.volunteeringCode, item).subscribe(() => this.refreshData());
  }
 
  deleteVolunteering(id: number): Observable<number> {
    return this.http.delete<number>(this.BASE_URL+id);
  }

  existingVolunteering(g: VolunteeringModule) {
    return this.volunteerings.findIndex(x => x.volunteeringCode == g.volunteeringCode ) >= 0;
  }
   refreshData(){
    this.getAllVolunteerings().subscribe(x => this.volunteerings = x);
    this.volunteerings$=this.getAllVolunteerings()
  }
}
