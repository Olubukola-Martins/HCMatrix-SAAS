import { TEmployeeProps } from "features/timeAndAttendance/types";

interface scheduleProps {
  day: string;
  startTime: string;
  endTime: string;
  allowTrackingBeforeStart: boolean;
}

export interface workScheduleFixedProps {
  schedule: scheduleProps[];
  allowTrackingBeforeStart: boolean;
}

export interface IFlexible {
  day: string;
  duration: string;
}

export type workScheduleFlexibleProps = IFlexible[];

export interface IShift {
  type: string;
  schedule: scheduleProps[];
}

export type workScheduleShiftProps = IShift[];

export type workScheduleWeeklyProps = {
  duration: string;
};

export interface settingsBreakProps {
  id: number;
  name: string;
  isPaid: boolean;
  enforcePeriod: boolean;
  duration: number;
  startAt: string;
  endAt: string;
}

export interface scheduleEmployeesShiftProps {
  id: number | undefined;
  employee?: TEmployeeProps;
  shiftType: string;
  employeeIds: number[];
  isPermanent: boolean;
}

export interface scheduleFilterProps {
  empUid?: string | undefined;
  shiftTypes?: "morning" | "afternoon" | "night";
}

export interface TWorkSheduleShiftCategory {
  id: number;
  name: string;
  label: string;
  isEnabled: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
