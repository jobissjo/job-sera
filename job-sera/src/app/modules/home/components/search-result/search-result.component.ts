import { Component, OnInit } from '@angular/core';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobSearchService } from '../../services/job-search.service';
import { Router } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  standalone: true,
  imports: [
    AngularMaterialModule, CommonModule
  ]
})
export class SearchResultComponent implements OnInit{
  jobDetails:JobDetails[] = [];

  constructor(private readonly jobService:JobSearchService, private readonly route:Router){}
  onSelectedJob(job:JobDetails){
    this.route.navigate(['job-detail', job.id] )
  }
  ngOnInit(): void {
    // this.jobService
    this.jobService.searchResultJobs.subscribe(res=>{
      this.jobDetails = res
    })
  }
}
