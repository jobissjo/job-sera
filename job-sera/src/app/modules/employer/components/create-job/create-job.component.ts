import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent {

  

  createJobForm:FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.createJobForm = this._formBuilder.group({
      jobTitle: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      qualification: this._formBuilder.array([]),
      skills: this._formBuilder.array([]),
      salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      shift:[''],
      jobType:[''],
      responsibilities:this._formBuilder.array([]),
      experience:['', Validators.required]
      // Add more form controls as needed
    });
  }

  onCreateJobSubmit(){

  }


}
