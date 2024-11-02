import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JobsDetailsComponent } from '../jobs-details/jobs-details.component';
import { JobsListComponent } from '../jobs-list/jobs-list.component';
import { JobSearchComponent } from '../job-search/job-search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [RouterModule, JobsDetailsComponent, JobsListComponent, JobSearchComponent]

})
export class HomeComponent {
  
  router = inject(Router);
  ngOnInit(){

    console.log("Hello this is from home component");
    
    
  }
}
