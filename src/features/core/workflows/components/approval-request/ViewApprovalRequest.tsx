import { IModalProps } from "types";
import { TApprovalRequest } from "../../types/approval-requests";
import { AssetRequestDetails } from "features/self-service/features/assets/components/AssetRequestDetails";
import { ViewVehicleBooking } from "features/self-service/features/vehicle-booking/components/ViewVehicleBooking";

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
      {/* TODO: Fill for other type of approval requests */}
    </>
  );
};

export default ViewApprovalRequest;
