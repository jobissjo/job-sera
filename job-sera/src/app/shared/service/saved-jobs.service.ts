import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { SavedJobs } from '../Models/job.type';

@Injectable({
  providedIn: 'root'
})
export class SavedJobsService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  createJobJobs(saved_jobs: SavedJobs) {
    let headers = this.authService.getHeader()
    return this.http.post(`${environment.fastApiMainUrl}/saved_jobs`,
      saved_jobs, { headers: headers }).subscribe(res => {
        console.log(res);
        
      })
  }
}
