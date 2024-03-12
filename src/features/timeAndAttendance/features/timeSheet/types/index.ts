import { TEmployeeProps } from "features/timeAndAttendance/types";

export interface timeSheetProps {
  employee: TEmployeeProps;
  days: {
    Sunday: {
      dayOfWeek: string;
      totalTimeTracked: number;
    };
    Monday: {
      dayOfWeek: string;
      totalTimeTracked: number;
    };
    Tuesday: {
      dayOfWeek: string;
      totalTimeTracked: number;
    };
    Wednesday: {
      dayOfWeek: string;
      totalTimeTracked: number;
    };
    Thursday: {
      dayOfWeek: string;
      totalTimeTracked: number;
    };
    Friday: {
      dayOfWeek: string;
      totalTimeTracked: number;
    };
    Saturday: {
      dayOfWeek: string;
      totalTimeTracked: number;
    };
  };
  totalWeeklyTimeTracked: number;
}

export interface timeSheetFilterProps {
  period?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  employeeId?: number;
}
