import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone:true,
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule
  ]
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  error: string = '';
  private readonly authService:AuthService = inject(AuthService);
  onSubmit() {
    if (this.newPassword.length < 8) {
      this.error = "New password must be at least 8 characters long.";
    } else if (this.newPassword !== this.confirmPassword) {
      this.error = "New password and confirm password do not match.";
    } else {
      
      this.error = "";
      this.authService.changePassword(this.currentPassword, this.newPassword)
      console.log("Form submitted");
      
    }

  }
}
