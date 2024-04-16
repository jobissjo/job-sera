import { Injectable } from '@angular/core';
import { CreateJobDetails, JobDetails } from 'src/app/shared/Models/job.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
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

  createJob(data:CreateJobDetails){
    console.log("job detail", data);
    
    let headers = this.getHeader();
    this.http.post(`${environment.fastApiMainUrl}/jobs/`, data,{headers:headers}).subscribe({
      next:res => {
        console.log(res);
        
      }
    })
  }

  updateJob(jobId:string,data:CreateJobDetails){
    console.log("job detail", data);

    let headers = this.getHeader();
    this.http.put(`${environment.fastApiMainUrl}/jobs/${jobId}`, data, {headers:headers})
  }
  getJobsById(id:string){
    let headers = this.getHeader();
    return this.http.get<JobDetails>(`${environment.fastApiMainUrl}/jobs/${id}`, {headers:headers})
  }

  getJobsByEmployerId(employerId:string){
    let headers = this.getHeader();
    return this.http.get<JobDetails[]>(`${environment.fastApiMainUrl}/jobs/employer/${employerId}`, {headers:headers})
  }

  onClickedJob() {

  }

  onSelectedJob(jobDetails:JobDetails){
    this.selectedJobObs$.next(jobDetails);
  }

  private getHeader(){
    let token = this.authService.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return headers
  }
}
