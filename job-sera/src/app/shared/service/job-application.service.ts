import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobApplication, ResponseJobApplication } from '../Models/job.type';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { UserNotificationService } from './user-notification.service';
import { NotificationType } from '../Models/user-notification.types';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  constructor(private authService: AuthService, private http: HttpClient,
    private utilService: UtilsService,
    private router: Router,
    private notifyService: UserNotificationService
  ) { }

  private getHeader() {
    let token = this.authService.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return headers
  }

  getJobApplicants() {
    let headers = this.getHeader();
    return this.http.get<ResponseJobApplication[]>(`${environment.fastApiMainUrl}/job-application`, { headers: headers }).subscribe(res => {
      // this.utilService.onSelectedJobApplicants(res)
    })
  }

  getJobApplicationByJobId(jobId: string) {
    console.log(jobId);
    
    let headers = this.getHeader();
    return this.http.get<ResponseJobApplication[]>(`${environment.fastApiMainUrl}/job-application/job/${jobId}`).subscribe({
      next: res => {
        this.utilService.onSelectedJobApplicants(res)
        console.log(res);
        
      },
      error: err => {
        console.log(err);

      }
    })
  }

  getJobApplicationByUserId(userId: string) {
    let headers = this.getHeader();
    return this.http.get<ResponseJobApplication[]>(`${environment.fastApiMainUrl}/job-application/user/${userId}`,
      { headers: headers })
  }

  createJobApplication(jobApplication: JobApplication) {
    let headers = this.getHeader();

    const { resume, ...otherDetails } = jobApplication;

    const formData = new FormData();
    formData.append('resume', resume)

    this.http.post<{ filename: string }>(`${environment.fastApiMainUrl}/job-application/upload_resume/`, formData).subscribe({
      next: res => {
        console.log(res);

        const data = { ...otherDetails, resumePath: res.filename }
        this.http.post<ResponseJobApplication>(`${environment.fastApiMainUrl}/job-application`, data, { headers: headers }).subscribe(response => {
          // response
          let notification: NotificationType = {
            notificationType: '', title: 'string',
            message: 'string',
            jobId: 'string',
            position: 'string',
            companyName: 'string',
            deleteOrResponded: []
          }
          this.notifyService.createUserNotification(notification)
          this.router.navigate(['submit-application', response.id])
        })
      }
    })
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post('http://localhost:8000/files/', formData).subscribe(res => {
      console.log(res);

    });
  }
}
