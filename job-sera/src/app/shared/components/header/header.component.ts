import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogin:boolean = false;
  @ViewChild('mainTitle') mainTitle!:ElementRef<HTMLSpanElement>
  constructor(private router:Router){}
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
