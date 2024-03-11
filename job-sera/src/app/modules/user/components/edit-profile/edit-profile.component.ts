import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserProfileService } from '../../service/user-profile.service';
import { UserFireResponse } from 'src/app/modules/auth/Models/userFireResponse.model';
import { EducationType, UserDetail } from '../../models/my-jobs';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';

const moment = _moment || _rollupMoment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})
export class EditProfileComponent {

  @ViewChild('stepper') stepper!: MatStepper;
  focusSection: string = ''
  currentProfileId: string = ''
  updateMode: boolean = true;
  isLoading: boolean = true;
  // Model Form Groups
  userDetail !: FormGroup;
  // All the FormArrays
  educationArray!: FormArray;
  certificationArray!: FormArray;
  skillsArray!: FormArray;
  experienceArray!: FormArray;
  knownLanguageArray!: FormArray;
  preferredLocationArray!: FormArray;

  private currentUser: UserFireResponse = this.authService.userSub$.getValue();


  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private handleMsgService: HandleMessageService,
    private authService: AuthService,
    private userProfileService: UserProfileService) {

  }

  ngOnInit() {

    // User Detail Form
    this.userDetail = this.fb.group({
      personalDetail: this.fb.group({
        name: ['', Validators.required],
        heading: ['',],
        email: { value: this.currentUser.email, disabled: true },
        phoneNumber: ['', Validators.required],
        dob:['', Validators.required],
        gender:['', Validators.required],
        socialMediaLink: ['', Validators.required],
        
        githubLink: [''],
        country: ['', Validators.required],
        state: ['', Validators.required],
        district: ['', Validators.required],
        postalCode: ['']
      }),
      education: this.fb.array([
        this.fb.group({
          level: ['', Validators.required],
          fieldOfStudy: [''],
          startedDate: [moment(), Validators.required],
          endedDate: [moment(), Validators.required]
        })
      ]),
      certifications: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
          certificateId: [''],
          mode: ['', Validators.required],
          institution: ['', Validators.required],
          startDate: [moment()],
          endDate: [moment(), Validators.required]
        })
      ]),
      skills: this.fb.array([
        new FormControl('', Validators.required)
      ]),
      experience: this.fb.array([
        this.fb.group({
          position: ['', Validators.required],
          companyName: ['', Validators.required],
          startDate: [moment(), Validators.required],
          endDate: [moment(), Validators.required]
        })
      ]),
      knownLanguages: this.fb.array([
        this.fb.group({
          language: ['', Validators.required],
          level: ['', Validators.required],
          reading: [false, Validators.required],
          writing: [false, Validators.required],
          speaking: [false, Validators.required]
        })
      ]),
      preferredLocations: this.fb.array([
        new FormControl('', Validators.required)
      ]),
      otherPreference: this.fb.group({
        jobType: ['', Validators.required]
      })
    });


    // get a value of all form Arrays
    this.educationArray = this.userDetail.get('education') as FormArray;
    this.certificationArray = this.userDetail.get('certifications') as FormArray;
    this.skillsArray = this.userDetail.get('skills') as FormArray;
    this.experienceArray = this.userDetail.get('experience') as FormArray;
    this.knownLanguageArray = this.userDetail.get('knownLanguages') as FormArray;
    this.preferredLocationArray = this.userDetail.get('preferredLocations') as FormArray;


    // get section-id
    this.focusSection = this.activeRoute.snapshot.queryParamMap.get('section') ?? '';
    setTimeout(() => {
      this.focusSection && this.onGoToSection(this.focusSection);
    }, 50)

    // update the form is edit Mode or Update Mode
    this.userProfileService.getProfileByUserId(this.authService.currentUserIdSub.getValue()).subscribe(res => {
      if (res) {
        this.updateMode = true;
        console.log(res);
        this.currentProfileId = res.profileId ?? '';
        this.updateUserDetailForm(res);
        this.isLoading = false;
      }
      else {
        this.updateMode = false;
        this.isLoading = false;
      }
    })
  }






  private updateUserDetailForm(user: UserDetail) {
    this.userDetail.get('personalDetail')?.patchValue(user.personalDetail);
    this.userDetail.get('otherPreference')?.patchValue(user.otherPreference);

    this.updateUserDetailArrays(user.education, this.educationArray);
    this.updateUserDetailArrays(user.certifications, this.certificationArray);
    this.updateUserDetailArrays(user.experience, this.experienceArray);
    this.updateUserDetailArrays(user.knownLanguages, this.knownLanguageArray);

    this.updateUserDetailControls(user.skills, this.skillsArray);
    this.updateUserDetailControls(user.preferredLocations, this.preferredLocationArray);
  }

  private updateUserDetailArrays(arr: Object[], formArray: FormArray) {
    console.log("arr", arr);

    arr.forEach((educationItem, index) => {
      if (index < formArray.length) {
        console.log("items", educationItem);

        formArray.at(index).patchValue(educationItem);
      } else {
        console.log("Education Item", educationItem);
        let temp = this.createNewFormGroup(educationItem)
        temp.patchValue(educationItem)
        formArray.push(temp);

        // this.addEducation(this.getUserData(educationItem))
      }
    });
  }
  getUserData(obj: any): EducationType {
    return obj as EducationType; // Type assertion
  }



  private updateUserDetailControls(controls: string[], formArray: FormArray) {
    if (controls) {
      formArray.clear();
      controls.forEach(control => {
        formArray.push(new FormControl(control, Validators.required));
      });
    }
  }

  onGoToSection(section: string) {
    if (!section.length)
      return;
    const element = document.getElementById(section + '-section');
    console.log("element", element);
    if (section == 'education' || section == 'certification') {
      this.goToNextStep();
    }
    else if (section == 'experience' || section == 'language') {
      this.goToNextStep();
      this.goToNextStep();
    }
    else if (section == 'location') {
      this.goToNextStep();
      this.goToNextStep();
      this.goToNextStep();

    }
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }, 0)
    }
  }

  goToNextStep() {
    this.stepper.next();
  }
  onClickCreateUserProfile() {
    if (this.userDetail.valid && this.authService.loggedInSub$.getValue()) {
      const userProfile: UserDetail = {
        ...this.userDetail.value
      };
      const user = this.currentUser;
      userProfile.personalDetail.email = user.email;
      userProfile.userId = this.authService.currentUserIdSub.getValue();
      userProfile.profileId = this.currentProfileId
      if (this.updateMode) {
        this.userProfileService.updateProfile(userProfile);
      }
      else {
        this.userProfileService.createUserProfile(userProfile);
      }

    }
    else {
      console.log(this.userDetail.value);

    }
  }

  // Add FormArrays
  createNewFormGroup(formModel: any): FormGroup {
    const formGroup = this.fb.group(formModel);
    formGroup.reset();
    return formGroup;
  }

  addEducation() {
    const newEducationGroup = this.createNewFormGroup({
      level: ['', Validators.required],
      fieldOfStudy: [''],
      startedDate: [moment(), Validators.required],
      endedDate: [moment(), Validators.required]
    });
    this.educationArray.push(newEducationGroup);
  }

  addCertifications() {
    const newCertificationGroup = this.createNewFormGroup({
      title: ['', Validators.required],
      certificateId: [''],
      mode: ['', Validators.required],
      institution: ['', Validators.required],
      startDate: [moment()],
      endDate: [moment(), Validators.required]
    });
    this.certificationArray.push(newCertificationGroup);
  }


  addSkills() {
    this.skillsArray.push(
      new FormControl('', Validators.required)
    )
  }

  addPreferredLocations() {
    if (this.preferredLocationArray.length < 5) {
      this.preferredLocationArray.push(
        new FormControl('', Validators.required)
      )
    } else {
      this.handleMsgService.warningMessage("Upto 5 Preferred Locations are available",
        "Maximum Locations")
    }

  }

  addExperience() {
    const newExperienceGroup = this.createNewFormGroup({
      position: ['', Validators.required],
      companyName: ['', Validators.required],
      startDate: [moment(), Validators.required],
      endDate: [moment(), Validators.required]
    });
    this.experienceArray.push(newExperienceGroup);
  }


  addLanguage() {
    const newLanguageGroup = this.createNewFormGroup({
      language: ['', Validators.required],
      level: ['', Validators.required],
      reading: [false, Validators.required],
      writing: [false, Validators.required],
      speaking: [false, Validators.required]
    });
    this.knownLanguageArray.push(newLanguageGroup);
  }


  deleteFormArrayElements(formArray: FormArray, index: number) {
    formArray.removeAt(index);
  }


  setMonthAndYear(normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>,
    i: number, formArray: FormArray, formControl: string) {

    const currentStartDate = formArray.controls[i].get(formControl)?.value;
    const ctrlValue = currentStartDate;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    formArray.controls[i].get(formControl)?.setValue(ctrlValue);
    datepicker.close();

  }


}
