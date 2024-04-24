import { TEmployeeProps, clockInProps } from "features/timeAndAttendance/types";

export interface AnalyticsRecordProps {
  clockIns: number;
  clockOuts: number;
  employeesOnBreak: number;
  remoteWorkers: {
    count: number;
  };
  employeesOnLeave: {
    count: number;
  };
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

export interface attendancePendingSetupProps {
  timeTrackingRules: boolean;
  workSchedule: boolean;
  break: boolean;
  scheduleEmployeeShift: boolean;
  timeOffPolicy: boolean;
  biometrics: boolean;
  locations: boolean;
  others: boolean;
}
