import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService) {

  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cPassword: ['', [Validators.required]]
    });
  }
  common_toast_style = {
    closeButton: true,
    positionClass: 'toast-top-center'
  }

  onFormSubmit() {
    if (this.signupForm.valid) {
      const { username, email, password, cPassword } = this.signupForm.value;
      if (password == cPassword) {
        this.authService.signUp(email, password).subscribe({
          next: res => {
            this.toaster.success("User created for " + username, "Message", this.common_toast_style)

          },
          error: err => {
            this.toaster.error(err, "Error", this.common_toast_style);
          }
        })
        this.isLoading = true
        this.hideProgressBar();
      }
      else {
        this.toaster.warning("Password and Confirm Password not match", "Password Not Matched",this.common_toast_style)
      }
    }
    else {
      this.toaster.warning("Enter all details in the form", "Form Not Valid", this.common_toast_style);
    }

  }

  protected checkSamePassword() {
    const password = this.signupForm.value.password;
    const cPassword = this.signupForm.value.cPassword;

    return password === cPassword;
  }

  protected checkControlInValid(control: string) {
    return this.signupForm.get(control)?.touched && this.signupForm.get(control)?.invalid;
  }

  hideProgressBar() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500)
  }

}
