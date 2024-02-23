import { Component } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';
import { CompanyDetailService } from '../../services/company-detail.service';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss']
})
export class CompanySearchComponent {

  searchedCompanies!:CompanyDetails[];
  constructor(private companyDetailService:CompanyDetailService){

  }

  ngOnInit(){
    this.searchedCompanies = this.companyDetailService.getDetails()
  }
  onSelectedCompanyDetail(company:CompanyDetails){

  }

}
