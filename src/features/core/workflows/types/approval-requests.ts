import { AssetRequestEntity } from "./approvalRequestEntities/assetRequestEntity";
import { ConferenceRoomBookingEntity } from "./approvalRequestEntities/conferenceRoomBookingEntity";
import { JobRequestEnitity } from "./approvalRequestEntities/jobRequestEntity";
import { LeaveEntity } from "./approvalRequestEntities/leaveEntity";
import { MoneyRequestEntity } from "./approvalRequestEntities/moneyRequestEntity";
import { PositionChangeRequestEntity } from "./approvalRequestEntities/positionChangeRequestEntity";
import { PromotionRequestEntity } from "./approvalRequestEntities/promotionRequestEntity";
import { ReimbursementRequestEntity } from "./approvalRequestEntities/reimbursementRequestEntity";
import { TransferRequestEntity } from "./approvalRequestEntities/transferRequestEntity";
import { TravelRequestEntity } from "./approvalRequestEntities/travelRequestEntity";
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
  promotionRequisition?: PromotionRequestEntity;
  reimbursementRequisition?: ReimbursementRequestEntity;
  travelRequisition?: TravelRequestEntity;
  positionChangeRequisition?: PositionChangeRequestEntity;
  moneyRequisition?: MoneyRequestEntity;
};
