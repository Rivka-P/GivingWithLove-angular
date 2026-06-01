import { VolunteeringService } from '../../Services/volunteering-service';
import { EichudModel } from '../../Models/EichudModel';

import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerModule } from '../../Models/volunteer/volunteer-module';
import { VolunteerService } from '../../Services/volunteer-service';
import { EichudService } from '../../Services/eichud-service';
import { DataView } from 'primeng/dataview';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { ProjectService } from '../../Services/project-service';
import { ProjectModule } from '../../Models/project/project-module';
import { SubProjectService } from '../../Services/sub-project-service';
import { SubProjectModule } from '../../Models/sub-project/sub-project-module';
import { lastValueFrom } from 'rxjs';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { Component, inject } from '@angular/core';
import { VolunteeringModule } from '../../Models/volunteering/volunteering/volunteering-module';
import { NO_ERRORS_SCHEMA, SECURITY_SCHEMA } from '@angular/compiler';
import { HebcalService } from '../../Services/hebcal.service';

@Component({
  selector: 'app-volunteering',
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './volunteering.html',
  styleUrl: './volunteering.scss'
})
export class Volunteering {
  projectService = inject(ProjectService)
  projectsArr: ProjectModule[] = [];
  subProjectService = inject(SubProjectService)
  subProjects: SubProjectModule[] = [];
  filteredSubProjects: SubProjectModule[] = []; // מאגר ה-subProjects המותאם לפי projectCode
  // poorManService = inject(EichudService)
  volunteeringArr: VolunteeringModule[] = [];
  volunteerArr: VolunteerModule[] = []//מערך מתנדבים
  volunteeringService = inject(VolunteeringService)
  volunteerService = inject(VolunteerService)
  ecdService = inject(EichudService)
  hebcalService = inject(HebcalService)

  // Hebrew months: display (he) and underlying english value (en) for API
  hebMonths: Array<{en: string, he: string}> = [
    { en: 'Nisan', he: 'ניסן' },
    { en: 'Iyar', he: 'אייר' },
    { en: 'Sivan', he: 'סיון' },
    { en: 'Tammuz', he: 'תמוז' },
    { en: 'Av', he: 'אב' },
    { en: 'Elul', he: 'אלול' },
    { en: 'Tishri', he: 'תשרי' },
    { en: 'Cheshvan', he: 'חשוון' },
    { en: 'Kislev', he: 'כסלו' },
    { en: 'Tevet', he: 'טבת' },
    { en: 'Shevat', he: 'שבט' },
    { en: 'Adar', he: 'אדר' },
    { en: 'Adar II', he: 'אדר ב׳' }
  ];

  // days numeric values (1..30) and labels will be generated in ngOnInit
  hebDays: number[] = Array.from({length: 30}, (_, i) => i + 1);
  hebDayOptions: Array<{value:number,label:string}> = [];
  hebYears: number[] = [];
  hebYearOptions: Array<{value:number,label:string}> = [];

  convertedIso: string | null = null;
  convertError: string | null = null;

  vlntrFrm = new FormGroup({
    // dateOfVolunteering will hold the ISO gregorian date (filled after conversion)
    dateOfVolunteering: new FormControl<string | null>(null, Validators.required),

    // Hebrew inputs for user selection
    hebDay: new FormControl<number | null>(null, Validators.required),
    hebMonth: new FormControl<string | null>(null, Validators.required),
    hebYear: new FormControl<number | null>(null, Validators.required),

    volunteerCode: new FormControl<number | null>(this.volunteeringService.volunteerCodeInS ? this.volunteeringService.volunteerCodeInS : null, Validators.required),
    poorManCode: new FormControl<number | null>(this.volunteeringService.poorManCodeInS ? this.volunteeringService.poorManCodeInS : null, Validators.required),
    matcherCode: new FormControl<number | null>(this.volunteeringService.matcherCodeInS ? this.volunteeringService.matcherCodeInS : null, Validators.required),
    projectCode: new FormControl<number | null>(this.volunteeringService.projectCodeInS ? this.volunteeringService.projectCodeInS : null),
    subProjectCode: new FormControl<number | null>(this.volunteeringService.subProjectCodeInS ? this.volunteeringService.subProjectCodeInS : null)

  });

