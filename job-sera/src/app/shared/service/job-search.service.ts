import { Injectable } from '@angular/core';
import { JobDetails } from '../Models/job.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  private jobUrl: string = 'https://sample-firebase-project-883bd-default-rtdb.firebaseio.com/';
  
  jobObs$ = new Subject<JobDetails[]>();
  constructor(private http: HttpClient, private authService: AuthService) { }

  jobDetails: JobDetails[] = [
    {
      title: 'Software Engineer',
      companyName: 'TechCo',
      experience: '2 years',
      qualifications: ['Bachelor\'s Degree in Computer Science'],
      salary: '$80,000 per year',
      location: 'Cityville, USA',
      jobType: 'Full-time',
      shift: 'Day',
      description: ['Develop and maintain software applications', 'Collaborate with cross-functional teams'],
      additionalDetails: ['Experience with JavaScript, React, Node.js']
    },
    {
      title: 'Marketing Specialist',
      companyName: 'AdAgency',
      experience: '3 years',
      qualifications: ['Bachelor\'s Degree in Marketing'],
      salary: '$60,000 per year',
      location: 'Marketing City, USA',
      jobType: 'Part-time',
      shift: 'Flexible',
      description: ['Create and implement marketing strategies', 'Analyzing market trends'],
      additionalDetails: ['Experience with social media marketing']
    },
  ];

  fetchTasks(){
    of(this.jobDetails).subscribe((value)=>{
      setTimeout(()=> {
        this.jobObs$.next(value)
      },3000)
    });
  }
  createJobDetails() {
    const authToken = this.authService.getLoginToken();
    console.log(authToken);
  
    if (!authToken) {
      console.error('Authentication token is undefined.');
      return;
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
  
    this.http.post(`${this.jobUrl}jobs.json`, this.jobDetails, { headers }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error creating job details:', error);
      }
    );
  }

  onClickedJob(){

  }
}
