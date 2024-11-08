import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';
import { CompanyDetailService } from '../../services/company-detail.service';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import {  StarRatingModule } from 'angular-star-rating';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-companies',
  templateUrl: './popular-companies.component.html',
  styleUrls: ['./popular-companies.component.scss', './../company-common.scss'],
  standalone: true,
  imports: [AngularMaterialModule, StarRatingModule, CommonModule]
})
export class PopularCompaniesComponent {
// Array(arg0: number) {
// throw new Error('Method not implemented.');
// }
  constructor(private readonly router:Router, private readonly companyDetailService:CompanyDetailService){}
  @Input() popularCompanies:CompanyDetails[] = [];
  generateArray(n: number): any[] {
    return Array(n).fill(0);
}

  onSelectedCompanyDetail(company:CompanyDetails){
    
    this.router.navigate(['company', 'details']);
    setTimeout(()=> { this.companyDetailService.onSelectedDetail(company); },50 )
    
  }

}
