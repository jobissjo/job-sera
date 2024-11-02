import { Component, inject } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';
import { CompanyDetailService } from './services/company-detail.service';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { PopularCompaniesComponent } from './components/popular-companies/popular-companies.component';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { CompanySearchComponent } from './components/company-search/company-search.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  standalone: true,
  imports: [RouterModule, AngularMaterialModule, PopularCompaniesComponent,
     CommonModule, StarRatingModule, CompanySearchComponent]
})
export class CompanyComponent {

  companyDetailService: CompanyDetailService= inject(CompanyDetailService);
  isSearched:boolean = false;
  details:CompanyDetails[] = [];
  ngOnInit(){
    this.details = this.companyDetailService.getDetails()
  }

  findCompanies(){
    this.isSearched = true;
  }

}
