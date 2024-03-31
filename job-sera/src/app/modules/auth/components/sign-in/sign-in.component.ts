import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm !: FormGroup;
  isLoading: boolean = false;
  constructor(private authService: AuthService,
    private router: Router,
    private handleMsgService: HandleMessageService
  ) {

  }
  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmitForm() {

    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService.signInFA(email, password)
      // this.authService.signIn(email, password).subscribe({
      //   next: (res) => {
      //     this.handleMsgService.successMessage("User is successfully logged in", "Login Success");
      //     this.router.navigate(['user']);
      //     console.log(res);
          

      //   },
      //   error: err => {
      //     this.handleMsgService.errorMessage(err, "Login Error")

      //   }
      // })
      this.isLoading = true;
      this.hideProgressBar()
    }
    else{
      this.handleMsgService.warningMessage(
        "Enter all correct details in the form", "Form Not Valid"
      )
    }
  }

  checkInValid(control: string) {
    return this.signInForm.get(control)?.touched && this.signInForm.get(control)?.invalid;
  }

  hideProgressBar() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500)
  }


}
