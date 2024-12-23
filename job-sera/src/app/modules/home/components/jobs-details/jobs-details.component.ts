import { Component,  OnDestroy, OnInit,  inject } from '@angular/core';
import { JobDetails, SavedJobs } from 'src/app/shared/Models/job.type';
import { JobSearchService } from '../../services/job-search.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {  MatIconButton } from '@angular/material/button';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { SavedJobsService } from 'src/app/shared/service/saved-jobs.service';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, CommonModule]
})
export class JobsDetailsComponent implements OnInit, OnDestroy {

  selectedJob!: JobDetails;
  private selectedJobSub$ !: Subscription;
  private readonly jobSearchService: JobSearchService = inject(JobSearchService);
  private readonly handleService: HandleMessageService = inject(HandleMessageService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly savedJobService: SavedJobsService = inject(SavedJobsService);
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
  onClickSaved(jobDetails:JobDetails, bookmarkBtn:MatIconButton){
    
    const {id, ...details} = jobDetails;
    
    let isLoggedIn = this.authService.loggedInSub$.getValue();
    if(isLoggedIn){
      bookmarkBtn.color = 'primary';
      let currentUserId :string = this.authService.currentUserIdSub.getValue()
      const savedJob:SavedJobs = {...details, jobId:id, userId:currentUserId}
      
      this.savedJobService.createJobJobs(savedJob)
    }
    else{
      this.handleService.warningMessage("You can't save the job, you didn't authenticated", "Not Saved Jobs")
    }
  }
}
