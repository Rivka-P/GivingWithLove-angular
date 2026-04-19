import { Component, inject } from '@angular/core';
import { SubProjectModule } from '../../Models/sub-project/sub-project-module';
import { ProjectModule } from '../../Models/project/project-module';
import { SubProjectService } from '../../Services/sub-project-service';
import { ProjectService } from '../../Services/project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteeringService } from '../../Services/volunteering-service';
import { VolunteerService } from '../../Services/volunteer-service';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';

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
  volunteeringArr:VolunteeringModule[]=[]
  vm:any=undefined
  volunteerSrv=inject(VolunteerService)
  estimatedTime:number=0;
  estimatedCost:number=0;
  subProject?: SubProjectModule;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  this.projectCode = this.route.snapshot.paramMap.get('id');
  this.projectName = this.route.snapshot.paramMap.get('name');

  this.ProjectService.getAllProjects().subscribe(projects => {
    this.Projects = projects;

    this.filteredProjects = this.Projects.filter(
      sp => sp.domainCode?.toString() === this.projectCode
    );

    this.subProjectService.getAllProjects().subscribe(subs => {
      this.subProjects = subs;

      this.filteredSubProjects = this.subProjects.filter(sp =>
        this.filteredProjects.some(fp => fp.projectCode === sp.projectCode)
      );
this.volunteerSrv.refreshData();
      this.volunteeringSrv.getAllVolunteerings().subscribe(vols => {
        this.volunteeringArr = vols;
        this.calcCost();
        this.calcTime();
      });
    });
  });
}
   
 calcCost = () => {
  this.estimatedCost = 0;

  for (let index = 0; index < this.volunteeringArr.length; index++) {
    const vm = this.volunteeringArr[index]?.subProjectCode;

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

  for (let index = 0; index < this.volunteeringArr.length; index++) {
    const vm = this.volunteeringArr[index]?.subProjectCode;

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
