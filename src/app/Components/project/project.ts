import { Component, inject } from '@angular/core';
import { ProjectModule } from '../../Models/project/project-module';
import { ProjectService } from '../../Services/project-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { VolunteerService } from '../../Services/volunteer-service';
import { ActivatedRoute } from '@angular/router';
import { SubProjectService } from '../../Services/sub-project-service';
import { SubProjectModule } from '../../Models/sub-project/sub-project-module';


@Component({
  selector: 'app-project',
  imports: [AsyncPipe,ReactiveFormsModule],
  templateUrl: './project.html',
  styleUrl: './project.scss'
})
export class Project {
vlntService: VolunteerService = inject(VolunteerService);
  projectsArr: ProjectModule[] = [];
  type: number = 0;
  projectService = inject(ProjectService)
  subProjectService = inject(SubProjectService)
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.projectService.getAllProjects().subscribe(res => { this.projectsArr = res })
    const code = this.route.snapshot.paramMap.get('type');
    this.type = code ? +code : 0;
  }
 
  frm = new FormGroup({
    // volunteeringCode: new FormControl<number | null>(null, Validators.required),
    projectName: new FormControl<string | null>(null, Validators.required),
    projectManagerCode: new FormControl<number | null>(null),
    domainCode: new FormControl<number | null>(null)
      });
      //הוספת תת תחום
    subProjectfrm = new FormGroup({
    projectCode: new FormControl<number | null>(null, Validators.required),
    subProjectName: new FormControl<string | null>(null, Validators.required),
    estimatedTime: new FormControl<number | null>(null),
    estimatedCost: new FormControl<number | null>(null)
      });

  // flags to control which form is visible
  showMainForm: boolean = true;
  showSubProjectForm: boolean = false;
  // store created project name for display in sub-project form (don't show code)
  createdProjectName: string | null = null;

  addProject() {
    let domainRaw = this.frm.value.domainCode as any;
    // handle select value "null" (string) coming from the template
    const domain = domainRaw === 'null' ? null : domainRaw;

    // אם נבחרו domainCode שקיימים (כלומר לא null) - ניצור פרויקט ואז נפתח טופס תת-פרויקט שמקושר לפרויקט הנוצר
    if (domain != null) {
      if (!this.frm.valid) return;
      const projectToCreate: any = {
        projectName: this.frm.value.projectName!,
        projectManagerCode: this.frm.value.projectManagerCode!,
        domainCode: this.frm.value.domainCode!,
      };
      // השתמש ב-Service שעכשיו מחזיר Observable<boolean>
      this.projectService.addProject(projectToCreate).subscribe(success => {
        if (success) {
          // נקבל את רשימת הפרויקטים המעודכנת ונחפש לפי השם/מאפיינים לקבלת הקוד
          this.projectService.getAllProjects().subscribe(list => {
            this.projectsArr = list;
            const created = this.projectsArr.find(p => p.projectName === projectToCreate.projectName && p.domainCode === projectToCreate.domainCode);
            const createdCode = created?.projectCode ?? null;
            this.createdProjectName = created?.projectName ?? projectToCreate.projectName;
            // prefill sub-project form with the created project code and name
            this.subProjectfrm.controls['projectCode'].setValue(createdCode);
            this.subProjectfrm.controls['subProjectName'].setValue(created?.projectName ?? projectToCreate.projectName);

            // swap forms
            this.showMainForm = false;
            this.showSubProjectForm = true;
          });
        } else {
          // במקרה של כישלון אפשר להוסיף טיפול בשגיאה
          console.error('Failed to create project');
        }
      });

      return;
    }

    // אחרת - הוספת פרויקט ראשי כמו שהיה
    if (this.frm.valid) {
      const project = {
        projectName: this.frm.value.projectName!,
        projectManagerCode: this.frm.value.projectManagerCode!,
        domainCode: this.frm.value.domainCode!,
      }
      this.projectService.addProject(project).subscribe();
    }

  }

  // שמירת תת-פרויקט
  addSubProject() {
    if (this.subProjectfrm.valid) {
      const sp: SubProjectModule = {
        projectCode: this.subProjectfrm.value.projectCode!,
        subProjectName: this.subProjectfrm.value.subProjectName!,
        estimatedTime: this.subProjectfrm.value.estimatedTime ?? undefined,
        estimatedCost: this.subProjectfrm.value.estimatedCost ?? undefined
      };
      this.subProjectService.addProject(sp);

      // לאחר שמירה - נחזיר את המשתמש לטופס הראשי (טופס חדש נקי)
      this.subProjectfrm.reset();
      this.frm.reset();
      this.showSubProjectForm = false;
      this.showMainForm = true;
      this.createdProjectName = null;

      // נעדכן רשימות אם צריך
      this.projectService.getAllProjects().subscribe(res => { this.projectsArr = res })
    }
  }

  cancelSubProject() {
    // החזר לטופס הראשי ללא שמירה
    this.subProjectfrm.reset();
    this.showSubProjectForm = false;
    this.showMainForm = true;
    this.createdProjectName = null;
  }
  deleteProject(p: ProjectModule) {
    this.projectService.deleteProject(p.projectName);

  }
  updateProject(p: ProjectModule) {
    this.projectService.updateProject(p);

  }
  getProject() {
    this.projectService.getAllProjects().subscribe(res => { this.projectsArr = res })

  }

}
