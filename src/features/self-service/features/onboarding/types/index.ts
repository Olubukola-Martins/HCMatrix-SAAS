import { TEmployee } from "features/core/employees/types";

type TResumptionInformation = {
  branchId: number;
  resumptionDateAndTime: string;
  whoToCallId: number;
  documentUrl: string;
};
export type TOnboardingTask = {
  name: string;
  description: string;
  priority: "high" | "low" | "medium";
  supervisor: {
    id: number;
    firstName: string;
    lastName: string;
  };
  startDate: string;
  endDate: string;
  id: number;
};
export type TOnboarding = {
  id: number;
  status: string;
  employee: TEmployee;
  resumptionInformation?: TResumptionInformation;
  tasks?: TOnboardingTask[];
};
