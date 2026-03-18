import { Component, inject, SimpleChanges } from '@angular/core';
import { PositionModel } from '../../Models/PositionModel';
import { PositionService } from '../../Services/position-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

// @Component({
//   selector: 'app-position',
//   imports: [ReactiveFormsModule, AsyncPipe],
import {  CommonModule } from '@angular/common';

@Component({
  selector: 'app-position',
  imports: [ReactiveFormsModule, AsyncPipe,CommonModule],
  templateUrl: './position.html',
  styleUrl: './position.scss'
})
export class Position {
    positionsArr: PositionModel[] = [];
    positionService = inject(PositionService)
    p?:PositionModel;
    frmPosition: FormGroup = new FormGroup({
    psitionCode: new FormControl(null),
    positionName: new FormControl(null, Validators.required)
  });

  ngOnInit() {
    this.positionService.getAllPositions().subscribe(res => this.positionsArr = res)
  }
  addPosition(p: PositionModel) {
    this.positionService.addPosition(p);
  }
  deletePosition(p: PositionModel) {
   
    this.positionService.deletePosition(p.positionCode);
    
  }
  updatePosition(p: PositionModel) {
    this.positionService.updatePosition(p);

  }
  getPositions() {
    this.positionService.getAllPositions().subscribe(res => this.positionsArr = res)
  }
  getPositionById(p: PositionModel) {
    this.positionService.getPositionById(p.positionCode)
  }
  save() {
    let pos = new PositionModel()
    pos.positionName = this.frmPosition.controls['positionName'].value
    this.addPosition(pos)
  }



}
