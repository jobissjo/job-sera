import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { EmployerService } from '../../services/employer.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CreateEmployerProfile } from 'src/app/shared/Models/employer.types';

@Component({
  selector: 'app-create-employer-account',
  templateUrl: './create-employer-account.component.html',
  styleUrls: ['./create-employer-account.component.scss']
})
export class CreateEmployerAccountComponent implements OnInit {
  employerForm!: FormGroup;
  updateMode : boolean = false;
  personalInformation!: FormGroup;
  companyInformation!: FormGroup;
  additionalInformation!: FormGroup;
  @ViewChild('tabGroup') tabGroup !:MatTabGroup;
  constructor(private fb: FormBuilder, private employerService:EmployerService,
    private authService:AuthService) {

  }

  ngOnInit() {
    this.employerForm = this.fb.group({
      personalInformation: this.fb.group({
        firstName: [''],
        lastName: [''],
        username: [''],
        email: [''],
        phoneNumber: [''],
        password: [''],
        cPassword: [''],
        position: [''],
        socialMediaLink: [''],
        gender:['']

      }),
      companyInformation: this.fb.group({
        companyName: [''],
        industry: [''],
        companySize: [''],
        businessType: [''],
        companyPhoneNumber: [''],
        companyWebsite: [''],
        socialMediaLink: [''],
        desc: [''],
        address: this.fb.group({
          street: [''],
          city: [''],
          landmark:[''],
          state: [''],
          country: [''],
          postalCode: ['']
        })

      }),
      additionalInformation: this.fb.group({
        hearAboutUs:[''],
        agreedToTerms: ['']
      }),
    });
    this.personalInformation = <FormGroup>this.employerForm.get('personalInformation');
    this.companyInformation = <FormGroup>this.employerForm.get('companyInformation');
    this.additionalInformation = <FormGroup>this.employerForm.get('additionalInformation');

    this.authService.isAuthenticated() && this.employerService.getEmployerById(this.authService.currentUserIdSub.getValue()).subscribe({
      next: res => { 
        // res.hasOwnProperty
        this.updateMode = true;
      },
      error: err => {
        this.updateMode = false;
      }
    })
  }

  updateEmployerForm(){
    
  }

  goToNextTab(tabLabel:string){
    const tabIndex = this.getTabIndexByLabel(tabLabel);
    const nextTabIndex = tabIndex + 1;
    this.tabGroup.selectedIndex = nextTabIndex;
  }

  goToPrevTab(tabLabel:string){
    const prevTabIndex = this.getTabIndexByLabel(tabLabel) - 1;
    this.tabGroup.selectedIndex = prevTabIndex;
  }
  
  private getTabIndexByLabel(tabLabel: string): number {
    const tabs = this.tabGroup._tabs.toArray();
    return tabs.findIndex((tab) => tab.textLabel === tabLabel);
  }

  onFormSubmit(){
    
    let employerValue : CreateEmployerProfile = this.employerForm.value

    if(this.employerForm.valid){
      if (employerValue.personalInformation.password == employerValue.personalInformation.cPassword){
        this.employerService.createEmployer(employerValue)
      }
    }
    
  }
}
