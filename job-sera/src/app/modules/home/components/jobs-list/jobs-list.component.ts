import { Component, OnInit, inject } from '@angular/core';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobSearchService } from 'src/app/shared/service/job-search.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit{
  jobSearchService = inject(JobSearchService);
  jobDetails:JobDetails[] = []
  ngOnInit(){
    this.jobSearchService.fetchTasks()
    this.jobSearchService.jobObs$.subscribe((res:JobDetails[])=>{
      this.jobDetails = res
      console.log(this.jobDetails);
      
    })
  };

  
}
