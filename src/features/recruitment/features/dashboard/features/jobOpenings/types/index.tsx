export interface JobData {
  key: string;
  jobOpening: string;
  candidate: string;
  hiringLead: string;
  createdOn: string;
  status: string;
}

export  interface IjobOpeningForm {
  jobTitle: string;
  jobLocation: string;
  employmentType: string;
  minimumExperience: string;
  jobDescription: string;
  compensation: string | number;
  addBenefit?: string[];
  location: string;
  expiryDate: { _d: string } | string;
}
