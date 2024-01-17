import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  constructor(private fb:FormBuilder){

  }

  ngOnInit(){
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
      cPassword:['', [Validators.required]]
    });
  }

  onFormSubmit(){
    if (this.signupForm.valid){
      console.log(this.signupForm.value);
      
    }
  }


}
