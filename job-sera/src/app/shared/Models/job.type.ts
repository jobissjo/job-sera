export interface JobDetails{
    title:string,
    companyName:string,
    experience:string,
    qualifications: string[],
    salary:string,
    location:string,
    jobType:string,
    shift:string,
    description:string[],
    additionalDetails?:string[]
}