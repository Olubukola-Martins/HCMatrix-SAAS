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
