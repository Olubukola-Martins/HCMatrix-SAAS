import { TEmployeeProps } from "features/timeAndAttendance/types";

export interface shiftPerEmployeeProps {
  employee: TEmployeeProps;
  trackedTime: number;
  department: {
    name: string;
  };
  shiftType: string;
  totalTimeTracked: number;

}

export interface filterReportProps {
  employeeId?: string;
  departmentId?: number;
  startDate?: string;
  endDate?: string;
  shiftTypes?: "afternoon" | "night" | "morning";
}
