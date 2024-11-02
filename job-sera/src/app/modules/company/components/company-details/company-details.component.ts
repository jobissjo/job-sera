import { Component } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';
import { CompanyDetailService } from '../../services/company-detail.service';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, StarRatingModule ]
})
export class CompanyDetailsComponent {

  selectedCompany!:CompanyDetails;
  isCompanySelected:boolean = false;
  constructor(private readonly companyDetailService:CompanyDetailService){}
  ngOnInit(){
    this.companyDetailService.selectCompanyDetailObs$.subscribe((response:CompanyDetails)=>{
      this.selectedCompany = response;
      this.isCompanySelected = true;
      
    }) 
  }

  

}
