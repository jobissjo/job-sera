import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobSearchService } from 'src/app/modules/home/services/job-search.service';
import { JobDetails } from 'src/app/shared/Models/job.type';

@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrls: ['./job-openings.component.scss']
})
export class JobOpeningsComponent implements OnInit{
  jobPostings: JobDetails[] = []; // Populate this array with job postings data
  private jobService: JobSearchService= inject(JobSearchService);
  private authService: AuthService= inject(AuthService);
  ngOnInit(): void {
    this.getJobs()
  }

  getJobs(){
    let empId = this.authService.currentUserIdSub.getValue()
    this.jobService.getJobsByEmployerId(empId).subscribe({
      next:res => {
        this.jobPostings = res
      }
    })
  }
  editJob(job: JobDetails) {
    // Handle editing job posting
  }

  deleteJob(job: JobDetails) {
    // Handle deleting job posting
  }
}
