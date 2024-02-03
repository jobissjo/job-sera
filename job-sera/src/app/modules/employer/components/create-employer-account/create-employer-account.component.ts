import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-employer-account',
  templateUrl: './create-employer-account.component.html',
  styleUrls: ['./create-employer-account.component.scss']
})
export class CreateEmployerAccountComponent implements OnInit{
  employerForm!: FormGroup;
  personalInformation!:FormGroup;
  companyInformation!:FormGroup;
  additionalInformation!:FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.employerForm = this.fb.group({
      personalInformation: this.fb.group({
        firstName: [''],
        lastName: [''],
        username: [''],
        email: [''],
        phoneNumber:[''],
        password:[''],
        cPassword:[''],
        position:[''],
        socialMediaLink:[''],
        address: this.fb.group({
          street: [''],
          city: [''],
          state: [''],
          country:[''],
          postalCode:['']
        })

      }),
      companyInformation: this.fb.group({
        companyName: [''],
        industry: [''],
        companySize: [''],
        businessType: [''],
        companyPhoneNumber: [''],
        companyWebsite:[''],
        socialMediaLink:[''],
        desc:[''],

      }),
      additionalInformation: this.fb.group({
        // Add additional information fields here
      }),
    });
    this.personalInformation = <FormGroup>this.employerForm.get('personalInformation');
    this.companyInformation = <FormGroup>this.employerForm.get('companyInformation');
    this.additionalInformation = <FormGroup>this.employerForm.get('additionalInformation');
  }
}
