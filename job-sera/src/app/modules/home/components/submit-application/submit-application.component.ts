import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-application',
  templateUrl: './submit-application.component.html',
  styleUrls: ['./submit-application.component.scss'],
  standalone: true,
  imports: []
})
export class SubmitApplicationComponent {
  submitMessage:string= 'Your application has been submitted';
  private readonly router:Router = inject(Router)

  viewMyJobs(){
    this.router.navigate(['user', 'my-jobs'])
  }

  returnToHomePage(){
    this.router.navigate([''])
  }
}
