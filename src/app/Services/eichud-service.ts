import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {EichudModel}from '../Models/EichudModel';
import { Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EichudService {
  http = inject(HttpClient);
BASE_URL: string = 'https://localhost:7016/api/Eichud';
peopleInTheEichud:EichudModel[]=[];
peopleInTheEichud$:Observable<EichudModel[]>;
// constructor(){
//    this.peopleInTheEichud$=this.getAllEichud()
//    this.peopleInTheEichud = this.getAllEichud() as unknown as EichudModel[];
// }
  constructor() {
    // שמירת ה-Observable
    this.peopleInTheEichud$ = this.getAllEichud();
    if (!this.peopleInTheEichud$) {
      console.warn('Warning: The Observable for Eichud data is empty. Please check the API endpoint and data source.');
    }

    // הרשמה ל-Observable כדי לקבל את המערך בפועל
    this.peopleInTheEichud$.subscribe({
      next: (data: EichudModel[]) => {
        this.peopleInTheEichud = data;
      },
      error: (err) => {
        console.error('Error fetching Eichud data:', err);
      }
    });
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
  
//  refreshData() {
//   return this.getAllEichud().pipe(
//     tap(x => {
//       this.peopleInTheEichud = x;
//       this.peopleInTheEichud$ = of(x);
//     })
//   );
// }
}
