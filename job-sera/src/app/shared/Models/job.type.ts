export interface BasicJobDetails {
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
  skills: string[]
  
}
export interface JobDetails extends BasicJobDetails{
  id:string
}

export interface CreateJobDetails extends BasicJobDetails{
  
  employerId?: string;
}

export interface JobApplicationAns {
  ableToCommute: boolean;
  resume: File; // Specify the type as File
  highQualification: string;
  experience: number;
  coverLetter: string;
  interviewDates: string;
}
export interface JobApplication extends JobApplicationAns {
  name: string;
  phoneNumber: string;
  email: string;
  location: string;
  jobId:string;
  userId:string
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
