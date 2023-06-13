import { AssetRequestEntity } from "./approvalRequestEntities/assetRequestEntity";
import { ConferenceRoomBookingEntity } from "./approvalRequestEntities/conferenceRoomBookingEntity";
import { JobRequestEnitity } from "./approvalRequestEntities/jobRequestEntity";
import { LeaveEntity } from "./approvalRequestEntities/leaveEntity";
import { TransferRequestEntity } from "./approvalRequestEntities/transferRequestEntity";
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
  jobRequisition?: JobRequestEnitity;
  transferRequisition?: TransferRequestEntity;
};
