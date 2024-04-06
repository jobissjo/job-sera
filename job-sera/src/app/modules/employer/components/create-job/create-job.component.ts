import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent {
 

  createJobForm:FormGroup;
  qualificationArray!:FormArray;
  skillsArray!:FormArray;
  responsibilityArray!:FormArray;
  descriptionArray!:FormArray;

  constructor(private _formBuilder: FormBuilder) {
    this.createJobForm = this._formBuilder.group({
      jobTitle: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: this._formBuilder.array([]),
      shift:[''],
      jobType:[''],
      salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      experience:['', Validators.required],
      qualification: this._formBuilder.array([]),
      skills: this._formBuilder.array([]),
      responsibilities:this._formBuilder.array([]),
    });
  }

  ngOnInit(){
    this.qualificationArray = <FormArray> this.createJobForm.get('qualification');
    this.skillsArray = <FormArray> this.createJobForm.get('skills')
    this.responsibilityArray = <FormArray> this.createJobForm.get('responsibilities');
    this.descriptionArray = <FormArray> this.createJobForm.get('description');
  }

  onCreateJobSubmit(){
    console.log(this.createJobForm.value);
    if(this.createJobForm.valid){
      console.log("Form is valid");
      
    }
  }

  addQualification(){
    this.qualificationArray.push(
      new FormControl('', Validators.required)
    )
  }

  deleteQualification(index:number){
    this.qualificationArray.removeAt(index);
  }

  addSkill(){
    this.skillsArray.push(
      new FormControl('', Validators.required)
    )
  }

  deleteSkill(index:number){
    this.skillsArray.removeAt(index);
  }

  addResponsibility(){
    this.responsibilityArray.push(
      new FormControl('', Validators.required)
    )
  }

  deleteResponsibility(index:number){
    this.responsibilityArray.removeAt(index)
  }

  addDescription(){
    this.descriptionArray.push(
      new FormControl('', Validators.required)
    )
  }

  deleteDescription(index:number){
    this.descriptionArray.removeAt(index)
  }


}
