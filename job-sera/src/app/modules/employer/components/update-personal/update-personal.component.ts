import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';

@Component({
  selector: 'app-update-personal',
  templateUrl: './update-personal.component.html',
  styleUrls: ['./update-personal.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule]
})
export class UpdatePersonalComponent {

  @Input() personalInformation!:FormGroup;
  @Output() nextTabEvent = new EventEmitter<void>();

  
  nextTab(){
    this.nextTabEvent.emit()
  }
}
