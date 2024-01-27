import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  constructor(private fb:FormBuilder, 
    private authService:AuthService, 
    @Inject('FIREBASE_CONFIG') public firebaseConfig: any){

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
      const {username, email, password, cPassword} = this.signupForm.value;
      if(password == cPassword){
        this.authService.registerUser(email, password);

        console.log('Form is valid and created user\nusername: ', username);
      }
      
    }
  }


}
