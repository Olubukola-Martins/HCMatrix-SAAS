export interface JobInfoData {
  category: "job-information";
  content: Content;
}

interface Content {
  startDate: string;
  employmentType: string;
  workModel: string;
  numberOfDaysPerWeek: number;
  hireDate: string;
  probationEndDate: string;
  confirmationDate: string;
  lineManagerId: number;
  lineManagerName: string;
  branchId: number;
  branchName: string;
  payrollType: string;
  monthlyGross: number;
}
