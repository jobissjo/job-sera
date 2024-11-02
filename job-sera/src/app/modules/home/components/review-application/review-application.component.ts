import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JobApplication } from 'src/app/shared/Models/job.type';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { JobApplicationService } from 'src/app/shared/service/job-application.service';
import { UtilsService } from 'src/app/shared/service/utils.service';

@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, CommonModule]
})
export class ReviewApplicationComponent {
  jobApplication!: JobApplication;
  
  constructor(private readonly utilsService:UtilsService, private readonly jobApplicationSer:JobApplicationService){

  }

  ngOnInit(){
     this.utilsService.jobApplicantSub$.subscribe({
      next:res => {
        this.jobApplication = res
      },
      error:err => {
        
      }
     })
  }

  editApplicantDetails(){
    console.log("editApplicantDetails")
  }

  editApplicationAnswers(){
    console.log("editApplicationAnswers")
  }

  submitApplication(){
    this.jobApplicationSer.createJobApplication(this.jobApplication)
  }
}
