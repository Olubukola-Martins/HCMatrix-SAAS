import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "Constants/enviroment";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";

export type TVehicleType = "car" | "motorcycle" | "truck" | "bus";
export type TVehicleStatus =
  | "unassigned"
  | "assigned"
  | "in-repair"
  | "condemned";

type TCreateProps = {
  type: TVehicleType;
  brand: string;
  model: string;
  plateNumber: string;
  imageUrl?: string;
  color?: string;
  description?: string;
  purchaseDate?: string;
  dateAssigned?: string;
  cost?: number;
  status: TVehicleStatus;
  assigneeId?: number;
  documentUrls?: string[];
};

const createVehicle = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle`;
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
export const useCreateVehicle = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createVehicle({ data: props, auth: { token, companyId } })
  );
};
