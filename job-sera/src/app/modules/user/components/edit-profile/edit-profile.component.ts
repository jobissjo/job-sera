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

  // Model Form Groups
  userDetail !: FormGroup;

  personalDetail!: FormGroup;
  educationModel!: FormGroup;
  certificationModel!: FormGroup;
  languageModel!: FormGroup;
  experienceModel!: FormGroup;

  // All the FormArrays
  educationArray!: FormArray;
  certificationArray!: FormArray;
  skillsArray!: FormArray;
  experienceArray!: FormArray;
  knownLanguageArray!: FormArray;
  preferredLocationArray!: FormArray;


  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute,
    private toaster: ToastrService) { }

  focusSection: string = ''
  ngOnInit() {
    this.personalDetail = this.fb.group({
      name: ['', Validators.required],
      heading: ['',],
      email: [''],
      phoneNumber: ['', Validators.required],
      socialMediaLink: ['', Validators.required],
      githubLink: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      postalCode: ['']
    })

    this.educationModel = this.fb.group({
      level: ['', Validators.required],
      fieldOfStudy: [''],
      startedDate: [moment(), Validators.required],
      endedDate: [moment(), Validators.required]
    })

    this.certificationModel = this.fb.group({
      title: ['', Validators.required],
      certificateId: [''],
      mode: ['', Validators.required],
      institution: ['', Validators.required],
      startDate: [moment()],
      endDate: [moment(), Validators.required]
    })

    this.languageModel = this.fb.group({
      language: ['', Validators.required],
      level: ['', Validators.required],
      reading: [false, Validators.required],
      writing: [false, Validators.required],
      speaking: [false, Validators.required]
    })

    this.experienceModel = this.fb.group({
      position: ['', Validators.required],
      companyName: ['', Validators.required],
      startDate: [moment(), Validators.required],
      endDate: [moment(), Validators.required]
    })

    // main form
    this.userDetail = this.fb.group({
      personalDetail: this.personalDetail,
      education: this.fb.array([
        this.educationModel
      ]),
      certifications: this.fb.array([
        this.certificationModel
      ]),
      skills: this.fb.array([
      ]),
      experience: this.fb.array([
        this.experienceModel
      ]),
      knownLanguages: this.fb.array([
        this.languageModel
      ]),
      preferredLocations: this.fb.array([

      ])
    });

    // get a value of all form Arrays
    this.educationArray = this.userDetail.get('education') as FormArray;
    this.certificationArray = this.userDetail.get('certifications') as FormArray;
    this.skillsArray = this.userDetail.get('skills') as FormArray;
    this.experienceArray = this.userDetail.get('experience') as FormArray;
    this.knownLanguageArray = this.userDetail.get('knownLanguages') as FormArray;
    this.preferredLocationArray = this.userDetail.get('preferredLocations') as FormArray;

    // get section-id
    // this.focusSection =  this.activeRoute.snapshot.queryParams['section'];
    this.focusSection = this.activeRoute.snapshot.queryParamMap.get('section') ?? '';
    setTimeout(() => {
      this.focusSection && this.onGoToSection(this.focusSection);
    }, 50)

  }


  @ViewChild('stepper') stepper!: MatStepper;
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
    this.stepper.next()
  }

  onSubmitProfileEdit() {
    console.log(this.userDetail.value);

  }


  addEducation() {
    this.educationArray.push(
      this.educationModel
    )
  }

  addCertifications() {
    this.certificationArray.push(
      this.certificationModel
    )
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
      // console.warn("hello")

      this.toaster.warning("Upto 5 preferred locations are available", "Maximum Locations",
        {
          timeOut: 2000,
          positionClass: 'toast-top-center',
          progressBar: true,
          progressAnimation: 'decreasing',
          tapToDismiss: true,
          closeButton: true,
        });
    }

  }

  addExperience() {
    this.experienceArray.push(
      this.experienceModel
    )
  }

  addLanguage() {
    this.knownLanguageArray.push(
      this.languageModel
    )
  }

  deleteSkill(index: number) {
    this.skillsArray.removeAt(index);

  }

  deletePrefLocations(index: number) {
    this.preferredLocationArray.removeAt(index);
  }

  deleteFormArrayElements(formArray: FormArray, index: number) {
    formArray.removeAt(index)
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
