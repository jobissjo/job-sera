import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JobApplication, JobApplicationAns } from '../Models/job.type';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  jobApplicantSub$ = new Subject<JobApplication>()
  constructor(private authService: AuthService) { }

  onSubmitAnswer(jobAns: JobApplicationAns, jobId: string) {
    let user = this.authService.userSubFA$.getValue();
    const jobApplication: JobApplication = {
      ...jobAns,
      name: user.username,
      email: user.email,
      location: '',
      phoneNumber: '0987654321',
      jobId: jobId,
      userId:user.id
    }
    console.log("Type", typeof jobApplication.ableToCommute);
    
    setTimeout(() => {

      this.jobApplicantSub$.next(jobApplication);

      console.log(jobApplication);
    },200)

  }
}
