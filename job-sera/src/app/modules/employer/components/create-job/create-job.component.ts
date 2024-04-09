import { Component } from '@angular/core';
import {  FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobSearchService } from 'src/app/modules/home/services/job-search.service';
import { CreateJobDetails, JobDetails } from 'src/app/shared/Models/job.type';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
// import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent {
 

  createJobForm:FormGroup;
  qualificationArray!:FormArray;
  skillsArray!:FormArray;
  responsibilityArray!:FormArray;
  descriptionArray!:FormArray;

  constructor(private _formBuilder: FormBuilder, private authService:AuthService,
    private jobService:JobSearchService, private handleMsgService:HandleMessageService
  ) {
    this.createJobForm = this._formBuilder.group({
      jobTitle: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: this._formBuilder.array([]),
      shift:[''],
      jobType:[''],
      salary: ['', [Validators.required]],
      experience:['', Validators.required],
      qualifications: this._formBuilder.array([]),
      skills: this._formBuilder.array([]),
      responsibilities:this._formBuilder.array([]),
    });
  }
// responsibilities
  ngOnInit(){
    this.qualificationArray = <FormArray> this.createJobForm.get('qualifications');
    this.skillsArray = <FormArray> this.createJobForm.get('skills')
    this.responsibilityArray = <FormArray> this.createJobForm.get('responsibilities');
    this.descriptionArray = <FormArray> this.createJobForm.get('description');
  }

  onCreateJobSubmit(){
    debugger
    console.log(this.createJobForm.value,
       this.createJobForm.valid, this.createJobForm);
    if(this.createJobForm.valid){

      console.log("Form is valid");
      let employerId:string = this.authService.currentUserIdSub.getValue();
      console.log(employerId);
      
      if(!employerId){
        this.handleMsgService.warningMessage("Not getting a employer id, make sure you logged in","Unknown Error")
        return;
      }
      const jobPost : CreateJobDetails = {...this.createJobForm.value, employerId:employerId};

      this.jobService.createJob(jobPost)
      
    }
  }

  addQualification(){
    this.qualificationArray.push(
      new FormControl('', Validators.required)
    )
  }

  deleteQualification(index:number){
    this.qualificationArray.removeAt(index);
  }

  addSkill(){
    this.skillsArray.push(
      new FormControl('', Validators.required)
    )
  }

  deleteSkill(index:number){
    this.skillsArray.removeAt(index);
  }

  addResponsibility(){
    this.responsibilityArray.push(
      new FormControl('', Validators.required)
    )
  }

  deleteResponsibility(index:number){
    this.responsibilityArray.removeAt(index)
  }

  addDescription(){
    this.descriptionArray.push(
      new FormControl('', Validators.required)
    )
  }

  deleteDescription(index:number){
    this.descriptionArray.removeAt(index)
  }


}
