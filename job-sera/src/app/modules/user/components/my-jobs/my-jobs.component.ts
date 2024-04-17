import { Component, OnInit } from '@angular/core';
import { MyJobs } from '../../models/my-jobs';
import { JobApplicationService } from 'src/app/shared/service/job-application.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobApplication, ResponseJobApplication } from 'src/app/shared/Models/job.type';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss',
    './../../styles/user-styles.scss']
})
export class MyJobsComponent implements OnInit{

  showUpdateStatus:boolean = false;
  updateJobStatus!:ResponseJobApplication;
  constructor(private jobApplicationSer:JobApplicationService, private authSer:AuthService){}
  appliedJobs: ResponseJobApplication[] = [
    
  ]
  ngOnInit(): void {
    let userId = this.authSer.currentUserIdSub.getValue()
    this.jobApplicationSer.getJobApplicationByUserId(userId).subscribe({
      next: res => {
        console.log(res);
        
        this.appliedJobs = res;
      },
      error: err => {
        console.log(err);

      }
    })
  }
  clickUpdateStatus(job: ResponseJobApplication){
    this.showUpdateStatus = true;
    this.updateJobStatus = job;
  }

  closeUpdateStatus(){
    this.showUpdateStatus = false;
  }
  

}
