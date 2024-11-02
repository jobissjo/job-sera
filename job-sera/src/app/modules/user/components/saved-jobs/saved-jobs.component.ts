import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { CustomDialogComponent } from 'src/app/shared/components/custom-dialog/custom-dialog.component';
import { SavedJobsService } from 'src/app/shared/service/saved-jobs.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CommonModule]
})
export class SavedJobsComponent implements OnInit {
  savedJobs: JobDetails[] = [];
  private userId: string = '';
  constructor(private readonly savedJobService: SavedJobsService,
    private readonly authService: AuthService,
    private readonly dialogue: MatDialog,
    private readonly router: Router) {

  }
  ngOnInit() {
    this.userId = this.authService.currentUserIdSub.getValue()
    if (this.userId) {
      this.getJobById()
    }



  }

  getJobById() {
    this.savedJobService.getJobByUserId(this.userId).subscribe({
      next: res => {
        this.savedJobs = res;
      },
      error: err => {
        this.savedJobs = []
      }
    })
  }

  onDeleteClick(jobId: string) {
    const dialog = this.dialogue.open(CustomDialogComponent, {
      width: '300px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        title: "Confirm to Delete?",
        message: "Are you sure delete this saved jobs"
      }
    })
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.savedJobService.deleteSavedJob(jobId).subscribe({
          next: res => {
            console.log(res);
            this.getJobById()
          }
        })
      }
      else {
        console.log("Your attempt reverted");

      }
    })

  }

  onClickApply(id:string) {
    this.router.navigate(['job-application', id])
  }

}
