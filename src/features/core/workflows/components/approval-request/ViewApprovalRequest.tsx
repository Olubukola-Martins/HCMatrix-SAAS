import { IModalProps } from "types";
import { TApprovalRequest } from "../../types/approval-requests";
import { AssetRequestDetails } from "features/self-service/features/assets/components/AssetRequestDetails";
import { ViewVehicleBooking } from "features/self-service/features/vehicle-booking/components/ViewVehicleBooking";
import { JobRequestDetails } from "features/self-service/features/jobs/components/JobRequestDetails";
import { TravelRequestDetails } from "features/self-service/features/travels/components/TravelRequestDetails";
import { TransferDetails } from "features/self-service/features/transfers/components/TransferDetails";
import { PositionChangeRequestDetails } from "features/self-service/features/position-change/components/PositionChangeRequestDetails";
import { MonetaryRequestDetails } from "features/self-service/features/monetary-requests/components/MonetaryRequestDetails";
import { ReimbursementDetails } from "features/self-service/features/reimbursement/components/ReimbursementDetails";
import CRBBookingDetails from "features/self-service/features/conference-room-booking/components/CRBBookingDetails";
import { LeaveDetails } from "features/self-service/features/leave/components/LeaveDetails";
import { LoanDetails } from "features/self-service/features/loan/components/LoanDetails";
import { PromotionRequestDetails } from "features/self-service/features/promotions/components/PromotionRequestDetails";
import { Navigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";

interface IProps extends IModalProps {
  request?: TApprovalRequest;
}

const ViewApprovalRequest: React.FC<IProps> = ({
  request,
  handleClose,
  open,
}) => {
  if (request === undefined) return null;

  // for handover also display the status of the handover to the user
  return (
    <>
      {typeof request.payroll !== "undefined" && (
        <Navigate
          to={
            appRoutes.singlePayroll({
              id: request.payroll.id,
              scheme: request.payroll.scheme
                .type as unknown as TPayrollSchemeType,
            }).path
          }
        />
      )}
      {typeof request.exitHandoverForm !== "undefined" && (
        <Navigate
          to={appRoutes.handOverDetails(request.exitHandoverForm.id).path}
        />
      )}

      {typeof request.promotionRequisition !== "undefined" && (
        <PromotionRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.promotionRequisition.id}
          approvalRequest={request}
        />
      )}
      {typeof request.leave !== "undefined" && (
        <LeaveDetails
          open={open}
          handleClose={handleClose}
          id={request.leave.id}
          approvalRequest={request}
        />
      )}
      {typeof request.loan !== "undefined" && (
        <LoanDetails
          open={open}
          handleClose={handleClose}
          id={request.loan.id}
          approvalRequest={request}
        />
      )}
      {typeof request.conferenceRoomBooking !== "undefined" && (
        <CRBBookingDetails
          open={open}
          handleClose={handleClose}
          id={request.conferenceRoomBooking.id}
          approvalRequest={request}
        />
      )}
      {typeof request.assetRequisition !== "undefined" && (
        <AssetRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.assetRequisition.id}
          approvalRequest={request}
        />
      )}
      {typeof request.vehicleBooking !== "undefined" && (
        <ViewVehicleBooking
          open={open}
          handleClose={handleClose}
          bookingId={request.vehicleBooking.id}
          approvalRequest={request}
        />
      )}
      {typeof request.jobRequisition !== "undefined" && (
        <JobRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.jobRequisition.id}
          approvalRequest={request}
        />
      )}
      {typeof request.travelRequest !== "undefined" && (
        <TravelRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.travelRequest.id}
          approvalRequest={request}
        />
      )}
      {typeof request.transferRequisition !== "undefined" && (
        <TransferDetails
          open={open}
          handleClose={handleClose}
          id={request.transferRequisition.id}
          approvalRequest={request}
        />
      )}
      {typeof request.positionChangeRequisition !== "undefined" && (
        <PositionChangeRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.positionChangeRequisition.id}
          approvalRequest={request}
        />
      )}
      {typeof request.moneyRequisition !== "undefined" && (
        <MonetaryRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.moneyRequisition.id}
          approvalRequest={request}
        />
      )}
      {typeof request.reimbursementRequisition !== "undefined" && (
        <ReimbursementDetails
          open={open}
          handleClose={handleClose}
          id={request.reimbursementRequisition.id}
          approvalRequest={request}
        />
      )}
      {/* TODO: Fill for other type of approval requests */}
    </>
  );
};

export default ViewApprovalRequest;
