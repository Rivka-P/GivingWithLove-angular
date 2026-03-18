import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EichudModel } from '../../Models/EichudModel';
import { EichudService } from '../../Services/eichud-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-eicud',
  imports: [ReactiveFormsModule,AsyncPipe],
  templateUrl: './eicud.html',
  styleUrl: './eicud.scss'
})
export class Eicud {
  peopleArr: EichudModel[] = [];
  eichudService = inject(EichudService)

  frmPerson: FormGroup = new FormGroup({
    eichudCode: new FormControl(null, Validators.required),
    tohar: new FormControl("הרה'ח"),
    familyName: new FormControl("גולדמן"),
    firstName: new FormControl("עקיבא"),
    ending: new FormControl(" "),
    fathersName: new FormControl("אהרן"),
    shtibel: new FormControl("בית המדרש"),
    street: new FormControl("ישא ברכה"),
    house: new FormControl("15"),
    city: new FormControl("ירושלים"),
    zipCode: new FormControl("123"),
    housePhone: new FormControl("02-5328910"),
    cellPhone: new FormControl("0233179441"),
    shver: new FormControl("משה מנחם פרנקל"),
  });
  save() {
    let person = new EichudModel()
    person.eichudCode = this.frmPerson.controls['eichudCode'].value
    person.tohar = this.frmPerson.controls['tohar'].value
    person.familyName = this.frmPerson.controls['familyName'].value
    person.firstName = this.frmPerson.controls['firstName'].value
    person.ending = this.frmPerson.controls['ending'].value
    person.shtibel = this.frmPerson.controls['shtibel'].value
    person.street = this.frmPerson.controls['street'].value
    person.house = this.frmPerson.controls['house'].value
    person.city = this.frmPerson.controls['city'].value
    person.zipCode = this.frmPerson.controls['zipCode'].value
    person.housePhone = this.frmPerson.controls['housePhone'].value
    person.cellPhone = this.frmPerson.controls['cellPhone'].value
    person.shver = this.frmPerson.controls['shver'].value
    this.addPerson(person)
  }
  addPerson(p: EichudModel) {
    this.eichudService.addPerson(p);
  }

}
