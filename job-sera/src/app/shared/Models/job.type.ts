export interface JobDetails{
    jobTitle:string,
    company:string,
    experience:string,
    qualifications: string[],
    salary:string,
    location:string,
    jobType:string,
    shift:string,
    description:string[],
    additionalDetails?:string[]
}