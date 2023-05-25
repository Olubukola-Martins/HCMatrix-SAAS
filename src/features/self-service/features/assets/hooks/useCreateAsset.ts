import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  name: string;
  typeId: number;
  status?: "assigned" | "unassigned" | "under-repair" | "condemned";
  imageUrl?: string;
  uid?: string;
  serialNumber?: string;
  brand?: string;
  model?: string;
  vendor?: string;
  color?: string;
  assigneeId?: string;
  documentUrls?: string[];
  dateAssigned?: string;
  description?: string;
  purchaseDate?: string;
  cost?: number;
};

const createAsset = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/asset`;
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
export const useCreateAsset = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createAsset({ data: props, auth: { token, companyId } })
  );
};
