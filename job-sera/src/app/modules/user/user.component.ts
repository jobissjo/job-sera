import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { CustomDialogComponent } from 'src/app/shared/components/custom-dialog/custom-dialog.component';
import { AuthService } from '../auth/services/auth.service';
import { ResponseUserModel } from 'src/app/shared/Models/auth.types';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [
    AngularMaterialModule, CommonModule, RouterModule
  ]
})
export class UserComponent implements OnInit {
  constructor(private readonly router: Router, 
    private readonly dialogue: MatDialog,
    private readonly authService: AuthService) { }
  user!: ResponseUserModel;
  ngOnInit() {
    this.authService.userSubFA$.subscribe(res => {
      this.user = res;
    })
  }

  routeToChangePwd() {
    this.router.navigate(['auth', 'change-password'])
  }

  routeToEditProfile() {
    this.router.navigate(['user', 'edit-profile'])
  }

  onClickLogout() {
    const dialogRef = this.dialogue.open(CustomDialogComponent, {
      width: '300px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: { title: "Confirm to Logout?", message: "Are you really want to logout" }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.authService.signOutInFA();
        this.router.navigate([''])

      }
      else {
        console.log("unsuccessful result");
      }
    })
  }
}
