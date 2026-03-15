import { Routes } from '@angular/router';
import { Volunteering } from './Components/volunteering/volunteering';
import { Volunteer } from './Components/volunteer/volunteer';

export const routes: Routes = [ 
    // { path: '', redirectTo: 'v', pathMatch: 'full' },
    { path: 'v', component: Volunteering},
    { path: 'volunteer', component: Volunteer}
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

