import { Component } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

  details = [{
    companyName: "ABC Corporation",
    address: "123 Main St, Cityville",
    employeesCount: 100,
    reviewsCount: 50,
    review: "Excellent company to work for!",
    openings: 5,
    companyType: "Tech",
    followerCount: 200,
    about: "ABC Corporation is a leading tech company specializing in software development."
  },
  {
    companyName: "XYZ Industries",
    address: "456 Elm St, Townsville",
    employeesCount: 500,
    reviewsCount: 80,
    review: "Great place for career growth.",
    openings: 10,
    companyType: "Manufacturing",
    followerCount: 1000,
    about: "XYZ Industries is a global manufacturing company known for its innovative products."
  }, {
    companyName: "DEF Enterprises",
    address: "789 Oak St, Villagetown",
    employeesCount: 200,
    reviewsCount: 30,
    review: "Good work-life balance.",
    openings: 3,
    companyType: "Finance",
    followerCount: 300,
    about: "DEF Enterprises is a financial services firm providing investment solutions."
  }]

}
