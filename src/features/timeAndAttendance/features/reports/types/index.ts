import { TEmployeeProps } from "features/timeAndAttendance/types";

export interface shiftPerEmployeeProps {
  employee: TEmployeeProps;
  trackedTime: number;
  department: {
    name: string;
  };
  status: string;
  shiftType: string;
}

export interface filterReportProps {
  employeeId?: string;
  departmentId?: number;
  startDate?: string;
  endDate?: string;
  shiftTypes?: "Afternoon" | "Evening" | "Morning";
}
