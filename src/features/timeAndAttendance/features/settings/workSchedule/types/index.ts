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
  shiftCategoryId: number;
  employeeIds: number[];
  isPermanent: boolean;
  shiftCategory?: {
    name: string;
  };
}

export interface scheduleFilterProps {
  empUid?: string | undefined;
  shiftTypes?: number;
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

export interface TWorkSheduleShiftSwapSetting {
  id: number;
  enableRotation: boolean;
  rotationFrequency: number;
  rotationFrequencyUnit: string;
  enableShiftSwap: boolean;
  swapWorkflowId: number;
  swapEligibility: "same_department" | "same_designation" | "same_role" | "any";
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TWorkSheduleShiftRotationSetting {
  id: number;
  enableRotation: boolean;
  rotationFrequency: number;
  rotationFrequencyUnit: "days";
  enableShiftSwap: boolean;
  swapWorkflowId: null;
  swapEligibility: null;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  pattern: Pattern[];
  rotationPattern: { id: number; shiftFromId: number; shiftToId: number }[];
}

interface Pattern {
  id: number;
  shiftFromId: number;
  shiftToId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
