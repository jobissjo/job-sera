export interface JobDetails {
    jobTitle: string,
    company: string,
    experience: string,
    qualifications: string[],
    salary: string,
    location: string,
    jobType: string,
    shift: string,
    description: string[],
    additionalDetails?: string[];
    skills:string[]
    employerId?: string;
}

// interface JobPosting {
//     jobTitle: string;
//     company: string;
//     location: string;
//     description: string[];
//     salary: string;
//     shift: string;
//     jobType: string;
//     experience: string;
//     qualifications: string[];
//     additionalDetails: string[];
//     skills:string[]
//     employerId: string;
// }
