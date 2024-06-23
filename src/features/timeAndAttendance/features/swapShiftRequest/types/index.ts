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

export interface SwapShiftRequestProps {
  shiftFromId: number;
  shiftToId: number;
  shiftPartnerId: number;
  comment: string;
}
