import { TLeave } from "./leave";

export type TLeaveRecall = {
  id: number;
  leaveId: number;
  length: number;
  newEndDate: string;
  leave: TLeave;
  createdAt: string;
  updatedAt: string;
};
