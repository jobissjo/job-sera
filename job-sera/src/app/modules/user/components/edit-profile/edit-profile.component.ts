import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  // Model Form Groups
  userDetail !: FormGroup;
  educationModel!: FormGroup;
  certificationModel!: FormGroup;
  languageModel!: FormGroup;
  experienceModel!:FormGroup;

  // All the FormArrays
  educationArray!:FormArray;
  certificationArray!:FormArray;
  skillsArray!:FormArray;
  experienceArray!:FormArray;
  knownLanguageArray!:FormArray;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.educationModel = this.fb.group({
      level: ['', Validators.required],
      fieldOfStudy: [''],
      startedDate: ['', Validators.required],
      endedDate: ['', Validators.required]
    })

    this.certificationModel = this.fb.group({
      title: ['', Validators.required],
      certificateId: [''],
      mode:['', Validators.required],
      institution:['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })

    this.languageModel = this.fb.group({
      language: ['', Validators.required],
      level: ['', Validators.required]
    })

    this.experienceModel = this.fb.group({
      position: ['', Validators.required],
      companyName:['', Validators.required],
      startDate: ['', Validators.required],
      endDate:['', Validators.required]
    })

    this.userDetail = this.fb.group({
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
      ])
    });

    this.educationArray = this.userDetail.get('education') as FormArray;
    this.certificationArray = this.userDetail.get('certifications') as FormArray;
    this.skillsArray = this.userDetail.get('skills') as FormArray;
    this.experienceArray = this.userDetail.get('experience') as FormArray;
    this.knownLanguageArray = this.userDetail.get('knownLanguages') as FormArray;
  }

  onSubmitProfileEdit() {

  }


  addEducation(){
    this.educationArray.push(
      this.educationModel
    )
  }

  addCertifications(){
    this.certificationArray.push(
      this.certificationModel
    )
  }

  addSkills(){
    this.skillsArray.push(
      new FormControl('', Validators.required)
    )
  }

  addExperience(){
    this.experienceArray.push(
      this.experienceModel
    )
  }

}
