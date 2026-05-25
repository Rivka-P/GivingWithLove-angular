import { Component, inject, OnInit } from '@angular/core';
import { VolunteerModule } from '../../../Models/volunteer/volunteer-module';
import { VolunteeringModule } from '../../../Models/volunteering/volunteering/volunteering-module';
import { VolunteeringService } from '../../../Services/volunteering-service';
import { VolunteerService } from '../../../Services/volunteer-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VolunteerDomain } from '../../volunteer-domain/volunteer-domain';
import { ChartModule } from 'primeng/chart';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { I } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.html',
    standalone: true,

  imports: [
    ReactiveFormsModule,
    CommonModule,
    ScrollingModule,
    RouterModule,
    ChartModule,
    MatIconModule 
  ],
  styleUrls: ['./volunteer-details.scss']
})
export class VolunteerDetails implements OnInit {
  // dialogRef!: MatDialogRef<VolunteerDetails>;
  constructor(
  private volunteerService: VolunteerService,
  private volunteeringService: VolunteeringService,
  public dialogRef: MatDialogRef<VolunteerDetails>
) {}
  
data=inject(MAT_DIALOG_DATA) as { volunteerCode: string };
  // constructor(
  //   private volunteerService: VolunteerService,
  //   private volunteeringService: VolunteeringService,
    
  //   @Inject(MAT_DIALOG_DATA) public data: { volunteerCode: string }
  // ) {}

  volunteer!: VolunteerModule;
  volunteerings: VolunteeringModule[] = [];

  // נתונים ל-PrimeNG Pie Chart
  public pieChartDataForPrime: any;
  public pieChartOptions: any = { responsive: true };



  close() {
    console.log("CLOSE DI");  
    this.dialogRef.close();
  }




public barChartDataForPrime: any;
  public barChartOptionsForPrime: any = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };


  // constructor(
  //   private volunteerService: VolunteerService,
  //   private volunteeringService: VolunteeringService
  // ) {}

 async ngOnInit() {
const volunteerCode = this.data.volunteerCode; // משתמשים בנתונים שהתקבלו
console.log(volunteerCode + " in volunteer details");

// const volunteerCode = this.volunteerService.volunteerCodeInS;

    if (!volunteerCode) {
      
        console.error('volunteerCode not set yet');
        return;
    }
    if(this.volunteerService.volunteers.length!==0){
      console.log("Finding volunteer in list:", volunteerCode);
      
      this.volunteer = this.volunteerService.volunteers.find(v => v.volunteerCode === Number(volunteerCode))!;
    }
else{
    console.log("Finding volunteer from API:", volunteerCode);
   await this.volunteerService.getVolunteerById(Number(volunteerCode)).subscribe(res => {
        this.volunteer = res;
    });
}
    if (!this.volunteer) {
      console.error('Volunteer not found for code', volunteerCode);
      return;
    }

    if(this.volunteeringService.volunteerings.length!==0){
      console.log("Filtering volunteerings from list for code:", volunteerCode);
      
      this.volunteerings = this.volunteeringService.volunteerings
            .filter(v => v.volunteerCode === Number(volunteerCode))
            .sort((a, b) => new Date(a.dateOfVolunteering).getTime() - new Date(b.dateOfVolunteering).getTime());
      
       this.processPieChart();
        this.processBarChart();
    }
    else{
      console.log("Fetching all volunteerings for code from API:", volunteerCode);

   await this.volunteeringService.getAllVolunteerings().subscribe(allVols => {
        this.volunteerings = allVols
            .filter(v => v.volunteerCode === Number(volunteerCode))
            .sort((a, b) => new Date(a.dateOfVolunteering).getTime() - new Date(b.dateOfVolunteering).getTime());

    // const volunteerCode = this.volunteerService.volunteerCodeInS;
    // if (!volunteerCode) return;

    // this.volunteerService.getVolunteerById(volunteerCode).subscribe(res => {
    //   this.volunteer = res;
    // });

    // this.volunteeringService.getAllVolunteerings().subscribe(allVols => {
    //   this.volunteerings = allVols
    //     .filter(v => v.volunteerCode === volunteerCode)
    //     .sort((a, b) => new Date(a.dateOfVolunteering).getTime() - new Date(b.dateOfVolunteering).getTime());
 this.processPieChart();
        this.processBarChart();
    });}
        
  }

  processPieChart() {

    
    console.log(this.dialogRef);
    
    const domainMap: { [key: string]: number } = {};



    
    if (this.volunteer.volunteerDomains) {
      this.volunteer.volunteerDomains.forEach(d => {
        const name = d?.volunteerDomainsCode || 'לא מוגדר';
        domainMap[name] = (domainMap[name] || 0) + 1;
      });
    }

    this.pieChartDataForPrime = {
      labels: Object.keys(domainMap),
      datasets: [
        {
          data: Object.values(domainMap),
         backgroundColor: [
  '#00e5ff',
  '#00bcd4',
  '#26c6da',
  '#4dd0e1',
  '#80deea',
  '#0097a7',
  '#4fc3f7'
],
borderColor: '#071a22',
borderWidth: 2,
hoverOffset: 12
        }
      ]
    };
  }
   processBarChart() {
    console.log("Processing bar chart with volunteerings:", this.volunteerings);
    
    const monthMap: { [key: string]: number } = {};
    this.volunteerings.forEach(v => {
      const month = new Date(v.dateOfVolunteering).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });

    this.barChartDataForPrime = {
      labels: Object.keys(monthMap).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()),
      datasets: [
        {
          label: 'התנדבויות לפי חודשים',
          data: Object.values(monthMap),
          backgroundColor: '#42A5F5'
        }
      ]
    };
  
}
}


