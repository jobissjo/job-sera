import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { SavedJobsService } from 'src/app/shared/service/saved-jobs.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent implements OnInit {
  savedJobs: JobDetails[] = [];
  private userId : string = '';
  constructor(private savedJobService: SavedJobsService, private authService: AuthService) {

  }
  ngOnInit() {
    this.userId = this.authService.currentUserIdSub.getValue()
    if(this.userId){
      this.getJobById()
    }
      
    
    
  }

  getJobById(){
    this.savedJobService.getJobByUserId(this.userId).subscribe({
      next: res => {
        this.savedJobs = res;
      },
      error: err => {
        this.savedJobs = []
      }
    })
  }

  onDeleteClick(jobId:string){
    this.savedJobService.deleteSavedJob(jobId).subscribe({
      next: res => {
        console.log(res);
        this.getJobById()
      }
    })
  }

}
