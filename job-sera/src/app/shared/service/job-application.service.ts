import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobApplication } from '../Models/job.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private getHeader() {
    let token = this.authService.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return headers
  }

  createJobApplication(jobApplication: JobApplication) {
    let headers = this.getHeader()
    return this.http.post(`${environment.fastApiMainUrl}/job-application/`, jobApplication, { headers: headers }).subscribe(res=> {
      console.log(res);
      
    })
  }
}