// import { Component, OnInit } from '@angular/core';
// import { VolunteerModule } from '../../../Models/volunteer/volunteer-module';
// import { VolunteeringModule } from '../../../Models/volunteering/volunteering/volunteering-module';

// // גרפים ng2-charts v9
// import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

// // אנימציות
// import { trigger, transition, style, animate } from '@angular/animations';
// import { VolunteeringService } from '../../../Services/volunteering-service';
// import { VolunteerService } from '../../../Services/volunteer-service';
// import { AsyncPipe, CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { ScrollingModule } from '@angular/cdk/scrolling';
// import { VolunteerDomain } from '../../volunteer-domain/volunteer-domain';
// import { ChartModule } from 'primeng/chart';




// @Component({
//   selector: 'app-volunteer-details',
//   templateUrl: './volunteer-details.html',
//    imports: [AsyncPipe,ReactiveFormsModule, CommonModule,VolunteerDomain,ScrollingModule,RouterModule,ChartModule],
//   styleUrls: ['./volunteer-details.scss'],
//   animations: [
//     trigger('fadeIn', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(-20px)' }),
//         animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
//       ])
//     ])
//   ]
// },
// //   imports: [
// //     CommonModule,
// //     ReactiveFormsModule

// //   ]
// // }
// )
// export class VolunteerDetails implements OnInit {
//   volunteer!: VolunteerModule;
//   volunteerings: VolunteeringModule[] = [];

//   // גרף חודשי
//   public barChartOptions: ChartOptions = { responsive: true };
//   public barChartLabels: string[] = [];
//   public barChartType: ChartType = 'bar';
//   public barChartLegend = true;
//   public barChartData: ChartDataset<'bar'>[] = [{ data: [], label: 'התנדבויות לפי חודשים' }];

//   // גרף פאי לפי תחומים
//   public pieChartLabels: string[] = [];
//   public pieChartData: number[] = [];
//   public pieChartType: ChartType = 'pie';
//   public pieChartOptions: ChartOptions = { responsive: true };

//   constructor(
//     private volunteerService: VolunteerService,
//     private volunteeringService: VolunteeringService
//   ) { }




//   ngOnInit(): void {
//     const volunteerCode = this.volunteerService.volunteerCodeInS;

//     if (!volunteerCode) {
//         console.error('volunteerCode not set yet');
//         return;
//     }

//     this.volunteerService.getVolunteerById(volunteerCode).subscribe(res => {
//         this.volunteer = res;
//     });

//     this.volunteeringService.getAllVolunteerings().subscribe(allVols => {
//         this.volunteerings = allVols
//             .filter(v => v.volunteerCode === volunteerCode)
//             .sort((a, b) => new Date(a.dateOfVolunteering).getTime() - new Date(b.dateOfVolunteering).getTime());

//         this.processBarChart();
//         this.processPieChart();
//     });
// }

//   processBarChart() {
//     const monthMap: { [key: string]: number } = {};
//     this.volunteerings.forEach(v => {
//       const month = new Date(v.dateOfVolunteering).toLocaleString('default', { month: 'short', year: 'numeric' });
//       monthMap[month] = (monthMap[month] || 0) + 1;
//     });
//     this.barChartLabels = Object.keys(monthMap).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
//     this.barChartData[0].data = Object.values(monthMap);
//   }

//   processPieChart() {
//     const domainMap: { [key: string]: number } = {};
//     if (this.volunteer.volunteerDomains) {
//       this.volunteer.volunteerDomains.forEach(d => {
//         const name = d?.volunteerDomainsCode || 'לא מוגדר'; // השתמשי בשם תחום ולא בקוד מתנדב
//         domainMap[name] = (domainMap[name] || 0) + 1;
//       });
//     }
//     this.pieChartLabels = Object.keys(domainMap);
//     this.pieChartData = Object.values(domainMap);
//   }
// }

// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule, AsyncPipe } from '@angular/common';
// // import { ReactiveFormsModule } from '@angular/forms';
// // import { RouterModule } from '@angular/router';
// // import { ScrollingModule } from '@angular/cdk/scrolling';

