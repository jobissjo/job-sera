interface PersonalDetail {
    name: string;
    heading: string;
    email: string;
    phoneNumber: string;
    dob?: string | null;
    gender?: string | null;
    socialMediaLink?: string | null;
    githubLink?: string | null;
    country: string;
    state: string;
    district: string;
    postalCode?: string | null;
}

interface OtherPreference {
    jobType: string;
}

interface EducationType {
    level: string;
    fieldOfStudy: string;
    startedDate: string;
    endedDate: string;
}

interface CertificationType {
    title: string;
    certificateId: string;
    mode: string;
    institution: string;
    startDate: string;
    endDate: string;
}

interface Experience {
    position: string;
    companyName: string;
    startDate: string;
    endDate: string;
}

interface Language {
    language: string;
    level: string;
    reading: boolean;
    writing: boolean;
    speaking: boolean;
}

export interface UserProfileModel {
    profileId: string;
    personalDetail: PersonalDetail;
    education: EducationType[];
    certifications: CertificationType[];
    skills: string[];
    experience: Experience[];
    knownLanguages: Language[];
    preferredLocations: string[];
    otherPreference: OtherPreference;
}
