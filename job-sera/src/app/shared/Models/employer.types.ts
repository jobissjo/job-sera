interface PersonalInformation {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    position: string;
    socialMediaLink: string;
    gender: string;
}

interface PersonalInformationCreate extends PersonalInformation{
    cPassword:string;
    password:string
}

interface CompanyInformation {
    companyName: string;
    companySize: string;
    companyPhoneNumber: string;
    socialMediaLink: string;
    industry: string;
    businessType: string;
    companyWebsite: string;
    desc: string;
    address:CompanyAddress
}

interface AdditionalInformation {
    hearAboutUs: string;
    agreedToTerms: string;
}
interface CompanyAddress{
    street:string;
    city:string;
    landmark:string;
    state:string;
    country:string;
    postalCode:string
}
export interface ResponseEmployerProfile {
    employer_id: string;
    personalInformation: PersonalInformation[];
    companyInformation: CompanyInformation[];
    additionalInformation: AdditionalInformation[];
}
export interface CreateEmployerProfile {
    employer_id?: string;
    personalInformation: PersonalInformationCreate;
    companyInformation: CompanyInformation;
    additionalInformation: AdditionalInformation;
}

export interface EmployerProfile {
    employer_id?: string;
    personalInformation: PersonalInformation;
    companyInformation: CompanyInformation;
    additionalInformation: AdditionalInformation;
}