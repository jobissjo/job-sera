import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogin:boolean = false;
  notificationCount:number = 5;
  @ViewChild('mainTitle') mainTitle!:ElementRef<HTMLSpanElement>
  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(){
    this.authService.userSub$.subscribe({
      next: res => {
        if (res.email !== 'dummy@mail.com'){
          this.isLogin = true;
        }
      }
    })
  }
  routeToAuth(){
    this.router.navigate(['auth'])
  }

  routeToCompany(){
    this.router.navigate(['company'])
  }
  routeToHome(){
    this.router.navigate([''])
  }
  routeToJobs(){
    this.router.navigate(['jobs'])
  }
  routeToEmployer(){
    this.router.navigate(['employer'])
  }
  routeToNotification(){
    this.router.navigate(['user', 'notifications'])
  }

  changeCursor(): void {
    this.mainTitle?.nativeElement.classList.add('hand-pointer');
  }

  resetCursor(): void {
    this.mainTitle?.nativeElement.classList.remove('hand-pointer');
  }

  clickToUser():void{
    this.router.navigate(['user'])
  }
}
