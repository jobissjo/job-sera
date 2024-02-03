import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  @Input() personalInformation!:FormGroup;

  address!:FormGroup;

  ngOnInit(){
    this.address = <FormGroup> this.personalInformation.get('address')
  }

}
