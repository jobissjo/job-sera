import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent {

  jobApplicationForm!: FormGroup;
  fileName: string = '';
  constructor(private fb: FormBuilder) { }

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
    console.log(this.jobApplicationForm.value);
    
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.jobApplicationForm.patchValue({ resume: file });
    this.fileName = file ? file.name : '';
  }
}
