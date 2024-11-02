import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobSearchService } from '../../services/job-search.service';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-separate-detail',
  templateUrl: './job-separate-detail.component.html',
  styleUrls: ['./job-separate-detail.component.scss'],
  standalone: true,
  imports: [
    AngularMaterialModule, CommonModule
  ]
})
export class JobSeparateDetailComponent implements OnInit {
  selectedJob!: JobDetails;
  isLoading: boolean = true;
  jobId!: string;
  constructor(private readonly route: Router, private readonly activeRoute: ActivatedRoute,
    private readonly jobService: JobSearchService
  ) {

  }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(res => {
      this.jobId = res.get('id') ?? '';
      this.getCurrentJob(this.jobId)
    })
  }

  getCurrentJob(jobId: string) {
    if (jobId) {
      this.jobService.getJobsById(jobId).subscribe({
        next: res => {
          console.log("loading falsed", res);
          this.selectedJob = res;
          this.isLoading = false;
        },
        error: err => {
          this.isLoading = false;
        }
      })
    }
    else{
      // show erro can't fetch a string
      this.isLoading = false;
    }

  }
  goToJobApplicationPage(id:string){
    this.route.navigate(['job-application', id])
  }

}
