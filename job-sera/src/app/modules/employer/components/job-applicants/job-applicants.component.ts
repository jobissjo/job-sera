import { Component, OnInit } from '@angular/core';
import { JobApplication } from 'src/app/shared/Models/job.type';
import { UtilsService } from 'src/app/shared/service/utils.service';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss']
})
export class JobApplicantsComponent implements OnInit{
  jobApplicants: JobApplication[] = []

  constructor(private utilsService:UtilsService){}

  ngOnInit(): void {
    this.utilsService.selectedJobApplicants$.subscribe({
      next:res => {
        this.jobApplicants = res;
      },
      error:err => {
        this.jobApplicants = []
      }
    })
  }
  
}
