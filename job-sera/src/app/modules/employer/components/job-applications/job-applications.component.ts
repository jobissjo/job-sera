import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobSearchService } from 'src/app/modules/home/services/job-search.service';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobsComponent } from '../jobs/jobs.component';
import { JobApplicantsComponent } from '../job-applicants/job-applicants.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss'], 
  standalone: true,
  imports: [JobsComponent, JobApplicantsComponent, CommonModule]
})
export class JobApplicationsComponent {
  jobPostings: JobDetails[] = []; // Populate this array with job postings data
  private readonly jobService: JobSearchService = inject(JobSearchService);
  private readonly authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.getJobs()
  }

  getJobs() {
    let empId = this.authService.currentUserIdSub.getValue()
    this.jobService.getJobsByEmployerId(empId).subscribe({
      next: res => {
        this.jobPostings = res
        console.log("from job-applications", res, this.jobPostings);
        
      },
      error:err => {
        this.jobPostings = []
      }
    })
  }
}
