import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TEditProps = {
  description: string;
  serviceDate: string;
  nextDueDate: string;
  reminderDays: number;
  cost: number;
  documentUrls: string[];
};

const editVehicleMaintenance = async (props: {
  data: TEditProps;
  auth: ICurrentCompany;
  vehicleId: number;
  maintenanceId: number;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/${props.vehicleId}/maintenance/${props.maintenanceId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TEditProps = {
    ...props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useEditVehicleMaintenance = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: { data: TEditProps; vehicleId: number; maintenanceId: number }) =>
      editVehicleMaintenance({
        data: props.data,
        auth: { token, companyId },
        vehicleId: props.vehicleId,
        maintenanceId: props.maintenanceId,
      })
  );
};
