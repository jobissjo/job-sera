import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobSearchService } from '../../services/job-search.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule,
    AngularMaterialModule, CommonModule
  ]
})
export class JobSearchComponent {
  searchForm!: FormGroup;
  constructor(private readonly jobService: JobSearchService, private readonly authService: AuthService,
    private readonly route: Router
  ) {

  }

  ngOnInit() {
    // debugger
    this.searchForm = new FormGroup({
      jobTitle: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      experience: new FormControl('')

    })
  }

  onSearchClicked() {
    if(this.searchForm.valid) {
      console.log();
      
      this.route.navigate(['search-result'])
      const { jobTitle, location, experience } = this.searchForm.value;
      console.log(jobTitle, location, experience);
      this.jobService.searchJobs(jobTitle, location, experience)
    }

  }

}
