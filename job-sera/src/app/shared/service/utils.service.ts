import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {  JobApplicationAns } from '../Models/job.type';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  jobApplicantAns$ = new Subject<JobApplicationAns>()
  constructor() { }

  onSubmitAnswer(jobAns:JobApplicationAns){
    
  }
}
