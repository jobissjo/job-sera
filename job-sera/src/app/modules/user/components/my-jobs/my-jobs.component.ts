import { Component } from '@angular/core';
import { MyJobs } from '../models/my-jobs';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss',
    './../../styles/user-styles.scss']
})
export class MyJobsComponent {

  appliedJobs: MyJobs[] = [
    {
      status: "Applied", company: "Whatever company",
      position: "Python Developer", place: "Chennai, Tamilnadu",
      appliedCount: 50, appliedOn: "Feb 01"
    },
    {
      status: "Applied", company: "Mentor Thesis",
      position: "Python Programmer", place: "Kanyakumari, Tamilnadu",
      appliedCount: 50,  appliedOn: "Feb 04"
    },
    {
      status: "Applied", company: "Inmakes infotech pvt ltd",
      position: "Full Stack Developer", place:"Kochi, Kerala",
      appliedCount:43, appliedOn: "Feb 03"
    }
  ]

}
