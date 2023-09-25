import { ICurrentCompany } from "types";


interface IAppQuestions {
  questionId: number;
  isActive: boolean;
}


export interface IJobOpeningData {
  title: string;
  departmentId: number;
  teamLeadId: number;
  employmentTypeId: number;
  experienceTypeId: number;
  locationType: string;
  expiresAt: string;
  location: string;
  description: string;
  // additionalQuestion: string;
  // applicationQuestions: IAppQuestions[];
  // employmentBenefits: number[];
}
