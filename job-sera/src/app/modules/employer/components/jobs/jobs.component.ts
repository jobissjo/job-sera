import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { JobApplicationService } from 'src/app/shared/service/job-application.service';
import { UtilsService } from 'src/app/shared/service/utils.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule, AngularMaterialModule]
})
export class JobsComponent implements AfterViewInit {
  @Input() jobPostings: JobDetails[] = [];
  constructor(private readonly utilService: UtilsService,
    private readonly router: Router,
    private readonly jobApplicationService: JobApplicationService
  ) { }
  ngAfterViewInit(): void {
    console.log("length", this.jobPostings.length);


    if (this.jobPostings.length) {
      this.jobApplicationService.getJobApplicationByJobId(this.jobPostings[0].id)
    }
  }

  onSelectJobPosting(jobId: string) {
    this.jobApplicationService.getJobApplicationByJobId(jobId)
  }

  routeToCreateJob() {
    this.router.navigate(['employer', 'create-job'])
  }
}
