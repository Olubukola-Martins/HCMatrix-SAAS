import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";

type TCreateProps = {
  description: string;
  serviceDate: string;
  nextDueDate: string;
  reminderDays: number;
  cost: number;
  documentUrls: string[];
};

const createVehicleMaintenance = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
  vehicleId: number;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/${props.vehicleId}/maintenance`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateVehicleMaintenance = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TCreateProps; vehicleId: number }) =>
    createVehicleMaintenance({
      data: props.data,
      auth: { token, companyId },
      vehicleId: props.vehicleId,
    })
  );
};
