import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from 'src/app/shared/service/job-application.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import {  ResponseJobApplication } from 'src/app/shared/Models/job.type';
import { UpdateStatusComponent } from '../update-status/update-status.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss',
    './../../styles/user-styles.scss'],
    standalone: true,
    imports: [UpdateStatusComponent, MatCardModule, MatDividerModule, MatIconModule, CommonModule]
})
export class MyJobsComponent implements OnInit {

  showUpdateStatus: boolean = false;
  updateJobStatus!: ResponseJobApplication;
  constructor(private readonly jobApplicationSer: JobApplicationService, private readonly authSer: AuthService) { }
  appliedJobs: ResponseJobApplication[] = [

  ]
  ngOnInit(): void {
    let userId = this.authSer.currentUserIdSub.getValue()
    this.jobApplicationSer.getJobApplicationByUserId(userId).subscribe({
      next: res => {
        console.log(res);

        this.appliedJobs = res;
        this.sortTheJobApplication()
      },
      error: err => {
        console.log(err);

      }
    })
  }

  sortTheJobApplication(){
    this.appliedJobs.sort((a, b) => {
      return new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime();
    });
  }
  
  clickUpdateStatus(job: ResponseJobApplication) {
    this.showUpdateStatus = true;
    this.updateJobStatus = job;
  }

  closeUpdateStatus() {
    this.showUpdateStatus = false;
  }


}
