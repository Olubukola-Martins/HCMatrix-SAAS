import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  description: string;
  serviceDate: string;
  nextDueDate: string;
  reminderDays: number;
  cost: number;
  documentUrls?: string[];
};

const createVehicleRepair = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
  vehicleId: number;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/${props.vehicleId}/repair`;
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
export const useCreateVehicleRepair = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TCreateProps; vehicleId: number }) =>
    createVehicleRepair({
      data: props.data,
      auth: { token, companyId },
      vehicleId: props.vehicleId,
    })
  );
};
