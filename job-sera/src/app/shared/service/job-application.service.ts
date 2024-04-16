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
    let headers = this.getHeader();
    // const { resume, ...tempForm } = jobApplication;
    // const formData = new FormData();
  
    // for (const key in tempForm) {
    //     if (tempForm.hasOwnProperty(key) && key !== 'resume') {
    //         console.log("Appending key:", key, "value:", tempForm[key]);
    //         formData.append(key, tempForm[key] as any); 
    //     }
    // }
    
    // // Append resume file to FormData
    // if (jobApplication.resume) {
    //     console.log("Appending resume:", jobApplication.resume.name);
    //     formData.append('resume', jobApplication.resume as any, jobApplication.resume.name);
    // }
    
    // // Log FormData entries individually
    // formData.forEach((value, key) => {
    //     console.log("FormData entry - Key:", key, "Value:", value);
    // });
    
    return this.http.post(`${environment.fastApiMainUrl}/job-application`, jobApplication, { headers: headers }).subscribe(res => {
        console.log(res);
    })
}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post('http://localhost:8000/files/', formData).subscribe(res=>{
      console.log(res);
      
    });
  }
}
