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
  attendance: {
    clockIn: {
      time: string;
      latitude: string;
      longitude: string;
    };
    clockOut: {
      time: string;
      comment: string;
      payExtraHours: boolean;
    };
    activities: switchActivityTableProps[];
  };
  totalBreakUsage: number;
  totalTimeTracked: number;
  extraWorkedHours: number;
  date: string;
  expectedWorkingHours: number;
}

export interface uploadedTimeSheetProps {
  empUid: string;
  timeIn: string;
  timeOut: string;
  date: string;
  comment: string;
}

export interface switchActivityTableProps {
  id: number;
  project: {
    name: string;
    id: number;
  };
  date: string;
  comment: string;
  time: string;
}
