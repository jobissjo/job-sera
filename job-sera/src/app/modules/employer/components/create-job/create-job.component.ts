import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobSearchService } from 'src/app/modules/home/services/job-search.service';
import { CreateJobDetails, JobDetails } from 'src/app/shared/Models/job.type';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
// import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,AngularMaterialModule, CommonModule ]
})
export class CreateJobComponent {
 
  createJobForm:FormGroup;
  qualificationArray!:FormArray;
  skillsArray!:FormArray;
  responsibilityArray!:FormArray;
  descriptionArray!:FormArray;
  updateJobId:string = '';
  updateMode:boolean = false;
  jobDetails!:JobDetails;
  constructor(private readonly _formBuilder: FormBuilder, private readonly authService:AuthService,
    private readonly jobService:JobSearchService, private readonly handleMsgService:HandleMessageService,
    private readonly activeRoute:ActivatedRoute, private readonly route:Router
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

    setTimeout(()=>{
      this.activeRoute.queryParamMap.subscribe(res=>{
        console.log("i am here", res, res.get('update-job-id'));
        
        this.updateJobId = res.get('update-job-id') ?? '';
        if(this.updateJobId){
          this.updateMode = true;
          this.jobService.getJobsById(this.updateJobId).subscribe({
            next:res => {
              this.jobDetails = res;
              this.updateJobForUpdateMode();
              console.log("update mode way");
            }
          })
        }
        else{
          this.updateMode = false;
        }
      })
    }, 200)
  }

  updateJobForUpdateMode(){
    console.log(this.jobDetails);
    
    const {qualifications,skills, description, responsibilities, ...otherDetails} = this.jobDetails;
    this.createJobForm.patchValue(otherDetails);
    qualifications.forEach(qualification => {
      this.addQualification(qualification)
    })
    skills.forEach(skill => {
      this.addSkill(skill)
    })
    description.forEach(desc=> {
      this.addDescription(desc)
    })
    responsibilities?.forEach(res=> {
      this.addResponsibility(res)
    })
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
      if(!this.updateMode){
        
        this.jobService.createJob(jobPost)
      }else{
        this.jobService.updateJob(this.updateJobId, jobPost).subscribe({
          next:res=>{
            console.log(res);
            this.route.navigate(['employer', 'job-openings']);
            this.handleMsgService.successMessage("Job details updated successfully", "Job Details Updated")
          },
          error:err=> {
            console.warn(err);
            
          }
        })
      }
      
    }
  }

  addQualification(value:string = ''){
    this.qualificationArray.push(
      new FormControl(value, Validators.required)
    )
  }

  deleteQualification(index:number){
    this.qualificationArray.removeAt(index);
  }

  addSkill(value:string = ''){
    this.skillsArray.push(
      new FormControl(value, Validators.required)
    )
  }

  deleteSkill(index:number){
    this.skillsArray.removeAt(index);
  }

  addResponsibility(value:string = ''){
    this.responsibilityArray.push(
      new FormControl(value, Validators.required)
    )
  }

  deleteResponsibility(index:number){
    this.responsibilityArray.removeAt(index)
  }

  addDescription(value:string = ''){
    this.descriptionArray.push(
      new FormControl(value, Validators.required)
    )
  }

  deleteDescription(index:number){
    this.descriptionArray.removeAt(index)
  }


}
