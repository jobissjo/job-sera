import { Component } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';
import { CompanyDetailService } from '../../services/company-detail.service';
import { Router } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss', './../company-common.scss'],
  standalone: true,
  imports: [StarRatingModule, AngularMaterialModule, CommonModule]
})
export class CompanySearchComponent {

  searchedCompanies!:CompanyDetails[];
  constructor(private readonly companyDetailService:CompanyDetailService, private readonly router:Router){

  }

  ngOnInit(){
    this.searchedCompanies = this.companyDetailService.getDetails()
  }
  onSelectedCompanyDetail(company:CompanyDetails){
    this.router.navigate(['company', 'details']);
    
    setTimeout(()=> {
      this.companyDetailService.onSelectedDetail(company)
    },50)
  }

}
