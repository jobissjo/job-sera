import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  isLoading:boolean = false;
  constructor(private fb:FormBuilder, 
    private authService:AuthService){

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
        // this.authService.registerUser(email, password);

        console.log('Form is valid and created user\nusername: ', username);
        this.isLoading = true
        this.hideProgressBar()
      }
    }

  }

  protected checkSamePassword(){
    const password =  this.signupForm.value.password;
    const cPassword =  this.signupForm.value.cPassword;

    return password === cPassword;
  }

  protected checkControlInValid(control:string){
    return this.signupForm.get(control)?.touched && this.signupForm.get(control)?.invalid;
  }

  hideProgressBar(){
    setTimeout(()=> {
      this.isLoading = false;
    }, 3000)
  }

}
