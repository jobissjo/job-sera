import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/service/utils.service';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent {

  jobApplicationForm!: FormGroup;
  fileName: string = '';
  constructor(private fb: FormBuilder, private router:Router, private utilService:UtilsService) { }

  ngOnInit(): void {
    this.jobApplicationForm = this.fb.group({
      ableToCommute: [true, Validators.required],
      resume: [null, Validators.required],
      highQualification: ['', Validators.required],
      experience: [0, Validators.required],
      coverLetter: ['',],
      interviewDates:['']
    });
  }
  submitJobApplication(){
    if(this.jobApplicationForm.valid){
      this.router.navigate(['job-application','review']);
      setTimeout(()=> {
        this.utilService.onSubmitAnswer(this.jobApplicationForm.value)
      }, 300)
    }
    
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.jobApplicationForm.patchValue({ resume: file });
    this.fileName = file ? file.name : '';
  }
}
