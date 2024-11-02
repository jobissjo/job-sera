import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  FormsModule,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';

@Component({
  selector: 'app-login-employer',
  templateUrl: './login-employer.component.html',
  styleUrls: ['./login-employer.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, ReactiveFormsModule]
})
export class LoginEmployerComponent {
  
  constructor(private readonly fb:FormBuilder, private readonly authSer:AuthService){}
  loginEmployerForm!:FormGroup;

  ngOnInit(){
    this.loginEmployerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  login(){
    if(this.loginEmployerForm.valid){
      const {username, password}= this.loginEmployerForm.value
      this.authSer.signInFA(username, password)
    }
  }
}
