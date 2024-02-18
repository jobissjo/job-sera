import { Component } from '@angular/core';
import { UserDetail } from '../../models/my-jobs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  userDetails: UserDetail = {
    education: [
      {
        level: 'HSC',
        fieldOfStudy: 'Computer Science',
        startedDate: new Date('2010-09-01'),
        endedDate: new Date('2014-06-30')
      },
      {
        level: 'Bachelor',
        fieldOfStudy: 'Computer Science',
        startedDate: new Date('2010-09-01'),
        endedDate: new Date('2014-06-30')
      },
      // Add more education details if needed
    ],
    certifications: [
      {
        title: 'Angular Certification',
        certificateId: 'ANG2021',
        mode: 'Online',
        institution: 'XYZ Institute',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-31')
      },
      {
        title: 'Python Developer',
        certificateId: 'PYD2022',
        mode: 'Online',
        institution: 'XYZ Institute',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-31')
      },
      // Add more certification details if needed
    ],
    skills: ['JavaScript', 'Angular', 'HTML', 'CSS', 'TypeScript'],
    experience: [
      {
        position: 'Software Engineer',
        companyName: 'ABC Technologies',
        startDate: new Date('2014-07-01'),
        endDate: new Date('2020-12-31')
      },
      // Add more experience details if needed
    ],
    knownLanguages: [
      {
        language: 'English',
        level: 'Fluent',
        reading: true,
        writing: true,
        speaking: true
      },
      // Add more language details if needed
    ],
    preferredLocations: ['New York', 'San Francisco', 'London']
  };

  sectionToFocus: string = '';
  constructor(private activeRoute: ActivatedRoute, private router:Router) { }
  ngOnInit() {
    this.sectionToFocus = this.activeRoute.snapshot.queryParams['section'];

    setTimeout(() => {
      this.sectionToFocus && this.focusOnSection(this.sectionToFocus);
    }, 50)
  }

  focusOnSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onEditDetail(section:string){
    // console.log(section);
    
    this.router.navigate(['user', 'edit-profile'], {queryParams:{'section':section}})
  }
}
