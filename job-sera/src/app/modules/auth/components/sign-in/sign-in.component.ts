import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  signInForm !: FormGroup;
  isLoading:boolean = false;
  constructor(private authService:AuthService,
    private toastr: ToastrService
    ){

    }
  ngOnInit(){
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmitForm(){
    console.log("form is submitted");
    
    if(this.signInForm.valid){
      const {email, password} = this.signInForm.value;
      this.authService.signIn(email, password).subscribe({
        next: (res)=> {
          console.log(res);
          
        },
        error: err=> {
          this.toastr.error(err, "Error", {
            positionClass: 'toast-top-center' // Set specific position for this toast
          })

        }
      })
      this.isLoading = true;
      this.hideProgressBar()
    }
  }

  checkInValid(control:string){
    return this.signInForm.get(control)?.touched && this.signInForm.get(control)?.invalid;
  }

  hideProgressBar(){
    setTimeout(()=>{
      this.isLoading = false;
    }, 1500)
  }


}
