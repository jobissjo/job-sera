import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone:true,
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule, FormsModule, CommonModule
  ]
})
export class SignInComponent implements OnInit {

  signInForm !: FormGroup;
  isLoading: boolean = false;
  constructor(private readonly authService: AuthService,
    private readonly router: Router,
    private readonly handleMsgService: HandleMessageService
  ) {

  }
  ngOnInit() {
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmitForm() {

    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.authService.signInFA(username, password)
      
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
