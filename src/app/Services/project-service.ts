import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModule } from '../Models/project/project-module';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  http = inject(HttpClient );
BASE_URL: string = 'https://localhost:7016/api/Project';
Projects$: Observable<ProjectModule[]>;
projects:ProjectModule[]=[];
  constructor() { 
    this.Projects$=this.getAllProjects()
  }
// --- מתודות CRUD ---
  getAllProjects(): Observable<ProjectModule[]> {
    return this.http.get<ProjectModule[]>(this.BASE_URL);
  }
  getProjectById(id:number): Observable<ProjectModule[]> {
    return this.http.get<ProjectModule[]>(this.BASE_URL +'/Get/'+id);
  }
  addProject(item: ProjectModule) {
    return this.http.post(this.BASE_URL, item).subscribe(() => this.refreshData());
  }
  updateProject(item: ProjectModule){
    return this.http.put<number>(this.BASE_URL+'Put/'+item.projectCode, item).subscribe(() => this.refreshData());
  }
 
  deleteProject(name: string): Observable<number> {
        return this.http.delete<number>(this.BASE_URL+'Delete/'+name);
  }

  existingProject(g: ProjectModule) {
    return this.projects.findIndex(x => x.projectCode == g.projectCode ) >= 0;
  }
   refreshData(){
    this.getAllProjects().subscribe(x => this.projects = x);
    this.Projects$ = this.getAllProjects()
  }

}


