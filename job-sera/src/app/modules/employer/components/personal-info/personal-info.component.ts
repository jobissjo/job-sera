import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss',
  './../../commonStyle/employer-common.styles.scss'],
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule]
})
export class PersonalInfoComponent {
  @Input() personalInformation!:FormGroup;
  @Output() nextTabEvent = new EventEmitter<void>();

  
  nextTab(){
    this.nextTabEvent.emit()
  }
  // ngOnInit(){
    
  // }

}