  // Helper: map number to Hebrew letters (small scope up to 999)
  private numberToHebrewLetters(n: number): string {
    const ones: any = {1:'א',2:'ב',3:'ג',4:'ד',5:'ה',6:'ו',7:'ז',8:'ח',9:'ט'};
    const tens: any = {10:'י',20:'כ',30:'ל',40:'מ',50:'נ',60:'ס',70:'ע',80:'פ',90:'צ'};
    const hundreds: any = {100:'ק',200:'ר',300:'ש',400:'ת'};

    let res = '';
    // hundreds
    let rem = n;
    if (rem >= 400) {
      const count400 = Math.floor(rem / 400);
      for (let i=0;i<count400;i++) res += 'ת';
      rem = rem % 400;
    }
    // 100..300
    const hKeys = [300,200,100];
    for (const hk of hKeys) {
      if (rem >= hk) { res += hundreds[hk]; rem -= hk; }
    }
    // tens
    const tKeys = [90,80,70,60,50,40,30,20,10];
    for (const tk of tKeys) {
      if (rem >= tk) { res += tens[tk]; rem -= tk; }
    }
    // ones
    if (rem >= 1 && rem <= 9) {
      res += ones[rem];
      rem = 0;
    }
    return res || '';
  }

  // public helper to render day labels (with special 15/16 and gershayim)
  numberToHebrewNumeral(n: number): string {
    if (n === 15) return 'ט׳ו'.replace("'", ''); // we'll use proper geresh/gershayim below
    if (n === 16) return 'ט׳ז'.replace("'", '');
    const letters = this.numberToHebrewLetters(n);
    if (!letters) return String(n);
    if (letters.length === 1) return letters;
    // insert gershayim before last char
    return letters.slice(0, -1) + '״' + letters.slice(-1);
  }

  // convert full hebrew year number to short form (e.g., 5786 -> תשפ"ו)
  numberToHebrewYearShort(year: number): string {
    const short = year % 1000; // drop thousands
    const letters = this.numberToHebrewLetters(short);
    if (!letters) return String(year);
    if (letters.length === 1) return letters; // unlikely
    return letters.slice(0, -1) + '״' + letters.slice(-1);
  }

