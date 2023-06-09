import { AssetRequestEntity } from "./approvalRequestEntities/AssetRequestEntity";
import { ConferenceRoomBookingEntity } from "./approvalRequestEntities/conferenceRoomBookingEntity";
import { LeaveEntity } from "./approvalRequestEntities/leaveEntity";
import { VehicleBookingEntity } from "./approvalRequestEntities/vehicleBookingEntity";

export type TApprovalRequest = {
  id: number;
  basicStageId: number;
  entityType: string;
  entityId: number;
  status: string;
  approverId: number;
  createdAt: string;
  updatedAt: string;
  leave?: LeaveEntity;
  conferenceRoomBooking?: ConferenceRoomBookingEntity;
  vehicleBooking?: VehicleBookingEntity;
  assetRequisition?: AssetRequestEntity;
};
