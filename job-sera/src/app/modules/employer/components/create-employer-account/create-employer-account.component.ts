import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { EmployerService } from '../../services/employer.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CreateEmployerProfile, EmployerProfile } from 'src/app/shared/Models/employer.types';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { AdditionalInfoComponent } from '../additional-info/additional-info.component';

@Component({
  selector: 'app-create-employer-account',
  templateUrl: './create-employer-account.component.html',
  styleUrls: ['./create-employer-account.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, PersonalInfoComponent,FormsModule, ReactiveFormsModule,
    CompanyInfoComponent, AdditionalInfoComponent
   ]
})
export class CreateEmployerAccountComponent implements OnInit {
  employerForm!: FormGroup;
  updateMode : boolean = false;
  personalInformation!: FormGroup;
  companyInformation!: FormGroup;
  additionalInformation!: FormGroup;
  @ViewChild('tabGroup') tabGroup !:MatTabGroup;
  constructor(private readonly fb: FormBuilder, private readonly employerService:EmployerService,
    private readonly authService:AuthService, private readonly handleMsgSer:HandleMessageService,
  private readonly activeRoute:ActivatedRoute, private readonly route:Router) {

  }

  ngOnInit() {
    this.employerForm = this.fb.group({
      personalInformation: this.fb.group({
        firstName: ['',[Validators.required]],
        lastName: [''],
        username: ['', [Validators.required]],
        email: ['', [Validators.email]],
        phoneNumber: ['',[Validators.required]],
        password: ['', [Validators.required]],
        cPassword: ['', [Validators.required]],
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

    

    
  }

  updateEmployerForm(form:EmployerProfile){
    this.employerForm.patchValue(form)
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
      else{
        this.handleMsgSer.warningMessage("Your password and confirm password is not matched","Password Not Matched")
      }
    }
    else{
      this.handleMsgSer.warningMessage("Form is not valid, make sure you enter all the details correctly","Form is not Valid")
    }
    
  }
}