// // import { NgChartsModule } from 'ng2-charts';
// // import { ChartOptions, ChartType } from 'chart.js';

// // import { VolunteerService } from '../../../Services/volunteer-service';
// // import { VolunteeringService } from '../../../Services/volunteering-service';
// // import { VolunteerModule } from '../../../Models/volunteer/volunteer-module';
// // import { VolunteeringModule } from '../../../Models/volunteering/volunteering/volunteering-module';

// // import { trigger, transition, style, animate } from '@angular/animations';
// // import { VolunteerDomain } from '../../volunteer-domain/volunteer-domain';

// // @Component({
// //   selector: 'app-volunteer-details',
// //   templateUrl: './volunteer-details.html',
// //   styleUrls: ['./volunteer-details.scss'],
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     AsyncPipe,
// //     ReactiveFormsModule,
// //     RouterModule,
// //     ScrollingModule,
// //     VolunteerDomain,
// //   NgChartsModule  
// //   ],
// //   animations: [
// //     trigger('fadeIn', [
// //       transition(':enter', [
// //         style({ opacity: 0, transform: 'translateY(-20px)' }),
// //         animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
// //       ])
// //     ])
// //   ]
// // })
// // export class VolunteerDetails implements OnInit {

// //   volunteer: VolunteerModule | undefined;
// //   volunteerings: VolunteeringModule[] = [];

// //   // PieChart variables
// //   pieChartOptions: ChartOptions<'pie'> = { responsive: true };
// //   pieChartLabels: string[] = [];
// //   pieChartData: number[] = [];
// //   pieChartType: ChartType = 'pie';

// //   constructor(
// //     private volunteerService: VolunteerService,
// //     private volunteeringService: VolunteeringService
// //   ) {}

// //   ngOnInit(): void {
// //     const volunteerCode = this.volunteerService.volunteerCodeInS;

// //     if (volunteerCode) {
// //       // Fetch volunteer details
// //       this.volunteerService.getVolunteerById(volunteerCode).subscribe({
// //         next: res => this.volunteer = res[0],
// //         error: err => console.error('Error fetching volunteer:', err)
// //       });

// //       // Fetch volunteerings
// //       this.volunteeringService.getAllVolunteerings().subscribe({
// //         next: allVols => {
// //           this.volunteerings = allVols
// //             .filter(v => v.volunteerCode === volunteerCode)
// //             .sort((a, b) => new Date(a.dateOfVolunteering).getTime() - new Date(b.dateOfVolunteering).getTime());
          
// //           this.preparePieChart();
// //         },
// //         error: err => console.error('Error fetching volunteerings:', err)
// //       });
// //     }
// //   }

// //   private preparePieChart(): void {
// //     const categoryMap: Record<string, number> = {};

// //     this.volunteerings.forEach(v => {
// //       const cat = v.category || 'אחר';
// //       categoryMap[cat] = (categoryMap[cat] || 0) + 1;
// //     });

// //     this.pieChartLabels = Object.keys(categoryMap);
// //     this.pieChartData = Object.values(categoryMap);
// //   }
// // }

//   // ngOnInit(): void {
//   //   const volunteerCode = this.volunteerService.volunteerCodeInS;
//   //   if (volunteerCode) {
//   //     this.volunteerService.getVolunteerById(volunteerCode).subscribe(res => {
//   //       if (res && res.length > 0) {
//   //         this.volunteer = res[0];
//   //       } else {
//   //         console.error('No volunteer found for ID', volunteerCode);
//   //       }
//   //     });

//   //     this.volunteeringService.getAllVolunteerings().subscribe(allVols => {
//   //       // סינון ההתנדבויות של המתנדב הזה
//   //        this.volunteerings = allVols
//   // .filter(v => v.volunteerCode === volunteerCode)
//   // .sort((a, b) => new Date(a.dateOfVolunteering).getTime() - new Date(b.dateOfVolunteering).getTime());
//   //       this.processBarChart();
//   //       this.processPieChart();
//   //     });
//   //   }



//   // }

//  private async loadVolunteerData() {
//     const volunteerCode = this.data.volunteerCode; // משתמשים בנתונים שהתקבלו

//     if (!volunteerCode) {
//       console.error('volunteerCode not set yet');
//       return;
//     }

//     // שליפת המתנדב
//     this.volunteerService.getVolunteerById(Number(volunteerCode)).subscribe(res => {
//       this.volunteer = res;
//       this.processPieChart();
//     });

//     // שליפת ההתנדבויות
//     this.volunteeringService.getAllVolunteerings().subscribe(allVols => {
//       this.volunteerings = allVols
//         .filter(v => v.volunteerCode === Number(volunteerCode))
//         .sort((a, b) => new Date(a.dateOfVolunteering).getTime() - new Date(b.dateOfVolunteering).getTime());

//       this.processBarChart();
//     });
//   }
