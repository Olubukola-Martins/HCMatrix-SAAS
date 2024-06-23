import { TEmployeeProps } from "features/timeAndAttendance/types";

export interface allSwapRequestProps {
  date: string;
  employee: TEmployeeProps;
  department: string;
  defaultShift?: "afternoon" | "night" | "morning";
  newShift?: "afternoon" | "night" | "morning";
  swapPartner: TEmployeeProps;
  status: string;
}

export interface PostMySwapShiftRequestProps {
  shiftFromId: number;
  shiftToId: number;
  shiftPartnerId: number;
  comment: string;
}

interface IShiftProps {
  id: number;
  name: string;
  isEnabled: boolean;
}

export interface PostMySwapShiftRequestProps {
  createdAt: string;
  reason: string;
  shiftFrom: IShiftProps;
  shiftTo: IShiftProps;
  shiftPartner: TEmployeeProps;
}
