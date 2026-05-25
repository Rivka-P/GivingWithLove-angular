import { inject, Injectable } from '@angular/core';
import { VolunteerModule } from '../Models/volunteer/volunteer-module';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  BASE_URL: string ='https://localhost:7016/api/Volunteer';
  http = inject(HttpClient);
  currentUser?:VolunteerModule
  isVolunteerLoggedIn:boolean = false
  volunteers$!: Observable<VolunteerModule[]>;
  volunteers:VolunteerModule[]=[];

    volunteerCodeInS?:number 
  setSelectedVolunteer(volunteerCode: number) {
    this.volunteerCodeInS = volunteerCode;
  }
  // volunterrDomain:

  userPosition?:string;//מה התפקיד של המשתמש הנוכחי


  loading$ = new BehaviorSubject<boolean>(false);
    constructor() { 
      this.volunteers$=this.getAllVolunteers()
      this.volunteers$.subscribe(x => this.volunteers = x);

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
 refreshData() {
  this.loading$.next(true);

  this.getAllVolunteers().subscribe(x => {
    this.volunteers = x;
    this.volunteers$ = new BehaviorSubject(x).asObservable(); // או פשוט שימוש ישיר
    this.loading$.next(false);
  });
}


setCurrentUser(password:number){
    this.currentUser = this.volunteers.find(x => x.volunteerCode == password)
    this.isVolunteerLoggedIn = true
   
  }


}
