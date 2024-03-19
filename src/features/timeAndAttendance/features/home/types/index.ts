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
