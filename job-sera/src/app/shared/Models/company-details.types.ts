import { JobDetails } from "./job.type";


export interface CompanyDetails {
    companyName: string;
    address: string;
    employeesCount: number;
    reviewsCount: number;
    review: string;
    openings: JobDetails[];
    companyType: string;
    followerCount: number;
    about: string;
    location:string,
    industry:string,
    HRDetails:HRDetails
}

interface HRDetails{
    name:string,
    email:string,
    phoneNumber:string,
    linkedInPage?:string
}

