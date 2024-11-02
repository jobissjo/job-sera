import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone:true,
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule, RouterModule
  ]
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm!:FormGroup;
  isSendOTP:boolean= false;
  verifyOTP:boolean = false;
  constructor(private readonly fb:FormBuilder){}
  ngOnInit(){
    this.forgotPasswordForm = this.fb.group({
      email:['', [Validators.required]]
    })
  }
  onSubmitForm(){

  }
}
