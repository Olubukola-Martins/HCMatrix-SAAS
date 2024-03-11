import { TPayrollListData } from "features/payroll/types/payroll";
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
import { TLoanRequest } from "features/self-service/features/loan/types";
import { TTHandOverForm } from "features/self-service/features/handover-forms/types";
import { TApprovalStatus } from "types/statuses";
import { TStageCondition } from ".";

interface AdvancedStage {
  id: number;
  workflowId: number;
  name: string;
  type: string;
  entityId: number;
  enableTwoFactorAuth: boolean;
  condition?: TStageCondition | null;
  count?: number | null;
  createdAt: string;
  updatedAt: string;
}

interface BasicStage {
  id: number;
  workflowId: number;
  name: string;
  type: string;
  entityId: number;
  createdAt: string;
  updatedAt: string;
}

export type TApprovalRequest = {
  id: number;
  advancedStageId?: number;
  basicStageId?: number;

  processed: boolean;
  comment?: string;

  advancedStage: AdvancedStage;
  basicStage: BasicStage;
  //

  entityType: string;
  entityId: number;
  status: TApprovalStatus;
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
  travelRequest?: TravelRequestEntity;
  positionChangeRequisition?: PositionChangeRequestEntity;
  moneyRequisition?: MoneyRequestEntity;
  payroll?: TPayrollListData;
  loan?: TLoanRequest;
  exitHandoverForm?: TTHandOverForm;
};
