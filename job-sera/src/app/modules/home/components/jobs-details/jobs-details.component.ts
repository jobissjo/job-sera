import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, inject } from '@angular/core';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobSearchService } from '../../services/job-search.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.scss']
})
export class JobsDetailsComponent implements OnInit, OnDestroy {

  selectedJob!: JobDetails;
  private selectedJobSub$ !: Subscription;
  private jobSearchService: JobSearchService = inject(JobSearchService);
  route: Router = inject(Router);

  ngOnInit(): void {
    this.selectedJobSub$ = this.jobSearchService.selectedJobObs$.subscribe((response: JobDetails) => {
      this.selectedJob = response;
    })
  }

  ngOnDestroy() {
    this.selectedJobSub$.unsubscribe()
  }

  goToJobApplicationPage(id:string){
    this.route.navigate(['job-application', id])
  }

  onClickBlock(iconButton:MatIconButton){
    iconButton.color = 'warn'
  }
  onClickSaved(bookmarkBtn:MatIconButton){
    bookmarkBtn.color = 'primary'
  }
}
