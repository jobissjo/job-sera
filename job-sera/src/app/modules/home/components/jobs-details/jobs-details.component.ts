import { Component, inject } from '@angular/core';
import { JobSearchService } from 'src/app/shared/service/job-search.service';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.scss']
})
export class JobsDetailsComponent {
  jobSearchService:JobSearchService = inject(JobSearchService);
  onCreateJobClicked(){
    this.jobSearchService.createJobDetails()
  }
}
