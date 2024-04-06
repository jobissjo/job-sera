import { Injectable } from '@angular/core';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  jobObs$ = new Subject<JobDetails[]>();
  selectedJobObs$ = new Subject<JobDetails>();
  constructor(private http: HttpClient, private authService: AuthService) { }
  


  getAllJobs(){
    this.http.get<JobDetails[]>(`${environment.fastApiMainUrl}/jobs/`).subscribe(res=>{
      this.jobObs$.next(res)
      
    })
  }

  createJob(){
    this.http.post(`${environment.fastApiMainUrl}/jobs/`, {},{}).subscribe({
      next:res => {
        console.log(res);
        
      }
    })
  }

  onClickedJob() {

  }

  onSelectedJob(jobDetails:JobDetails){
    this.selectedJobObs$.next(jobDetails);
  }
}
