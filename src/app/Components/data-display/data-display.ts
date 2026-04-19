import { Component, inject } from '@angular/core';
import { SubProjectModule } from '../../Models/sub-project/sub-project-module';
import { ProjectModule } from '../../Models/project/project-module';
import { SubProjectService } from '../../Services/sub-project-service';
import { ProjectService } from '../../Services/project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteeringService } from '../../Services/volunteering-service';

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
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectCode = this.route.snapshot.paramMap.get('id');
    this.projectName = this.route.snapshot.paramMap.get('name');
    this.ProjectService.getAllProjects().subscribe(x => {
      this.Projects = x
      this.filteredProjects = this.Projects.filter(sp => sp.domainCode?.toString() === this.projectCode);})

    this.subProjectService.getAllProjects().subscribe(x => {
      this.subProjects = x
      for(let sp of this.filteredProjects){
        this.filteredSubProjects = this.subProjects.filter(x => x.projectCode === sp.projectCode)
      }
      ;})}
    goToVolunteering(p:any){
    this.volunteeringSrv.setSelectedProject(Number(this.projectCode));

    this.volunteeringSrv.setSelectedSubProject(p.subProjectCode);
    this.router.navigate(['/v']);

  }}

