import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss',
    './../../commonStyle/employer-common.styles.scss'],
  standalone: true,
  imports: [FormsModule, AngularMaterialModule, ReactiveFormsModule, CommonModule]
})
export class CompanyInfoComponent {
  @Input() companyInformation!: FormGroup;
  @Output() prevPageEmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextPageEmit: EventEmitter<void> = new EventEmitter<void>();
  address!: FormGroup;
  ngOnInit() {
    this.address = <FormGroup>this.companyInformation.get('address')
  }

  clickGoToPrev(){
    this.prevPageEmit.emit()
  }
  clickGoToNext(){
    this.nextPageEmit.emit()
  }
}
