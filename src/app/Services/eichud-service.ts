import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {EichudModel}from 'd:/RivkyPinter/GWL_Project/GivingWithLove-angular/src/app/Models/EichudModel'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EichudService {
  http = inject(HttpClient);
BASE_URL: string = 'https://localhost:7016/api/Eichud';
peopleInTheEichud:EichudModel[]=[];
peopleInTheEichud$:Observable<EichudModel[]>;
constructor(){
   this.peopleInTheEichud$=this.getAllEichud()
}
// --- מתודות CRUD ---
  getAllEichud(): Observable<EichudModel[]> {
    return this.http.get<EichudModel[]>(this.BASE_URL);
  }
  getPersonById(id:number): Observable<EichudModel[]> {
    return this.http.get<EichudModel[]>(this.BASE_URL+id);
  }
  addPerson(item: EichudModel) {
    return this.http.post(this.BASE_URL,item).subscribe(() => this.refreshData());
  }
  updatePerson(item: EichudModel){
    return this.http.put<number>(this.BASE_URL+item.eichudCode, item).subscribe(() => this.refreshData());
  }
 
  deletePerson(id:number): Observable<number> {
    return this.http.delete<number>(this.BASE_URL+id);
  }
   refreshData(){
    this.getAllEichud().subscribe(x => this.peopleInTheEichud = x);
     this.peopleInTheEichud$=this.getAllEichud()
  }

}
