import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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

}
