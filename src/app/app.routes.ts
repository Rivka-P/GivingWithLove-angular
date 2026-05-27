// import { Routes } from '@angular/router';
// import { Volunteering } from './Components/volunteering/volunteering';
// import { Volunteer } from './Components/volunteer/volunteer';
// import { Project } from './Components/project/project';
// import { Eicud } from './Components/eicud/eicud';
// import { Position } from './Components/position/position';

// import { AllVolunteers } from './Components/volunteer/all-volunteers/all-volunteers';
// import { AddVolunteer } from './Components/volunteer/add-volunteer/add-volunteer';
// import { VolunteerDetails } from './Components/volunteer/volunteer-details/volunteer-details';
// import { HomePage } from './Components/home-page/home-page';


// import { LogIn } from './Components/log-in/log-in';
// import { VolunteerDomain } from './Components/volunteer-domain/volunteer-domain';
// import { Domains } from './Components/domains/domains';
// import { SubProject } from './Components/sub-project/sub-project';
// import { DataDisplay } from './Components/data-display/data-display';
// import { MidData } from './Components/mid-data/mid-data';
// import { DeepDataDisplay } from './Components/deep-data-display/deep-data-display';


// export const routes: Routes = [ 
//     { path: '', redirectTo: 'home', pathMatch: 'full' },

//     { path:'home', component:HomePage},
//     { path: 'v', component: Volunteering},

//     { path: 'volunteer', component: Volunteer, children:[
//         {path: '', redirectTo: 'allvolunteers', pathMatch: 'full' },
//         {path:'allvolunteers',component:AllVolunteers,children:[
//             {path:'volunteer-details',component:VolunteerDetails}
//         ]},
//         {path:'addvolunteer',component:AddVolunteer }

//     ]},
//     { path: 'project', component: Project},
//     { path:'eichud', component:Eicud},
//     { path:'position', component:Position},
//     { path:'', component:HomePage},



//      { path:'data', component:DataDisplay},
//      { path:'midData/:code', component:MidData},
//      { path:'deepDataDisplay/:code', component:DeepDataDisplay},

//     { path:'login', component:LogIn},
//     { path:'domain', component:Domains,
//     children:[
//        {path: 'project', component: Project} ,
//       { path: 'sub/:id/:name', component: SubProject },

//     ]
// }

// ];
import { Routes } from '@angular/router';
import { Volunteering } from './Components/volunteering/volunteering';
import { Volunteer } from './Components/volunteer/volunteer';
import { Project } from './Components/project/project';
import { Eicud } from './Components/eicud/eicud';
import { Position } from './Components/position/position';

import { AllVolunteers } from './Components/volunteer/all-volunteers/all-volunteers';
import { AddVolunteer } from './Components/volunteer/add-volunteer/add-volunteer';
import { VolunteerDetails } from './Components/volunteer/volunteer-details/volunteer-details';
import { HomePage } from './Components/home-page/home-page';


import { LogIn } from './Components/log-in/log-in';
import { VolunteerDomain } from './Components/volunteer-domain/volunteer-domain';
import { Domains } from './Components/domains/domains';
import { SubProject } from './Components/sub-project/sub-project';
import { DataDisplay } from './Components/data-display/data-display';
import { MidData } from './Components/mid-data/mid-data';
import { DeepDataDisplay } from './Components/deep-data-display/deep-data-display';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'v', component: Volunteering },

    {
        path: 'volunteer', component: Volunteer, children: [
            { path: '', redirectTo: 'allvolunteers', pathMatch: 'full' },
            {
                path: 'allvolunteers', component: AllVolunteers, children: [
                    { path: 'volunteer-details', component: VolunteerDetails }
                ]
            },
            {
                path: 'addvolunteer/add',
                component: AddVolunteer
            },
            {
                path: 'addvolunteer/edit/:id',
                component: AddVolunteer
            }

        ]
    },
    { path: 'project', component: Project },
    { path: 'eichud', component: Eicud },
    { path: 'position', component: Position },
    { path: '', component: HomePage },
         { path:'midData/:code', component:MidData},
     { path:'deepDataDisplay/:code', component:DeepDataDisplay},



    { path: 'data', component: DataDisplay },


    { path: 'login', component: LogIn },
    {
        path: 'domain', component: Domains,
        children: [
            { path: 'project', component: Project },
            { path: 'sub/:id/:name', component: SubProject },
        ]
    }

];






