import { Component, inject } from '@angular/core';
import { SubProjectModule } from '../../Models/sub-project/sub-project-module';
import { ProjectModule } from '../../Models/project/project-module';
import { SubProjectService } from '../../Services/sub-project-service';
import { ProjectService } from '../../Services/project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteeringService } from '../../Services/volunteering-service';
import { VolunteerService } from '../../Services/volunteer-service';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-data-display',
  imports: [],
  templateUrl: './data-display.html',
  styleUrl: './data-display.scss',
})
export class DataDisplay {
filteredSubProjects: SubProjectModule[] = [];
  filteredProjects: ProjectModule[] = [];
  Projects: ProjectModule[] = [];
  subProjects: SubProjectModule[] = [];
  ProjectService = inject(ProjectService)
  subProjectService = inject(SubProjectService)
  projectCode!: string | null;
  projectName!: string | null;
  router=inject(Router)
  flag:boolean=false
  volunteeringSrv=inject(VolunteeringService)
  vm:any=undefined
  volunteerSrv=inject(VolunteerService)
  estimatedTime:number=0;
  estimatedCost:number=0;
  subProject?: SubProjectModule;

  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
    this.projectCode = this.route.snapshot.paramMap.get('id');
    this.projectName = this.route.snapshot.paramMap.get('name');

    this.Projects = await lastValueFrom(this.ProjectService.getAllProjects());
    console.log('Projects:', this.Projects);
    this.filteredProjects = this.Projects.filter(
      sp => sp.domainCode?.toString() === this.projectCode
    );
    console.log('filteredProjects:', this.filteredProjects);

    this.subProjects = await lastValueFrom(this.subProjectService.getAllProjects());
    console.log('subProjects:', this.subProjects);
    this.filteredSubProjects = this.subProjects.filter(sp =>
      this.filteredProjects.some(fp => fp.projectCode === sp.projectCode)
    );
    console.log('filteredSubProjects:', this.filteredSubProjects);

    await this.volunteerSrv.refreshData();
    console.log('volunteerSrv.refreshData finished');
    await lastValueFrom(this.volunteeringSrv.getAllVolunteerings());
    this.calcCost();
    this.calcTime();
  }
   
 calcCost = () => {
  this.estimatedCost = 0;

  for (let index = 0; index < this.volunteeringSrv.volunteerings.length; index++) {
    const vm =this.volunteeringSrv.volunteerings[index]?.subProjectCode;

    if (vm !== undefined) {
      const project = this.subProjects.find(
        x => x.subProjectCode === vm
      );

      if (project) {
        this.estimatedCost += Number(project.estimatedCost);
      }
    }
  }

  console.log(this.estimatedCost);
}
calcTime = () => {
  this.estimatedTime = 0;

  for (let index = 0; index <this.volunteeringSrv.volunteerings.length; index++) {
    const vm = this.volunteeringSrv.volunteerings[index]?.subProjectCode;

    if (vm !== undefined) {
      const project = this.subProjects.find(
        x => x.subProjectCode === vm
      );

      if (project) {
        this.estimatedTime += Number(project.estimatedTime);
      }
    }
  }
this.estimatedTime = this.estimatedTime / 60
  console.log(this.estimatedTime);
}
}
