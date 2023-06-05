import { TWorkflowApprovalType } from "features/core/workflows/types";
import { ConferenceRoomBooking } from "./conference-booking-entity";
import { Leave } from "./leave-entity";
import { VehicleBooking } from "./vehicle-booking-entity";
export type TNotificationType = TWorkflowApprovalType;

export type TNotification = {
  id: number;
  type: TWorkflowApprovalType;
  employeeId: number;
  title: string;
  message: string;
  content: Content[];
  isRead: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

interface Content {
  id: number;
  status: string;
  entityId: number;
  createdAt: string;
  updatedAt: string;
  approverId: number;
  entityType: string;
  basicStageId: number;
  vehicleBooking?: VehicleBooking;
  leave?: Leave;
  conferenceRoomBooking?: ConferenceRoomBooking;
}
