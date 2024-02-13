import { Component } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {


  isSearched:boolean = false;
  details: CompanyDetails[] = [{
    companyName: "ABC Corporation",
    address: "123 Main St, City vile",
    employeesCount: 100,
    reviewsCount: 50,
    reviews: [
      {
        username: "anonymous1",
        reviewText: "Company is amazing",
        reviewScore: 4,
        reviewedDate: "",
      }
    ],
    openings: [],
    companyType: "Tech",
    followerCount: 200,
    about: "ABC Corporation is a leading tech company specializing in software development.",
    location: "Trivandrum",
    industry: "Information technology"
  },
  {
    companyName: "XYZ Industries",
    address: "456 Elm St, Townsville",
    employeesCount: 500,
    reviewsCount: 80,
    reviews: [
      {
        username: "anonymous1",
        reviewText: "Company is amazing",
        reviewScore: 4,
        reviewedDate: "",
      }
    ],
    openings: [],
    companyType: "Manufacturing",
    followerCount: 1000,
    about: "XYZ Industries is a global manufacturing company known for its innovative products.",
    location: "Trivandrum",
    industry: "Information technology"
  }, {
    companyName: "DEF Enterprises",
    address: "789 Oak St, Village town",
    employeesCount: 200,
    reviewsCount: 30,
    reviews: [
      {
        username: "anonymous1",
        reviewText: "Company is amazing",
        reviewScore: 4,
        reviewedDate: "",
      }
    ],
    openings: [],
    companyType: "Finance",
    followerCount: 300,
    about: "DEF Enterprises is a financial services firm providing investment solutions.",
    location: "Trivandrum",
    industry: "Information technology"
  }]

  findCompanies(){
    this.isSearched = true;
  }

}
