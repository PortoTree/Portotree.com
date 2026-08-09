import { PortfolioData } from "./portfolioData";

export interface CVPersonalData {
  firstName?: string;
  lastName?: string;
  name: string; // Keep for fallback/compatibility
  headline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  photoUrl: string;
  hireMeLink?: 'email' | 'whatsapp';
  placeOfBirth?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  address?: string;
}

export interface CVPortfolioData extends Omit<PortfolioData, 'awards' | 'personal'> {
  personal: CVPersonalData;
  internship?: Array<{
    id: string;
    role: string;
    company: string;
    location: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    current: boolean;
    description: string;
  }>;
  awards?: Array<{
    id: string;
    title: string;
    issuer: string;
    level?: string;
    year: string;
    description: string;
    imageUrl: string;
  }>;
  courses?: Array<{
    id: string;
    title: string;
    issuer: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    current: boolean;
    location: string;
    description: string;
  }>;
  languages?: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
  extracurriculars?: Array<{
    id: string;
    title: string;
    issuer: string;
    year: string;
  }>;
  hobbies?: Array<{
    id: string;
    name: string;
  }>;
}

export interface CVConfig {
  templateId: string;
  primaryColor: string;
  fontFamily: string;
  fontSize: number;
  sectionOrder: string[];
  hiddenItems: string[]; // IDs of projects, experiences, etc. to hide from CV
  showPortfolioLink: boolean;
}

export const defaultCVConfig: CVConfig = {
  templateId: 'ats-modern',
  primaryColor: '#000000',
  fontFamily: 'Inter',
  fontSize: 10,
  sectionOrder: ['experience', 'education', 'skills', 'certifications', 'awards', 'projects', 'organization'],
  hiddenItems: [],
  showPortfolioLink: true
};

// Represents the full data payload needed by the CV Viewer
export interface CVDataPayload {
  portfolio: CVPortfolioData;
  config: CVConfig;
}
