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

interface IProps extends IModalProps {
  request?: TApprovalRequest;
}

const ViewApprovalRequest: React.FC<IProps> = ({
  request,
  handleClose,
  open,
}) => {
  if (request === undefined) return null;
  //   TODO: Add status to all view request types
  return (
    <>
      {typeof request.assetRequisition !== "undefined" && (
        <AssetRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.assetRequisition.id}
        />
      )}
      {typeof request.vehicleBooking !== "undefined" && (
        <ViewVehicleBooking
          open={open}
          handleClose={handleClose}
          bookingId={request.vehicleBooking.id}
        />
      )}
      {typeof request.jobRequisition !== "undefined" && (
        <JobRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.jobRequisition.id}
        />
      )}
      {typeof request.travelRequisition !== "undefined" && (
        <TravelRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.travelRequisition.id}
        />
      )}
      {typeof request.transferRequisition !== "undefined" && (
        <TransferDetails
          open={open}
          handleClose={handleClose}
          id={request.transferRequisition.id}
        />
      )}
      {typeof request.positionChangeRequisition !== "undefined" && (
        <PositionChangeRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.positionChangeRequisition.id}
        />
      )}
      {typeof request.moneyRequisition !== "undefined" && (
        <MonetaryRequestDetails
          open={open}
          handleClose={handleClose}
          id={request.moneyRequisition.id}
        />
      )}
      {typeof request.reimbursementRequisition !== "undefined" && (
        <ReimbursementDetails
          open={open}
          handleClose={handleClose}
          id={request.reimbursementRequisition.id}
        />
      )}
      {/* TODO: Fill for other type of approval requests */}
    </>
  );
};

export default ViewApprovalRequest;
