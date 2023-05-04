import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";

type TCreateProps = {
  type: string;
  issueDate: string;
  expiryDate: string;
  reminderDays: number;
  cost: number;
  documentUrls: string[];
};

const createOrUpdateVehicle = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
  vehicleId: number;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/${props.vehicleId}/document`;
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
export const useCreateOrUpdateVehicleDocument = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TCreateProps; vehicleId: number }) =>
    createOrUpdateVehicle({
      data: props.data,
      auth: { token, companyId },
      vehicleId: props.vehicleId,
    })
  );
};
