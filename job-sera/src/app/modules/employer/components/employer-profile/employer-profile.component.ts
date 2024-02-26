import { Component } from '@angular/core';
import { EmployerProfileType } from '../../Models/employer.model';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent {
  employer!:EmployerProfileType;
  constructor(private employerService:EmployerService){

  }
  ngOnInit(){
    this.employer = this.employerService.getEmployer()
  }
}
