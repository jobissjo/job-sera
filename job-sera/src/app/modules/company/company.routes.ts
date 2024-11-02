import { Routes } from "@angular/router";
import { CompanyComponent } from "./company.component";
import { CompanyDetailsComponent } from "./components/company-details/company-details.component";

export const companyRoutes : Routes = [
    { path: '', component: CompanyComponent },
    { path: 'details', component:CompanyDetailsComponent}
]