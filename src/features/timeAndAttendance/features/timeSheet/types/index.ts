import { TEmployeeProps } from "features/timeAndAttendance/types";

export interface timeSheetProps {
  employee: TEmployeeProps;
  days: {
    Sunday: {
      dayOfWeek: string;
      totalTimeTracked: number;
      date: string;
    };
    Monday: {
      dayOfWeek: string;
      totalTimeTracked: number;
      date: string;
    };
    Tuesday: {
      dayOfWeek: string;
      totalTimeTracked: number;
      date: string;
    };
    Wednesday: {
      dayOfWeek: string;
      totalTimeTracked: number;
      date: string;
    };
    Thursday: {
      dayOfWeek: string;
      totalTimeTracked: number;
      date: string;
    };
    Friday: {
      dayOfWeek: string;
      totalTimeTracked: number;
      date: string;
    };
    Saturday: {
      dayOfWeek: string;
      totalTimeTracked: number;
      date: string;
    };
  };
  totalWeeklyTimeTracked: number;
}

export interface timeSheetFilterProps {
  period?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  employeeId?: number | string;
}

export interface singleTimeSheetProps {
  employee: TEmployeeProps;
}

export interface uploadedTimeSheetProps {
  employee: TEmployeeProps;
  timeIn: string;
  timeOut: string;
  date: string;
  reason: string;
}