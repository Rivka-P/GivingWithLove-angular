import { Routes } from '@angular/router';
import { Volunteering } from './Components/volunteering/volunteering';
import { Volunteer } from './Components/volunteer/volunteer';
import { Project } from './Components/project/project';
import { Eicud } from './Components/eicud/eicud';
import { Position } from './Components/position/position';

export const routes: Routes = [ 
    // { path: '', redirectTo: 'v', pathMatch: 'full' },
    { path: 'v', component: Volunteering},
    { path: 'volunteer', component: Volunteer},
    { path: 'project', component: Project},
    { path:'eichud', component:Eicud},
    { path:'position', component:Position}

//     { path: '', redirectTo: 'home', pathMatch: 'full' },
//     { path: 'home', component: HomePage,
//     children:[
//     { path: 'login', component: Login },
//     { path: 'gifts', component: Gifts },
//     { path: 'edit', component: EditGift },
//     { path: 'donator', component: Donator },
//     { path: 'donatorFrm', component: DonatorForm },
//     { path: 'cart', component: Order },
//     { path: 'rand', component: Rand },
//     { path: 'allGifts', component: AllGifts },
//     { path: 'pay', component: Payment },
// ]}
//     , { path: '**', component: NotFound }
   
];