  async ngOnInit() {
    // prepare day labels
    this.hebDayOptions = this.hebDays.map(d => ({ value: d, label: this.numberToHebrewNumeral(d) }));

    const today = new Date();

    const formatted =
      today.getFullYear() +
      '-' +
      String(today.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(today.getDate()).padStart(2, '0');

    // Default ISO date (keeps previous behavior until user chooses Hebrew date)
    this.vlntrFrm.patchValue({
      dateOfVolunteering: formatted,
      volunteerCode: this.volunteeringService.volunteerCodeInS ,
      poorManCode: this.volunteeringService.poorManCodeInS ,
      matcherCode: this.volunteeringService.matcherCodeInS ,
      projectCode: this.volunteeringService.projectCodeInS ,
      subProjectCode: this.volunteeringService.subProjectCodeInS 
    });

    // Prepare hebrew years range using HebcalService to get current hebrew month/year
    try {
      const monthYearStr = await lastValueFrom(this.hebcalService.getHebrewMonthForIso(formatted));
      // Try to extract year as last numeric token
      const tokens = monthYearStr.toString().trim().split(/\s+/);
      let parsedYear: number | null = null;
      for (let i = tokens.length - 1; i >= 0; i--) {
        const t = tokens[i].replace(/[^0-9]/g, '');
        const num = parseInt(t, 10);
        if (!isNaN(num) && num > 1000) { parsedYear = num; break; }
      }
      const currentHebYear = parsedYear ?? (today.getFullYear() + 3760);
      const start = currentHebYear - 5;
      const end = currentHebYear + 1;
      this.hebYears = [];
      for (let y = start; y <= end; y++) this.hebYears.push(y);

      // build year options with labels
      this.hebYearOptions = this.hebYears.map(y => ({ value: y, label: this.numberToHebrewYearShort(y) }));

      // set defaults: hebYear = currentHebYear
      this.vlntrFrm.patchValue({ hebYear: currentHebYear });

      // default hebMonth to first month in string that matches our list (use english for value)
      let foundMonthEn: string | null = null;
      for (const tok of tokens) {
        for (const m of this.hebMonths) {
          if (tok.toLowerCase().includes(m.en.toLowerCase()) || tok.includes(m.he)) { foundMonthEn = m.en; break; }
        }
        if (foundMonthEn) break;
      }
      if (!foundMonthEn) foundMonthEn = this.hebMonths[0].en;
      this.vlntrFrm.patchValue({ hebMonth: foundMonthEn });

      // default hebDay to 1 if no better info
      this.vlntrFrm.patchValue({ hebDay: 1 });

      // run initial conversion so user sees ISO immediately
      await this.convertHebToIso();

    } catch (err) {
      // fallback years if hebcal call fails
      const approx = new Date().getFullYear() + 3760;
      this.hebYears = Array.from({length: 7}, (_, i) => approx - 5 + i);
      this.hebYearOptions = this.hebYears.map(y => ({ value: y, label: this.numberToHebrewYearShort(y) }));
      this.vlntrFrm.patchValue({ hebYear: this.hebYears[5], hebMonth: this.hebMonths[0].en, hebDay: 1 });
      // ensure conversion executed for fallback too
      await this.convertHebToIso();
    }

    // subscribe to changes so UI updates automatically when user changes selects
    this.vlntrFrm.controls['hebDay'].valueChanges.subscribe(() => this.convertHebToIso());
    this.vlntrFrm.controls['hebMonth'].valueChanges.subscribe(() => this.convertHebToIso());
    this.vlntrFrm.controls['hebYear'].valueChanges.subscribe(() => this.convertHebToIso());
    
    await lastValueFrom(this.volunteerService.getAllVolunteers()).then(res => { this.volunteerService.volunteers = res });
    await lastValueFrom(this.projectService.getAllProjects()).then(res => { this.projectsArr = res; this.projectService.projects = res });
    await this.volunteeringService.refreshData();
    await lastValueFrom(this.subProjectService.getAllProjects()).then(res => { this.subProjects = res; this.subProjectService.Projects = res });
    await lastValueFrom(this.ecdService.getAllEichud()).then(res => { this.ecdService.peopleInTheEichud = res });  
    await lastValueFrom(this.volunteeringService.getAllVolunteerings()).then(res => { this.volunteeringService.volunteerings = res ; this.volunteeringArr = res });  
    this.filteredSubProjects = await  this.subProjectService.Projects.filter(subPro => subPro.projectCode === Number(this.volunteeringService.projectCodeInS))

  }

  // helper to reset form defaults (keeps today as default)
  private setFormDefaults() {
    const today = new Date();
    const formatted = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    this.vlntrFrm.patchValue({ dateOfVolunteering: formatted });
    // if heb controls already initialized, set to first options
    if (this.hebYears.length) this.vlntrFrm.patchValue({ hebYear: this.hebYears[Math.floor(this.hebYears.length/2)] });
    this.vlntrFrm.patchValue({ hebMonth: this.hebMonths[0].en, hebDay: 1 });
    // update converted iso
    this.convertHebToIso();
  }

  onProjectChange(event: Event) {
    const selectedProjectCode = (event.target as HTMLSelectElement).value;
    this.filteredSubProjects = this.subProjectService.Projects.filter(subPro => subPro.projectCode === Number(selectedProjectCode));
  }
 
  async convertHebToIso() {
    this.convertError = null;
    this.convertedIso = null;
    const d = this.vlntrFrm.value.hebDay;
    const m = this.vlntrFrm.value.hebMonth; // this is english month value now
    const y = this.vlntrFrm.value.hebYear;
    if (!d || !m || !y) return;
    try {
      const iso = await lastValueFrom(this.hebcalService.hebToIso(Number(d), String(m), Number(y)));
      this.convertedIso = iso;
      this.vlntrFrm.controls['dateOfVolunteering'].setValue(iso);
      this.vlntrFrm.controls['dateOfVolunteering'].setErrors(null);
    } catch (err) {
      this.convertError = 'המרה נכשלה — אנא בדוק את התאריך או נסה תאריך אחר';
      this.vlntrFrm.controls['dateOfVolunteering'].setErrors({ hebConversion: true });
    }
  }

  async addVolunteering() {
    // ensure latest conversion before saving
    await this.convertHebToIso();

    if (this.vlntrFrm.valid) {
      const volunteering = {
        dateOfVolunteering: this.vlntrFrm.value.dateOfVolunteering!,
        volunteerCode: this.vlntrFrm.value.volunteerCode!,
        poorManCode: this.vlntrFrm.value.poorManCode!,
        matcherCode: this.vlntrFrm.value.matcherCode!,
        projectCode: this.vlntrFrm.value.projectCode!,
        subProjectCode: this.vlntrFrm.value.subProjectCode!
      }
      this.volunteeringService.addVolunteering(volunteering);
      alert(this.volunteeringArr.length)
      this.vlntrFrm.reset(); // איפוס הטופס לאחר הוספה
      this.setFormDefaults();
    }
  }
  deleteVolunteering(v: VolunteeringModule) {
    this.volunteeringService.addVolunteering(v);
  }
  updateVolunteering(v: VolunteeringModule) {
    this.volunteeringService.updateVolunteering(v);
  }
  getVolunteering() {
    this.volunteeringService.getAllVolunteerings().subscribe(res => { this.volunteeringArr = res })
  }
}

