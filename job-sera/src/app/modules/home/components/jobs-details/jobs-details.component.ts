import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobSearchService } from '../../services/job-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.scss']
})
export class JobsDetailsComponent implements OnInit, OnDestroy {

  selectedJob!: JobDetails;
  selectedJobSub$ !: Subscription;
  jobSearchService: JobSearchService = inject(JobSearchService);

  ngOnInit(): void {
    this.selectedJobSub$ = this.jobSearchService.selectedJobObs$.subscribe((response: JobDetails) => {
      this.selectedJob = response;
    })
  }
  onCreateJobClicked() {
    this.jobSearchService.createJobDetails();
  }

  ngOnDestroy() {
    this.selectedJobSub$.unsubscribe()
  }
}
