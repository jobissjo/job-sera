export interface MyJobs{
    status:string,
    position:string,
    company:string,
    place:string,
    appliedCount:number,
    appliedOn:string
}

export interface UserDetail {
    education: Education[];
    certifications: Certification[];
    skills: string[]; // Assuming skills are just an array of strings
    experience: Experience[];
    knownLanguages: Language[];
    preferredLocations: string[]; // Assuming locations are just an array of strings
  }
  
  interface Education {
    level: string;
    fieldOfStudy: string;
    startedDate: Date;
    endedDate: Date;
  }
  
  interface Certification {
    title: string;
    certificateId: string;
    mode: string;
    institution: string;
    startDate: Date;
    endDate: Date;
  }
  
  interface Experience {
    position: string;
    companyName: string;
    startDate: Date;
    endDate: Date;
  }
  
  interface Language {
    language: string;
    level: string;
    reading: boolean;
    writing: boolean;
    speaking: boolean;
  }
  