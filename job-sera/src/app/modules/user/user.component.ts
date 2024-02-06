import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/Models/user.type';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private router:Router){}
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
}
