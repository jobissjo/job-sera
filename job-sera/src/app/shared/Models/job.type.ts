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

export interface SavedJobs extends BasicJobDetails{
  jobId:string
  userId:string
}

export interface CreateJobDetails extends BasicJobDetails{
  
  employerId?: string;
}

export interface JobApplicationAnswers{
  ableToCommute: boolean;
  highQualification: string;
  experience: number;
  coverLetter: string;
  interviewDates: string;
}
export interface JobApplicationAns extends JobApplicationAnswers{
  
  resume: File; 
  
}



export interface JobApplication extends JobApplicationAns {
  name: string;
  phoneNumber: string;
  email: string;
  location: string;
  jobId:string;
  userId:string

  [key: string]: string | boolean | number|File;
}
