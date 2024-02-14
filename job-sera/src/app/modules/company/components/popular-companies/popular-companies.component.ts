import { Component, Input } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';

@Component({
  selector: 'app-popular-companies',
  templateUrl: './popular-companies.component.html',
  styleUrls: ['./popular-companies.component.scss']
})
export class PopularCompaniesComponent {
// Array(arg0: number) {
// throw new Error('Method not implemented.');
// }
  @Input() popularCompanies:CompanyDetails[] = [];
  generateArray(n: number): any[] {
    return Array(n).fill(0);
}


}
