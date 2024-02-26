import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login-employer',
  templateUrl: './login-employer.component.html',
  styleUrls: ['./login-employer.component.scss']
})
export class LoginEmployerComponent {
  
  constructor(private fb:FormBuilder){}
  loginEmployerForm!:FormGroup;

  ngOnInit(){
    this.loginEmployerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  login(){

  }
}
