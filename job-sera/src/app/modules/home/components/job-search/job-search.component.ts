import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent {
  searchForm!:FormGroup;

  ngOnInit(){
    // debugger
    this.searchForm = new FormGroup({
      jobTitle:new FormControl('', [Validators.required]),
      location: new FormControl(''),
      experience: new FormControl('')

    })
  }

  onSearchClicked(){
    this.searchForm.valid && console.log(this.searchForm.value) 
  }

}
