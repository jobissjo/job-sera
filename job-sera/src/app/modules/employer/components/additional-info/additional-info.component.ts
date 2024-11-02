import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss',
   './../../commonStyle/employer-common.styles.scss'],
   standalone: true,
   imports: [FormsModule, ReactiveFormsModule, AngularMaterialModule, CommonModule]
})
export class AdditionalInfoComponent {
  @Input() additionalInformation!:FormGroup;
  @Output() previousEmit:EventEmitter<void> = new EventEmitter<void>();

  
  goToPrev(){
    this.previousEmit.emit()
  }
  platforms:{value:string, viewValue:string}[]= [
    {value:'youtube', viewValue: "YouTube"},
    {value:'facebook', viewValue: 'Facebook'},
    {value:'googleSearch', viewValue:'Google Search'},
    {value:'other', viewValue: 'Other'}
  ]

  submitEmit(){
    console.log("submit emit called")
  }
}
