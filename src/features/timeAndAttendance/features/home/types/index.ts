import { TEmployeeProps, clockInProps } from "features/timeAndAttendance/types";

export interface AnalyticsRecordProps {
  date: string;
  clockIns: number;
  clockOuts: number;
  employeesOnBreak: number;
  totalEmployees: number;
  totalEarlyEmployees: number;
  totalLateEmployees: number;
  totalAbsentEmployees: number;
  remoteWorkers: {
    count: number;
  }
}

export interface timeSheetRecordProps {
  clockIn: clockInProps;
  employee: TEmployeeProps;
}

export type dashboardGraphProps = Record<string, number>;

export interface graphFilterProps {
  year?: number;
  month?: number;
  week?: number;
}

export type attendancePendingSetupProps = Record<string, boolean>;
