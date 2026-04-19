import { Routes } from '@angular/router';
import { Volunteering } from './Components/volunteering/volunteering';
import { Volunteer } from './Components/volunteer/volunteer';
import { Project } from './Components/project/project';
import { Eicud } from './Components/eicud/eicud';
import { Position } from './Components/position/position';
import { HomePage } from './Components/home-page/home-page';
import { LogIn } from './Components/log-in/log-in';
import { VolunteerDomain } from './Components/volunteer-domain/volunteer-domain';
import { Domains } from './Components/domains/domains';
import { SubProject } from './Components/sub-project/sub-project';
import { DataDisplay } from './Components/data-display/data-display';

export const routes: Routes = [ 
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component:HomePage},
    { path: 'v', component: Volunteering},
    { path: 'volunteer', component: Volunteer},
     { path:'data', component:DataDisplay},
    { path:'eichud', component:Eicud},
    { path:'position', component:Position},
    { path:'login', component:LogIn},
    { path:'domain', component:Domains,
    children:[
       {path: 'project', component: Project} ,
      { path: 'sub/:id/:name', component: SubProject },
    ]
}
];

