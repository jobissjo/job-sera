import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  signInForm !: FormGroup;
  constructor(private authService:AuthService
    ){

    }
  ngOnInit(){
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmitForm(){
    if(this.signInForm.valid){
      const {email, password} = this.signInForm.value;
      this.authService.loginUser(email, password);
    }
  }

}
