import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm!:FormGroup;

  constructor(private fb:FormBuilder){}
  ngOnInit(){
    this.forgotPasswordForm = this.fb.group({
      email:['', [Validators.required]]
    })
  }
  onSubmitForm(){

  }
}
