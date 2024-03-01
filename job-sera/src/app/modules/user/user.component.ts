import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/Models/user.type';
import { CustomDialogComponent } from 'src/app/shared/components/custom-dialog/custom-dialog.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private router:Router, private dialogue:MatDialog,
    private authService:AuthService){}
  user:User = {
    name:'Jobi tobi',
    email:'jobisj@gmail.com',
    phoneNumber:1234567890,
    gender:'male',
    location:'kanniya kumari, Tamil Nadu'
  }

  routeToChangePwd(){
    this.router.navigate(['auth', 'change-password'])
  }

  routeToEditProfile(){
    this.router.navigate(['user', 'edit-profile'])
  }

  onClickLogout(){
    const dialogRef = this.dialogue.open(CustomDialogComponent, {
      width: '300px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
       this.authService.signOut();
       this.router.navigate([''])
        
      }
      else{
        console.log("unsuccessful result");
      }
    })
  }
}
